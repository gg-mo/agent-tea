'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { LANGS, translate, type Lang } from './dictionary';

type I18nContextValue = {
  lang: Lang;
  setLang: (next: Lang) => void;
  t: (key: string) => string;
};

const STORAGE_KEY = 'agentTeaLang';
const DEFAULT_LANG: Lang = 'en';

const I18nContext = createContext<I18nContextValue | null>(null);

function detectInitialLang(): Lang {
  if (typeof window === 'undefined') return DEFAULT_LANG;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && (LANGS as string[]).includes(stored)) {
      return stored as Lang;
    }
  } catch {
    // localStorage unavailable — fall back to navigator.
  }
  const nav = window.navigator?.language?.toLowerCase() ?? '';
  if (nav.startsWith('zh')) return 'zh';
  return DEFAULT_LANG;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    const initial = detectInitialLang();
    if (initial !== DEFAULT_LANG) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLangState(initial);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    }
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore.
    }
  }, []);

  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      setLang,
      t: (key: string) => translate(lang, key),
    }),
    [lang, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    // Allow non-client contexts to still call t safely by falling back to EN.
    return {
      lang: DEFAULT_LANG,
      setLang: () => undefined,
      t: (key: string) => translate(DEFAULT_LANG, key),
    };
  }
  return ctx;
}
