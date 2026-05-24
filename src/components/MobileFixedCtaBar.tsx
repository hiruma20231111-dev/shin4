'use client';

// ====================================================================
// MobileFixedCtaBar — モバイル下部固定の3タップ導線
// (LINE / 電話 / フォーム)
// ====================================================================

import { BRANDS } from '@/data/brands';
import { CONTACT, MIN_TOUCH_TARGET_PX } from '@/lib/constants';

import { useMode } from './ModeProvider';

export function MobileFixedCtaBar() {
  const { mode } = useMode();
  const brand = BRANDS[mode];
  const contact = CONTACT[mode];

  const minTouch: React.CSSProperties = {
    minHeight: `${MIN_TOUCH_TARGET_PX}px`,
  };

  return (
    <nav
      aria-label="主要な問い合わせ導線"
      className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-day-bg/95 night:bg-night-bg/95 backdrop-blur-md border-t border-day-secondary/30 night:border-night-secondary/30"
      // iOS safe area
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="grid grid-cols-3">
        <li>
          <a
            href={contact.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={minTouch}
            className="flex flex-col items-center justify-center px-2 py-2 text-day-accent night:text-night-accent"
          >
            <span aria-hidden="true" className="text-xl leading-none">
              ◎
            </span>
            <span className="mt-1 text-[11px] font-semibold">LINE</span>
          </a>
        </li>
        <li className="border-x border-day-secondary/30 night:border-night-secondary/30">
          <a
            href={`tel:${contact.tel.replace(/[^0-9+]/g, '')}`}
            style={minTouch}
            className="flex flex-col items-center justify-center px-2 py-2 text-day-primary night:text-night-primary"
          >
            <span aria-hidden="true" className="text-xl leading-none">
              ☏
            </span>
            <span className="mt-1 text-[11px] font-semibold">
              {mode === 'day' ? '電話' : '電話'}
            </span>
          </a>
        </li>
        <li>
          <a
            href="#reservation-form"
            style={minTouch}
            className="flex flex-col items-center justify-center px-2 py-2 text-day-text night:text-night-text"
          >
            <span aria-hidden="true" className="text-xl leading-none">
              ✎
            </span>
            <span className="mt-1 text-[11px] font-semibold">
              {brand.secondaryCtaLabel}
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
