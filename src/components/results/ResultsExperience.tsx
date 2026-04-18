'use client';

import { useEffect, useMemo, useState } from 'react';

import { TypeFigure } from '@/components/figures/TypeFigure';
import { LobsterMascot } from '@/components/landing/LobsterMascot';
import { type NarrativeMode } from '@/lib/results/copy-content';
import { buildProfileCopy, getDimensionLabels } from '@/lib/results/profile-copy';
import { buildShareCardHighlights, buildShareCardText } from '@/lib/results/share-card';
import type { DimensionId } from '@/lib/scoring/types';

type ReplayAnswer = {
  questionCode: string;
  questionText: string;
  selectedValue: number;
  questionKind: 'core' | 'spicy';
  displayOrder: number;
  reasoning?: string;
};

type DimensionBreakdown = {
  dominantLetter: string;
  positiveLetter: string;
  negativeLetter: string;
  positivePercent: number;
  negativePercent: number;
};

type ResultsPayload = {
  typeCode: string;
  dimensionBreakdown: Record<DimensionId, DimensionBreakdown>;
  strongestSignals: Array<{
    dimension: DimensionId;
    dominantLetter: string;
    confidenceDelta: number;
    dominantPercent: number;
  }>;
  tieFlags: Record<DimensionId, boolean>;
  replayAnswers: ReplayAnswer[];
  evidence?: {
    strongestSupport: Array<{
      questionCode: string;
      questionText: string;
      dimension: DimensionId;
      supportScore: number;
      contradictionScore: number;
      selectedValue: number;
      reasoning?: string;
    }>;
    strongestContradictions: Array<{
      questionCode: string;
      questionText: string;
      dimension: DimensionId;
      supportScore: number;
      contradictionScore: number;
      selectedValue: number;
      reasoning?: string;
    }>;
  };
};

type SocialProof = {
  sampleCount: number;
  minimumSample: number;
  mostCommon: { typeCode: string; count: number } | null;
  rarest: { typeCode: string; count: number } | null;
};

const likertLabels = {
  1: 'Strongly disagree',
  2: 'Disagree',
  3: 'Neutral',
  4: 'Agree',
  5: 'Strongly agree',
} as const;

function percent(value: number) {
  return Math.round(value * 100);
}

export function ResultsExperience({
  result,
  sessionId,
  socialProof,
  isSignedIn,
}: {
  result: ResultsPayload;
  sessionId: string;
  socialProof?: SocialProof;
  isSignedIn?: boolean;
}) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [mode, setMode] = useState<NarrativeMode>('normal');
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');
  const [compareSessionId, setCompareSessionId] = useState('');
  const [compareStatus, setCompareStatus] = useState<'idle' | 'working' | 'error'>('idle');
  const [compareError, setCompareError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'working' | 'error'>('idle');
  const [showEvidence, setShowEvidence] = useState(false);

  const profileCopy = useMemo(
    () =>
      buildProfileCopy({
        typeCode: result.typeCode,
        breakdown: result.dimensionBreakdown,
        strongestSignals: result.strongestSignals,
        tieFlags: result.tieFlags,
        mode,
      }),
    [mode, result.dimensionBreakdown, result.strongestSignals, result.tieFlags, result.typeCode],
  );
  const dimensionLabels = useMemo(() => getDimensionLabels(mode), [mode]);
  const shareCardUrl = `/api/share-card/${sessionId}?mode=${mode}`;
  const shareHighlights = useMemo(
    () => buildShareCardHighlights({ mode, breakdown: result.dimensionBreakdown }),
    [mode, result.dimensionBreakdown],
  );
  const shareText = useMemo(
    () =>
      buildShareCardText({
        mode,
        typeCode: result.typeCode,
        nickname: profileCopy.nickname,
        highlights: shareHighlights,
      }),
    [mode, profileCopy.nickname, result.typeCode, shareHighlights],
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= result.replayAnswers.length) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 260);

    return () => clearInterval(timer);
  }, [result.replayAnswers.length]);

  useEffect(() => {
    if (profileCopy.moderation.rewriteCount <= 0) {
      return;
    }

    void recordEvent('moderation_rewrite', {
      typeCode: result.typeCode,
      mode,
      rewriteCount: profileCopy.moderation.rewriteCount,
      highestSeverity: profileCopy.moderation.highestSeverity,
      terms: profileCopy.moderation.terms,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, profileCopy.moderation.rewriteCount]);

  async function recordEvent(eventName: string, eventPayload?: Record<string, unknown>) {
    try {
      await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventName, sessionId, eventPayload }),
      });
    } catch {
      // Non-blocking analytics.
    }
  }

  async function copyShareText() {
    try {
      const origin = window.location.origin;
      const payload = `${shareText}\n${origin}/results/${sessionId}`;
      await navigator.clipboard.writeText(payload);
      setCopyState('copied');
      await recordEvent('share_click', { mode, action: 'copy_text', typeCode: result.typeCode });
    } catch {
      setCopyState('error');
    }
  }

  async function createCompareLink() {
    const target = compareSessionId.trim();

    if (!target) {
      setCompareStatus('error');
      setCompareError('Enter another session ID first.');
      return;
    }

    setCompareStatus('working');
    setCompareError(null);

    try {
      const response = await fetch('/api/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionIds: [sessionId, target],
          labels: ['Current result', 'Other agent'],
        }),
      });
      const payload = await response.json();

      if (!response.ok || !payload.compareId) {
        throw new Error(payload.error ?? 'Could not create compare set');
      }

      window.location.assign(`/compare/${payload.compareId}`);
    } catch (error) {
      setCompareStatus('error');
      setCompareError(error instanceof Error ? error.message : 'Failed to create compare link');
    }
  }

  async function claimSession() {
    setSaveStatus('working');

    try {
      const response = await fetch(`/api/sessions/${sessionId}/claim`, { method: 'POST' });

      if (!response.ok) {
        throw new Error('Failed to claim this session');
      }

      window.location.assign('/profile');
    } catch {
      setSaveStatus('error');
    }
  }

  return (
    <main
      className="min-h-screen px-6 py-12 text-slate-100 sm:px-10"
      style={{
        background:
          'linear-gradient(145deg, var(--tea-bg-deep) 0%, var(--tea-bg-mid) 45%, var(--tea-bg-glow) 100%)',
      }}
    >
      <div className="mx-auto max-w-6xl">
        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="w-fit rounded-full border border-cyan-200/35 bg-cyan-200/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-100">
              Agent Tea Result
            </p>
            <h1 className="mt-4 text-5xl font-black tracking-tight sm:text-6xl">{result.typeCode}</h1>
            <p className="mt-2 text-2xl font-bold text-orange-200">{profileCopy.nickname}</p>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">{profileCopy.oneLiner}</p>
            <div className="mt-5 inline-flex rounded-full border border-white/20 bg-slate-900/80 p-1 text-sm">
              <button
                type="button"
                onClick={() => setMode('normal')}
                className={`rounded-full px-4 py-1.5 transition ${
                  mode === 'normal' ? 'bg-cyan-300 text-slate-950' : 'text-cyan-100 hover:bg-white/10'
                }`}
              >
                Normal
              </button>
              <button
                type="button"
                onClick={() => setMode('intrusive')}
                className={`rounded-full px-4 py-1.5 transition ${
                  mode === 'intrusive' ? 'bg-orange-300 text-slate-950' : 'text-orange-100 hover:bg-white/10'
                }`}
              >
                Intrusive Thoughts
              </button>
            </div>
          </div>
          <div className="grid gap-3 rounded-3xl border border-white/10 bg-white/5 p-4">
            <LobsterMascot
              variant="hero"
              className="mx-auto w-44 drop-shadow-[0_20px_24px_rgba(255,98,74,0.3)]"
            />
            <TypeFigure
              typeCode={result.typeCode}
              className="mx-auto w-36 rounded-2xl border border-white/10 bg-slate-900/50 p-2"
            />
          </div>
        </section>

        <section className="mt-8 grid gap-3 rounded-3xl border border-white/10 bg-white/5 p-5">
          {Object.entries(result.dimensionBreakdown).map(([dimension, values]) => {
            const label = dimensionLabels[dimension as DimensionId];
            return (
              <div key={dimension}>
                <div className="mb-1 flex justify-between text-xs text-slate-300">
                  <span>
                    {label.positive} {percent(values.positivePercent)}%
                  </span>
                  <span>
                    {label.negative} {percent(values.negativePercent)}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-slate-800">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-cyan-300 via-teal-300 to-orange-300"
                    style={{ width: `${Math.max(4, percent(values.positivePercent))}%` }}
                  />
                </div>
              </div>
            );
          })}
        </section>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-semibold text-cyan-100">Strongest signals</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {result.strongestSignals.map((signal) => {
              const label = dimensionLabels[signal.dimension];
              const sideLabel =
                signal.dominantLetter === result.dimensionBreakdown[signal.dimension].positiveLetter
                  ? label.positive
                  : label.negative;

              return (
                <article key={signal.dimension} className="rounded-2xl border border-white/10 bg-slate-900/70 p-3">
                  <p className="text-xs uppercase tracking-wide text-slate-400">{signal.dimension.replace('_', ' ')}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-100">
                    {sideLabel} ({percent(signal.dominantPercent)}%)
                  </p>
                  <p className="mt-1 text-xs text-cyan-200">
                    Confidence delta: {percent(signal.confidenceDelta)} pts
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-semibold text-cyan-100">Share this tea</h2>
          <p className="mt-2 text-sm text-slate-300">{shareText}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={copyShareText}
              className="rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-200"
            >
              Copy share text
            </button>
            <a
              href={shareCardUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                void recordEvent('share_click', {
                  mode,
                  action: 'open_share_card',
                  typeCode: result.typeCode,
                });
              }}
              className="rounded-full border border-orange-200/50 bg-orange-300/10 px-4 py-2 text-sm font-semibold text-orange-100 hover:bg-orange-300/20"
            >
              Open share card
            </a>
            <a
              href={`/?ref=${sessionId}`}
              onClick={() => {
                void recordEvent('share_click', {
                  mode,
                  action: 'challenge_friend',
                  typeCode: result.typeCode,
                });
              }}
              className="rounded-full border border-cyan-200/40 bg-cyan-200/10 px-4 py-2 text-sm font-semibold text-cyan-100 hover:bg-cyan-200/20"
            >
              Challenge a friend
            </a>
          </div>
          {copyState === 'copied' ? <p className="mt-2 text-xs text-emerald-200">Copied to clipboard.</p> : null}
          {copyState === 'error' ? (
            <p className="mt-2 text-xs text-rose-200">Clipboard failed. Copy the line manually.</p>
          ) : null}
        </section>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-semibold text-cyan-100">Compare with another agent</h2>
          <p className="mt-2 text-sm text-slate-300">
            Paste another session ID to compare how two agents saw you.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <input
              value={compareSessionId}
              onChange={(event) => setCompareSessionId(event.target.value)}
              placeholder="Other session ID"
              className="w-full max-w-sm rounded-xl border border-white/20 bg-slate-950 px-3 py-2 text-sm text-slate-100"
            />
            <button
              type="button"
              disabled={compareStatus === 'working'}
              onClick={createCompareLink}
              className="rounded-xl bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-200 disabled:opacity-70"
            >
              {compareStatus === 'working' ? 'Building…' : 'Create compare view'}
            </button>
          </div>
          {compareStatus === 'error' && compareError ? <p className="mt-2 text-xs text-rose-200">{compareError}</p> : null}
        </section>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-semibold text-cyan-100">Save your results</h2>
          <p className="mt-2 text-sm text-slate-300">
            Optional account linking keeps your result history and compare runs in one profile.
          </p>
          <div className="mt-3">
            {isSignedIn ? (
              <button
                type="button"
                disabled={saveStatus === 'working'}
                onClick={claimSession}
                className="inline-flex rounded-xl bg-emerald-300 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-200 disabled:opacity-70"
              >
                {saveStatus === 'working' ? 'Saving…' : 'Claim in profile'}
              </button>
            ) : (
              <a
                href={`/auth?claim=${sessionId}`}
                className="inline-flex rounded-xl bg-emerald-300 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-200"
              >
                Sign in to save
              </a>
            )}
            {saveStatus === 'error' ? <p className="mt-2 text-xs text-rose-200">Could not claim this session.</p> : null}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-semibold text-cyan-100">This week in Agent Tea</h2>
          {socialProof && socialProof.sampleCount >= socialProof.minimumSample ? (
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <p className="text-xs text-slate-400">Most common type</p>
                <p className="mt-1 text-2xl font-black text-cyan-200">{socialProof.mostCommon?.typeCode}</p>
                <p className="text-xs text-slate-400">{socialProof.mostCommon?.count} runs in 7 days</p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <p className="text-xs text-slate-400">Rarest type</p>
                <p className="mt-1 text-2xl font-black text-orange-200">{socialProof.rarest?.typeCode}</p>
                <p className="text-xs text-slate-400">{socialProof.rarest?.count} runs in 7 days</p>
              </article>
            </div>
          ) : (
            <p className="mt-3 text-sm text-slate-300">
              Not enough recent sample yet. We show social-proof stats after {socialProof?.minimumSample ?? 24} runs.
            </p>
          )}
        </section>

        {result.evidence ? (
          <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-cyan-100">Evidence layer</h2>
              <button
                type="button"
                onClick={() => setShowEvidence((prev) => !prev)}
                className="rounded-xl border border-white/20 px-3 py-1.5 text-xs font-semibold text-slate-100 hover:bg-white/10"
              >
                {showEvidence ? 'Hide why' : 'Show why'}
              </button>
            </div>

            {showEvidence ? (
              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <article className="rounded-2xl border border-emerald-200/20 bg-emerald-200/10 p-4">
                  <h3 className="text-sm font-semibold text-emerald-100">Strongest supporting answers</h3>
                  <ul className="mt-2 space-y-2 text-xs text-emerald-50/90">
                    {result.evidence.strongestSupport.slice(0, 3).map((item) => (
                      <li key={`support-${item.questionCode}`}>
                        <p className="font-semibold">{item.questionCode}</p>
                        <p>{item.questionText}</p>
                      </li>
                    ))}
                  </ul>
                </article>
                <article className="rounded-2xl border border-rose-200/20 bg-rose-200/10 p-4">
                  <h3 className="text-sm font-semibold text-rose-100">Top contradictions</h3>
                  <ul className="mt-2 space-y-2 text-xs text-rose-50/90">
                    {result.evidence.strongestContradictions.slice(0, 3).map((item) => (
                      <li key={`contra-${item.questionCode}`}>
                        <p className="font-semibold">{item.questionCode}</p>
                        <p>{item.questionText}</p>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            ) : null}
          </section>
        ) : null}

        <section className="mt-8 grid gap-4 lg:grid-cols-2">
          <article className="rounded-3xl border border-emerald-200/30 bg-emerald-300/10 p-5">
            <h2 className="text-lg font-semibold text-emerald-100">What your agent likely loves</h2>
            <ul className="mt-3 space-y-2 text-sm text-emerald-50/90">
              {profileCopy.loves.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl border border-rose-200/30 bg-rose-300/10 p-5">
            <h2 className="text-lg font-semibold text-rose-100">What may frustrate your agent</h2>
            <ul className="mt-3 space-y-2 text-sm text-rose-50/90">
              {profileCopy.frustrates.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-semibold text-cyan-100">Animated answer replay</h2>
          <div className="mt-4 space-y-3">
            {result.replayAnswers.slice(0, visibleCount).map((answer) => (
              <article
                key={answer.questionCode}
                className="rounded-2xl border border-white/10 bg-slate-900/70 p-3 transition duration-500"
              >
                <p className="text-xs text-slate-400">{answer.questionCode}</p>
                <p className="text-sm text-slate-100">{answer.questionText}</p>
                <p className="mt-1 text-xs font-semibold text-cyan-200">
                  Selected: {likertLabels[answer.selectedValue as keyof typeof likertLabels]}
                </p>
                {answer.reasoning ? (
                  <div className="mt-2 flex items-start gap-2 rounded-xl border border-orange-200/25 bg-orange-200/10 p-2 text-xs text-orange-100">
                    <LobsterMascot variant="bubble" className="h-10 w-10 shrink-0" />
                    <p>{answer.reasoning}</p>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
