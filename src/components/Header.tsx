'use client';

// ====================================================================
// Header — スクロール後に表示される縮小ヘッダー
//
// 仕様:
//   - 初期 (ヒーロー領域内) はトグルがヒーロー右上に固定で出ているので非表示
//   - SCROLL_THRESHOLD_HEADER_COMPACT_PX を超えたら表示し、
//     ヘッダー内に縮小版トグルを置く
// ====================================================================

import { useEffect, useState } from 'react';

import { SCROLL_THRESHOLD_HEADER_COMPACT_PX } from '@/lib/constants';

import { ModeToggle } from './ModeToggle';

export function Header() {
  const [showCompact, setShowCompact] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShowCompact(window.scrollY > SCROLL_THRESHOLD_HEADER_COMPACT_PX);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      aria-label="サイトヘッダー"
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        showCompact
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-day-bg/90 night:bg-night-bg/90 backdrop-blur-md border-b border-day-secondary/25 night:border-night-secondary/25">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
          <a
            href="#top"
            className="font-serif text-base md:text-lg text-day-text night:text-night-text"
          >
            <span data-mode-only="day">Sunday Bowls</span>
            <span data-mode-only="night">Moonday Bar</span>
          </a>
          <ModeToggle variant="compact" />
        </div>
      </div>
    </header>
  );
}
