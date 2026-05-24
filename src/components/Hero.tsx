'use client';

// ====================================================================
// Hero — モード別ヒーロー (両モード同時に DOM へ描画し CSS で切替)
// ヒーロー右上にモード切替トグルをfloating配置。
// ====================================================================

import Image from 'next/image';

import { BRANDS } from '@/data/brands';
import { CONTACT, MIN_TOUCH_TARGET_PX } from '@/lib/constants';
import type { Mode } from '@/lib/types';

import { ModeToggle } from './ModeToggle';

export function Hero() {
  return (
    <section
      id="top"
      aria-label="ファーストビュー"
      className="relative min-h-[88vh] md:min-h-[92vh] overflow-hidden"
    >
      {/* 背景画像: 両モード同時描画 (CSSで切替) */}
      <HeroBackground mode="day" />
      <HeroBackground mode="night" />

      {/* オーバーレイ */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-day-bg/35 night:bg-night-bg/55 transition-colors duration-mode"
      />

      {/* 右上の常時アクセス可能なトグル */}
      <div className="absolute top-4 right-4 z-20">
        <ModeToggle variant="floating" />
      </div>

      {/* テキストコンテンツ */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-32 pb-16 md:pt-40 md:pb-24 flex flex-col items-start">
        <HeroBody mode="day" />
        <HeroBody mode="night" />
      </div>
    </section>
  );
}

function HeroBackground({ mode }: { mode: Mode }) {
  const brand = BRANDS[mode];
  return (
    <div
      data-mode-only={mode}
      className="absolute inset-0"
      aria-hidden="true"
    >
      <Image
        src={brand.heroImageSrc}
        alt=""
        fill
        priority={mode === 'day'}
        sizes="100vw"
        className="object-cover"
      />
    </div>
  );
}

function HeroBody({ mode }: { mode: Mode }) {
  const brand = BRANDS[mode];
  const minTouch: React.CSSProperties = {
    minHeight: `${MIN_TOUCH_TARGET_PX}px`,
  };
  const accentFontClass =
    mode === 'day' ? 'font-day-accent' : 'font-night-accent';

  return (
    <div
      data-mode-only={mode}
      className="max-w-2xl w-full text-day-text night:text-night-text"
    >
      <p
        className={`${accentFontClass} text-xl md:text-2xl tracking-widest text-day-primary night:text-night-primary`}
      >
        {mode === 'day' ? 'Morning Light' : 'Tiki Nights'}
      </p>
      <h1 className="mt-3 font-serif text-3xl md:text-5xl leading-tight text-day-text night:text-night-text">
        {brand.brandName}
      </h1>
      <p className="mt-4 text-base md:text-lg leading-relaxed text-day-text night:text-night-text/95 max-w-xl">
        {brand.catchCopy}
      </p>
      <p className="mt-2 text-sm md:text-base text-day-text/80 night:text-night-text/85 max-w-xl">
        {brand.description}
      </p>

      {/* 信頼バッジ */}
      <ul className="mt-6 flex flex-wrap gap-2">
        {brand.trustBadges.map((badge) => (
          <li
            key={badge}
            className="inline-flex items-center rounded-full border border-day-secondary night:border-night-secondary bg-day-bg/70 night:bg-night-bg/70 px-3 py-1 text-xs md:text-sm text-day-text night:text-night-text"
          >
            {badge}
          </li>
        ))}
      </ul>

      {/* 最上位CTA: LINE登録 */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <a
          href={CONTACT[mode].lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={minTouch}
          className="inline-flex items-center justify-center rounded-mode-md bg-day-accent night:bg-night-accent px-6 py-3 font-semibold text-day-bg night:text-night-bg shadow-md hover:opacity-90 transition-opacity"
        >
          {brand.primaryCtaLabel}
        </a>
        <a
          href="#reservation-form"
          style={minTouch}
          className="inline-flex items-center justify-center rounded-mode-md border border-day-primary night:border-night-primary px-6 py-3 text-day-primary night:text-night-primary hover:bg-day-primary/10 night:hover:bg-night-primary/15 transition-colors"
        >
          {brand.secondaryCtaLabel}
        </a>
      </div>
    </div>
  );
}
