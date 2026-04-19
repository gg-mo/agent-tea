import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-auto border-t border-white/[0.06] bg-black/20 px-6 py-6 text-center text-[0.72rem] text-slate-400 sm:px-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 sm:flex-row sm:justify-between">
        <p className="tracking-wide">
          Agent Tea — a vibe check, not a psych eval.
        </p>
        <nav className="flex items-center gap-4">
          <Link
            href="/legal/privacy"
            className="transition-colors hover:text-slate-200"
          >
            Privacy
          </Link>
          <span aria-hidden className="text-slate-600">
            ·
          </span>
          <Link
            href="/legal/terms"
            className="transition-colors hover:text-slate-200"
          >
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  );
}
