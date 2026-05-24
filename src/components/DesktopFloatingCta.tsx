'use client';

// ====================================================================
// DesktopFloatingCta — デスクトップで画面右端に追従するサイドCTA
// ====================================================================

import { BRANDS } from '@/data/brands';
import { CONTACT, MIN_TOUCH_TARGET_PX } from '@/lib/constants';

import { useMode } from './ModeProvider';

export function DesktopFloatingCta() {
  const { mode } = useMode();
  const brand = BRANDS[mode];
  const contact = CONTACT[mode];

  const minTouch: React.CSSProperties = {
    minWidth: `${MIN_TOUCH_TARGET_PX}px`,
    minHeight: `${MIN_TOUCH_TARGET_PX}px`,
  };

  return (
    <aside
      aria-label="主要な問い合わせ導線 (デスクトップ)"
      className="hidden md:flex fixed bottom-6 right-6 z-30 flex-col gap-3"
    >
      <a
        href={contact.lineUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={minTouch}
        className="inline-flex items-center gap-2 rounded-full bg-day-accent night:bg-night-accent px-5 py-3 font-semibold text-day-bg night:text-night-bg shadow-xl hover:opacity-90 transition-opacity"
      >
        <span aria-hidden="true">◎</span>
        LINEで友だち追加
      </a>
      <a
        href={`tel:${contact.tel.replace(/[^0-9+]/g, '')}`}
        style={minTouch}
        className="inline-flex items-center gap-2 rounded-full bg-day-primary night:bg-night-primary px-5 py-3 font-semibold text-day-bg night:text-night-bg shadow-xl hover:opacity-90 transition-opacity"
      >
        <span aria-hidden="true">☏</span>
        {contact.tel}
      </a>
      <a
        href="#reservation-form"
        style={minTouch}
        className="inline-flex items-center gap-2 rounded-full bg-day-bg night:bg-night-bg border border-day-primary night:border-night-primary px-5 py-3 font-semibold text-day-primary night:text-night-primary shadow-xl hover:bg-day-primary/10 night:hover:bg-night-primary/15 transition-colors"
      >
        <span aria-hidden="true">✎</span>
        {brand.secondaryCtaLabel}
      </a>
    </aside>
  );
}
