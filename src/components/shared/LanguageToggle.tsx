'use client';

import { useEffect, useRef, useState } from 'react';

import { useI18n } from '@/lib/i18n/I18nProvider';

export function LanguageToggle() {
  const { lang, setLang, t } = useI18n();
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const onScroll = () => {
      const current = window.scrollY;
      const delta = current - lastScrollY.current;
      if (current < 80) setHidden(false);
      else if (delta > 4) setHidden(true);
      else if (delta < -4) setHidden(false);
      lastScrollY.current = current;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      role="group"
      aria-label={t('lang.toggle.aria')}
      className={`fixed right-4 top-4 z-40 inline-flex items-center gap-0.5 rounded-full border border-white/10 bg-slate-950/60 p-0.5 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.8)] backdrop-blur transition-all duration-300 sm:right-6 sm:top-6 ${
        hidden ? 'pointer-events-none -translate-y-3 opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <LangButton active={lang === 'en'} onClick={() => setLang('en')}>
        EN
      </LangButton>
      <LangButton active={lang === 'zh'} onClick={() => setLang('zh')}>
        中
      </LangButton>
    </div>
  );
}

function LangButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex h-6 min-w-[28px] items-center justify-center rounded-full px-2 text-[0.72rem] font-semibold tracking-wide transition-colors ${
        active
          ? 'bg-cyan-300/90 text-slate-950'
          : 'text-slate-300 hover:text-white'
      }`}
    >
      {children}
    </button>
  );
}
