'use client';

// ====================================================================
// CrossPromotionBanner — 「もう一つの顔をのぞく」(仮切替)
//
// 仕様:
//   - 押下時は requestModeSwitch(mode, 'session') = sessionStorage 仮切替
//   - localStorage は上書きしない (タブを閉じるとリセット)
// ====================================================================

import { BRANDS } from '@/data/brands';
import { MIN_TOUCH_TARGET_PX } from '@/lib/constants';
import { oppositeMode } from '@/lib/modeUtils';

import { FadeInOnScroll } from './FadeInOnScroll';
import { useMode } from './ModeProvider';

export function CrossPromotionBanner() {
  const { mode, requestModeSwitch } = useMode();
  const other = oppositeMode(mode);
  const otherBrand = BRANDS[other];
  const minTouch: React.CSSProperties = {
    minHeight: `${MIN_TOUCH_TARGET_PX}px`,
  };

  return (
    <section
      aria-label="クロス送客バナー"
      className="bg-day-secondary/15 night:bg-night-secondary/25 border-y border-day-secondary/30 night:border-night-secondary/30"
    >
      <FadeInOnScroll className="mx-auto max-w-5xl px-4 py-10 md:py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="font-serif text-sm tracking-widest text-day-primary night:text-night-primary uppercase">
            Another Side
          </p>
          <h2 className="mt-1 font-serif text-xl md:text-2xl text-day-text night:text-night-text">
            この場所には、もう一つの顔があります。
          </h2>
          <p className="mt-2 text-sm md:text-base text-day-text/85 night:text-night-text/85 max-w-2xl">
            {otherBrand.crossPromotionLabel}
          </p>
          <p className="mt-1 text-xs text-day-text/60 night:text-night-text/60">
            ※ この訪問中だけ表示が切り替わります。タブを閉じると元に戻ります。
          </p>
        </div>
        <button
          type="button"
          onClick={() => requestModeSwitch(other, { scope: 'session' })}
          style={minTouch}
          className="shrink-0 inline-flex items-center justify-center rounded-mode-md bg-day-primary night:bg-night-primary px-6 py-3 font-semibold text-day-bg night:text-night-bg hover:opacity-90 transition-opacity"
        >
          {otherBrand.brandName} をのぞく
          <span aria-hidden="true" className="ml-2">
            →
          </span>
        </button>
      </FadeInOnScroll>
    </section>
  );
}
