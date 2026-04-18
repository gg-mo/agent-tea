import Link from 'next/link';
import { redirect } from 'next/navigation';

import { listSessionsForUser } from '@/lib/server/session-service';
import { createSupabaseAuthServerClient } from '@/lib/supabase/auth-server';

export default async function ProfilePage() {
  const supabase = await createSupabaseAuthServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth');
  }

  const sessions = await listSessionsForUser(user.id);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-black">Your Agent Tea profile</h1>
        <p className="mt-2 text-sm text-slate-300">Signed in as {user.email}</p>

        <section className="mt-6 space-y-3">
          {sessions.length === 0 ? (
            <p className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
              No claimed sessions yet.
            </p>
          ) : null}

          {sessions.map((session) => (
            <article key={session.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs text-slate-400">{session.intakeMode}</p>
              <p className="mt-1 text-sm text-slate-200">Session {session.id}</p>
              <Link href={`/results/${session.id}`} className="mt-2 inline-block text-sm text-cyan-300 hover:underline">
                Open result
              </Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
