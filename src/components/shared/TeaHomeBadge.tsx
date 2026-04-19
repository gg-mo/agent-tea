'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { LobsterMascot } from '@/components/landing/LobsterMascot';

type Visibility = 'expanded' | 'condensed' | 'hidden';

export function TeaHomeBadge() {
  const [visibility, setVisibility] = useState<Visibility>('expanded');
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (currentY < 80) {
        setVisibility('expanded');
      } else if (delta > 4) {
        setVisibility('hidden');
      } else if (delta < -4) {
        setVisibility('condensed');
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHidden = visibility === 'hidden';
  const isCondensed = visibility === 'condensed';

  return (
    <Link
      href="/"
      aria-label="Back to Agent Tea home"
      className={`group fixed left-4 top-4 z-40 inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/60 px-2.5 py-1.5 text-slate-300 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.8)] backdrop-blur transition-all duration-300 hover:border-white/20 hover:text-white sm:left-6 sm:top-6 ${
        isHidden
          ? 'pointer-events-none -translate-y-3 opacity-0'
          : 'translate-y-0 opacity-100'
      }`}
    >
      <span className="relative flex h-6 w-6 items-center justify-center">
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-cyan-300/20 blur-md transition-opacity duration-300 group-hover:opacity-80"
        />
        <LobsterMascot className="relative h-6 w-6 shrink-0" />
      </span>
      <span
        className={`tea-eyebrow overflow-hidden whitespace-nowrap text-cyan-200/85 transition-all duration-300 group-hover:text-cyan-100 ${
          isCondensed ? 'max-w-0 opacity-0' : 'max-w-[120px] pr-1 opacity-100'
        }`}
      >
        Agent Tea
      </span>
    </Link>
  );
}
