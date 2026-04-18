'use client';

import { useState } from 'react';

import { createSupabaseAuthBrowserClient } from '@/lib/supabase/auth-browser';

type Props = {
  claimSessionId?: string;
};

export function AuthEmailForm({ claimSessionId }: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sent' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    try {
      const supabase = createSupabaseAuthBrowserClient();
      const callbackUrl = new URL('/auth/callback', window.location.origin);
      if (claimSessionId) {
        callbackUrl.searchParams.set('claim', claimSessionId);
      }

      const { error: signInError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: callbackUrl.toString(),
        },
      });

      if (signInError) {
        throw signInError;
      }

      setStatus('sent');
      void fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventName: 'auth_magic_link_requested',
          sessionId: claimSessionId,
        }),
      }).catch(() => undefined);
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Failed to send magic link');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block text-sm text-slate-300" htmlFor="email">
        Email
      </label>
      <input
        id="email"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="w-full rounded-xl border border-white/20 bg-slate-950 px-3 py-2 text-slate-100"
        placeholder="you@example.com"
      />

      <button
        type="submit"
        className="rounded-xl bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-200"
      >
        Send magic link
      </button>

      {status === 'sent' ? (
        <p className="text-sm text-emerald-200">Check your inbox for the sign-in link.</p>
      ) : null}

      {status === 'error' && error ? <p className="text-sm text-rose-200">{error}</p> : null}
    </form>
  );
}
