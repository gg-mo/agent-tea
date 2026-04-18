import { randomUUID } from 'node:crypto';

import { parseEncodedAnswers } from '@/lib/ingestion/encoded-parser';
import type { SessionAnswer } from '@/lib/scoring/types';
import { scoreSession } from '@/lib/scoring/score-session';
import type {
  DimensionBreakdown,
  DimensionId,
  ScoreSessionResult,
  StrongestSignal,
} from '@/lib/scoring/types';
import { constrainedShuffleQuestions } from '@/lib/questions/constrained-shuffle';
import { getSessionStore } from '@/lib/server/session-store';
import type {
  PersistedAnswer,
  PersistedResult,
  QuestionRow,
  SessionIntakeMode,
  SessionRow,
} from '@/lib/server/session-store/types';

export type SessionQuestionPayload = {
  code: string;
  text: string;
  dimension: QuestionRow['dimension'];
  keyedSide: QuestionRow['keyedSide'];
  questionKind: QuestionRow['questionKind'];
};

function normalizeAnswerValue(raw: number, reverseCoded: boolean) {
  return reverseCoded ? 6 - raw : raw;
}

function mapQuestionsToScoring(questions: QuestionRow[]) {
  return questions.map((question) => ({
    code: question.code,
    dimension: question.dimension,
    keyedSide: question.keyedSide,
    reverseCoded: question.reverseCoded,
    questionKind: question.questionKind,
  }));
}

function mapAnswersToScoring(answers: PersistedAnswer[]): SessionAnswer[] {
  return answers.map((answer) => ({
    questionCode: answer.questionCode,
    value: answer.rawValue,
    reasoning: answer.reasoning,
  }));
}

function toQuestionMap(questions: QuestionRow[]) {
  return new Map(questions.map((question) => [question.code, question]));
}

function dominantSideForDimension(item: {
  dominantLetter: string;
  positiveLetter: string;
  negativeLetter: string;
}) {
  return item.dominantLetter === item.positiveLetter ? 'positive' : 'negative';
}

function buildEvidence(params: {
  questions: QuestionRow[];
  answers: PersistedAnswer[];
  dimensionBreakdown: ScoreSessionResult['dimensionBreakdown'];
}) {
  const questionMap = toQuestionMap(params.questions);
  const supportRows: Array<{
    questionCode: string;
    questionText: string;
    dimension: DimensionId;
    supportScore: number;
    contradictionScore: number;
    selectedValue: number;
    reasoning?: string;
  }> = [];

  for (const answer of params.answers) {
    const question = questionMap.get(answer.questionCode);

    if (!question) {
      continue;
    }

    const breakdown = params.dimensionBreakdown[question.dimension];
    const dominantSide = dominantSideForDimension(breakdown);
    const supportsDominant =
      question.keyedSide === dominantSide ? answer.normalizedValue : 6 - answer.normalizedValue;
    const contradictsDominant =
      question.keyedSide === dominantSide ? 6 - answer.normalizedValue : answer.normalizedValue;

    supportRows.push({
      questionCode: answer.questionCode,
      questionText: question.text,
      dimension: question.dimension,
      supportScore: supportsDominant,
      contradictionScore: contradictsDominant,
      selectedValue: answer.rawValue,
      reasoning: answer.reasoning,
    });
  }

  const strongestSupport = [...supportRows]
    .sort((a, b) => b.supportScore - a.supportScore)
    .slice(0, 5);
  const strongestContradictions = [...supportRows]
    .sort((a, b) => b.contradictionScore - a.contradictionScore)
    .slice(0, 5);

  return {
    strongestSupport,
    strongestContradictions,
  };
}

const DIMENSION_IDS: DimensionId[] = ['clarity', 'tone', 'thinking_style', 'autonomy'];

function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function toNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function parseDimensionBreakdown(
  raw: Record<string, unknown>,
): ScoreSessionResult['dimensionBreakdown'] | null {
  const parsed = {} as ScoreSessionResult['dimensionBreakdown'];

  for (const dimensionId of DIMENSION_IDS) {
    const entry = raw[dimensionId];

    if (!isObjectRecord(entry)) {
      return null;
    }

    const positivePercent = toNumber(entry.positivePercent);
    const negativePercent = toNumber(entry.negativePercent);
    const dominantLetter = entry.dominantLetter;
    const positiveLetter = entry.positiveLetter;
    const negativeLetter = entry.negativeLetter;

    if (
      positivePercent === null ||
      negativePercent === null ||
      typeof dominantLetter !== 'string' ||
      typeof positiveLetter !== 'string' ||
      typeof negativeLetter !== 'string'
    ) {
      return null;
    }

    parsed[dimensionId] = {
      dimension: dimensionId,
      dominantLetter,
      positiveLetter,
      negativeLetter,
      positivePercent,
      negativePercent,
      positiveScore: toNumber(entry.positiveScore) ?? 0,
      negativeScore: toNumber(entry.negativeScore) ?? 0,
      tie: Boolean(entry.tie),
    } satisfies DimensionBreakdown;
  }

  return parsed;
}

function parseStrongestSignals(raw: unknown): StrongestSignal[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw.flatMap((item) => {
    if (!isObjectRecord(item)) {
      return [];
    }

    const dimension = item.dimension;
    const dominantLetter = item.dominantLetter;
    const confidenceDelta = toNumber(item.confidenceDelta);
    const dominantPercent = toNumber(item.dominantPercent);

    if (
      !DIMENSION_IDS.includes(dimension as DimensionId) ||
      typeof dominantLetter !== 'string' ||
      confidenceDelta === null ||
      dominantPercent === null
    ) {
      return [];
    }

    return [
      {
        dimension: dimension as DimensionId,
        dominantLetter,
        confidenceDelta,
        dominantPercent,
      } satisfies StrongestSignal,
    ];
  });
}

function parseTieFlags(raw: unknown): ScoreSessionResult['tieFlags'] {
  if (!isObjectRecord(raw)) {
    return {
      clarity: false,
      tone: false,
      thinking_style: false,
      autonomy: false,
    };
  }

  return {
    clarity: Boolean(raw.clarity),
    tone: Boolean(raw.tone),
    thinking_style: Boolean(raw.thinking_style),
    autonomy: Boolean(raw.autonomy),
  };
}

type NormalizedPersistedResult = {
  typeCode: string;
  dimensionBreakdown: ScoreSessionResult['dimensionBreakdown'];
  strongestSignals: StrongestSignal[];
  tieFlags: ScoreSessionResult['tieFlags'];
  scoreSummary?: Record<string, unknown>;
};

function normalizePersistedResult(result: PersistedResult): NormalizedPersistedResult | null {
  if (typeof result.typeCode !== 'string') {
    return null;
  }

  if (!isObjectRecord(result.dimensionBreakdown)) {
    return null;
  }

  const parsedBreakdown = parseDimensionBreakdown(result.dimensionBreakdown);

  if (!parsedBreakdown) {
    return null;
  }

  return {
    typeCode: result.typeCode,
    dimensionBreakdown: parsedBreakdown,
    strongestSignals: parseStrongestSignals(result.strongestSignals),
    tieFlags: parseTieFlags(result.tieFlags),
    scoreSummary: result.scoreSummary,
  };
}

export async function createSession(params: {
  intakeMode: SessionIntakeMode;
  questionSetVersion?: string;
  referralCode?: string;
  referrerSessionId?: string;
}) {
  const store = getSessionStore();
  const questionSet = await store.getActiveQuestionSet(params.questionSetVersion);

  if (!questionSet) {
    throw new Error('No active question set found. Run db:ingest-questions first.');
  }

  const questions = await store.getQuestions(questionSet.id);
  const randomSeed = randomUUID();

  const session = await store.createSession({
    questionSetId: questionSet.id,
    questionSetVersion: questionSet.version,
    intakeMode: params.intakeMode,
    randomSeed,
    referralCode: params.referralCode,
    referrerSessionId: params.referrerSessionId,
  });

  await store.recordEvent({
    sessionId: session.id,
    eventName: 'session_created',
    eventSource: 'server',
    eventPayload: {
      intakeMode: session.intakeMode,
      questionSetVersion: session.questionSetVersion,
      referralCode: params.referralCode ?? null,
      referrerSessionId: params.referrerSessionId ?? null,
    },
  });

  const orderedQuestions = constrainedShuffleQuestions(questions, randomSeed);

  return {
    session,
    questions: orderedQuestions.map((question) => ({
      code: question.code,
      text: question.text,
      dimension: question.dimension,
      keyedSide: question.keyedSide,
      questionKind: question.questionKind,
    })) satisfies SessionQuestionPayload[],
  };
}

async function upsertNormalizedAnswers(
  session: SessionRow,
  answerInputs: Array<{ questionCode: string; value: number; reasoning?: string }>,
  source: SessionIntakeMode,
) {
  const store = getSessionStore();
  const questions = await store.getQuestions(session.questionSetId);
  const questionMap = toQuestionMap(questions);

  const normalizedAnswers: PersistedAnswer[] = answerInputs.map((answer) => {
    const question = questionMap.get(answer.questionCode);

    if (!question) {
      throw new Error(`Unknown question code: ${answer.questionCode}`);
    }

    if (!Number.isInteger(answer.value) || answer.value < 1 || answer.value > 5) {
      throw new Error(`Invalid answer value for ${answer.questionCode}. Expected integer 1-5.`);
    }

    return {
      questionCode: answer.questionCode,
      rawValue: answer.value,
      normalizedValue: normalizeAnswerValue(answer.value, question.reverseCoded),
      reasoning: answer.reasoning,
      source,
    };
  });

  await store.upsertAnswers(session.id, normalizedAnswers);
  await store.setSessionStatus(session.id, 'ingested');

  return { accepted: normalizedAnswers.length };
}

export async function ingestDirectAnswers(
  session: SessionRow,
  answers: Array<{ questionCode: string; value: number; reasoning?: string }>,
) {
  return upsertNormalizedAnswers(session, answers, 'manual');
}

export async function ingestCodingAgentAnswers(
  session: SessionRow,
  answers: Array<{ questionCode: string; value: number; reasoning?: string }>,
  rawPayload: string,
) {
  const store = getSessionStore();

  const ingestion = await upsertNormalizedAnswers(session, answers, 'coding_agent');

  await store.recordInstructionRun({
    sessionId: session.id,
    intakeMode: 'coding_agent',
    rawPayload,
    normalizedPayload: rawPayload,
    parseStatus: 'success',
    warnings: [],
    errors: [],
  });

  return ingestion;
}

export async function ingestEncodedPayload(session: SessionRow, payload: string) {
  const store = getSessionStore();
  const questions = await store.getQuestions(session.questionSetId);
  const requiredCoreQuestionCodes = questions
    .filter((question) => question.questionKind === 'core')
    .map((question) => question.code);

  const parsed = parseEncodedAnswers({ payload, requiredCoreQuestionCodes });

  if (!parsed.ok) {
    await store.recordInstructionRun({
      sessionId: session.id,
      intakeMode: 'chatbot',
      rawPayload: payload,
      normalizedPayload: parsed.normalizedPayload,
      parseStatus: 'error',
      warnings: parsed.warnings,
      errors: parsed.hints,
    });

    return parsed;
  }

  await upsertNormalizedAnswers(
    session,
    parsed.answers.map((answer) => ({
      questionCode: answer.questionCode,
      value: answer.value,
    })),
    'chatbot',
  );

  await store.recordInstructionRun({
    sessionId: session.id,
    intakeMode: 'chatbot',
    rawPayload: payload,
    normalizedPayload: parsed.normalizedPayload,
    parseStatus: parsed.warnings.length > 0 ? 'partial' : 'success',
    warnings: parsed.warnings,
    errors: parsed.hints,
  });

  return parsed;
}

export async function scoreSessionById(session: SessionRow) {
  const store = getSessionStore();
  const questions = await store.getQuestions(session.questionSetId);
  const answers = await store.getAnswers(session.id);

  const result = scoreSession({
    questions: mapQuestionsToScoring(questions),
    answers: mapAnswersToScoring(answers),
  });

  await store.upsertResult(session.id, {
    typeCode: result.typeCode,
    dimensionBreakdown: result.dimensionBreakdown,
    strongestSignals: result.strongestSignals,
    tieFlags: result.tieFlags,
    scoreSummary: {
      answerCount: answers.length,
      questionCount: questions.length,
    },
  });

  await store.setSessionStatus(session.id, 'scored');
  await store.recordEvent({
    sessionId: session.id,
    userId: session.userId,
    eventName: 'session_scored',
    eventSource: 'server',
    eventPayload: {
      typeCode: result.typeCode,
    },
  });

  return result;
}

export async function getSessionResultById(sessionId: string) {
  const store = getSessionStore();
  const result = await store.getResult(sessionId);

  if (!result) {
    return null;
  }

  const normalizedResult = normalizePersistedResult(result);

  if (!normalizedResult) {
    return null;
  }

  const session = await store.getSession(sessionId);
  if (!session) {
    return null;
  }

  const questions = await store.getQuestions(session.questionSetId);
  const questionsByCode = new Map(questions.map((question) => [question.code, question]));
  const answers = await store.getAnswers(sessionId);
  const replayAnswers = answers
    .map((answer) => {
      const question = questionsByCode.get(answer.questionCode);
      return {
        questionCode: answer.questionCode,
        questionText: question?.text ?? answer.questionCode,
        selectedValue: answer.rawValue,
        questionKind: question?.questionKind ?? 'core',
        displayOrder: question?.displayOrder ?? Number.MAX_SAFE_INTEGER,
        reasoning: answer.reasoning,
      };
    })
    .sort((a, b) => a.displayOrder - b.displayOrder);
  const reasoningSnippets = answers
    .filter((answer) => Boolean(answer.reasoning))
    .slice(0, 5)
    .map((answer) => ({
      questionCode: answer.questionCode,
      reasoning: answer.reasoning,
    }));
  const evidence = buildEvidence({
    questions,
    answers,
    dimensionBreakdown: normalizedResult.dimensionBreakdown,
  });

  return {
    ...normalizedResult,
    replayAnswers,
    reasoningSnippets,
    evidence,
  };
}

export async function getTypeDistributionSummary(days = 7) {
  const store = getSessionStore();
  const rows = await store.getTypeDistribution(days);
  const sampleCount = rows.reduce((sum, row) => sum + row.count, 0);
  const minimumSample = 24;

  if (sampleCount < minimumSample) {
    return {
      sampleCount,
      minimumSample,
      mostCommon: null,
      rarest: null,
      rows,
    };
  }

  const sorted = [...rows].sort((a, b) => b.count - a.count);
  const mostCommon = sorted[0] ?? null;
  const rarest = [...sorted].sort((a, b) => a.count - b.count)[0] ?? null;

  return {
    sampleCount,
    minimumSample,
    mostCommon,
    rarest,
    rows: sorted,
  };
}

export async function getFunnelSummary(days = 7) {
  const store = getSessionStore();
  return store.getFunnelStats(days);
}

export async function trackEvent(params: {
  eventName: string;
  sessionId?: string;
  userId?: string;
  eventSource?: 'client' | 'server';
  eventPayload?: Record<string, unknown>;
}) {
  const store = getSessionStore();
  await store.recordEvent({
    eventName: params.eventName,
    sessionId: params.sessionId,
    userId: params.userId,
    eventSource: params.eventSource ?? 'server',
    eventPayload: params.eventPayload,
  });
}

export async function createCompareSet(params: {
  sessionIds: string[];
  labels?: string[];
  ownerUserId?: string;
}) {
  const store = getSessionStore();
  return store.createCompareSet(params);
}

export async function getCompareSetResults(compareSetId: string) {
  const store = getSessionStore();
  const compareSet = await store.getCompareSet(compareSetId);

  if (!compareSet) {
    return null;
  }

  const sessionsWithResults = await Promise.all(
    compareSet.items.map(async (item) => {
      const result = await getSessionResultById(item.sessionId);
      const session = await store.getSession(item.sessionId);
      return {
        sessionId: item.sessionId,
        label: item.label,
        intakeMode: session?.intakeMode,
        createdAt: session?.createdAt,
        result,
      };
    }),
  );
  const filtered = sessionsWithResults.flatMap((item) => {
    if (!item.result) {
      return [];
    }

    return [
      {
        sessionId: item.sessionId,
        label: item.label,
        intakeMode: item.intakeMode,
        createdAt: item.createdAt,
        result: item.result,
      },
    ];
  });

  return {
    compareSet,
    sessions: filtered,
  };
}

export async function claimSessionForUser(sessionId: string, userId: string) {
  const store = getSessionStore();
  await store.attachSessionToUser(sessionId, userId);
}

export async function listSessionsForUser(userId: string) {
  const store = getSessionStore();
  return store.listSessionsByUser(userId);
}

export async function requireSession(sessionId: string) {
  const store = getSessionStore();
  const session = await store.getSession(sessionId);

  if (!session) {
    throw new Error('Session not found');
  }

  return session;
}
