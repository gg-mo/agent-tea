'use client';

import Link from 'next/link';

import { useI18n } from '@/lib/i18n/I18nProvider';

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="relative z-10 mt-auto border-t border-white/[0.06] bg-black/20 px-6 py-6 text-center text-[0.72rem] text-slate-400 sm:px-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 sm:flex-row sm:justify-between">
        <p className="tracking-wide">
          {t('footer.tagline')}
        </p>
        <nav className="flex items-center gap-4">
          <Link
            href="/legal/privacy"
            className="transition-colors hover:text-slate-200"
          >
            {t('footer.privacy')}
          </Link>
          <span aria-hidden className="text-slate-600">
            ·
          </span>
          <Link
            href="/legal/terms"
            className="transition-colors hover:text-slate-200"
          >
            {t('footer.terms')}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
