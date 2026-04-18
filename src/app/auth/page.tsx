import { AuthEmailForm } from '@/components/auth/AuthEmailForm';

type SearchParams = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function AuthPage({ searchParams }: SearchParams) {
  const claim = typeof searchParams?.claim === 'string' ? searchParams.claim : undefined;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-3xl font-black">Save your Agent Tea history</h1>
        <p className="mt-2 text-sm text-slate-300">
          Optional sign-in keeps your results and compare links in one profile.
        </p>

        <div className="mt-6">
          <AuthEmailForm claimSessionId={claim} />
        </div>
      </div>
    </main>
  );
}
