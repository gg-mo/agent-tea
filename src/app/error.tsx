'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="min-h-screen bg-slate-950 p-8 text-slate-100">
        <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-black">Something went sideways</h2>
          <p className="mt-2 text-sm text-slate-300">
            We hit an unexpected issue. Try again, and if it keeps happening, check server logs.
          </p>
          <p className="mt-2 text-xs text-slate-500">{error.digest ?? error.message}</p>
          <button
            type="button"
            onClick={reset}
            className="mt-4 rounded-xl bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950"
          >
            Retry
          </button>
        </div>
      </body>
    </html>
  );
}
