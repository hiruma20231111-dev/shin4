// ====================================================================
// Owner — オーナー紹介 (モード別、信頼の根拠)
// ====================================================================

import Image from 'next/image';

import { OWNERS } from '@/data/owners';
import type { Mode } from '@/lib/types';

import { FadeInOnScroll } from './FadeInOnScroll';

export function Owner() {
  return (
    <section
      id="owner"
      aria-label="オーナー紹介"
      className="py-20 md:py-28 bg-day-secondary/10 night:bg-night-secondary/15 transition-colors duration-mode"
    >
      <div className="mx-auto max-w-5xl px-4">
        <OwnerBlock mode="day" />
        <OwnerBlock mode="night" />
      </div>
    </section>
  );
}

function OwnerBlock({ mode }: { mode: Mode }) {
  const owner = OWNERS[mode];
  const accentFontClass =
    mode === 'day' ? 'font-day-accent' : 'font-night-accent';
  return (
    <FadeInOnScroll data-mode-only={mode}>
      <p
        className={`${accentFontClass} text-xl md:text-2xl tracking-widest text-day-primary night:text-night-primary`}
      >
        Owner
      </p>
      <h2 className="mt-2 font-serif text-2xl md:text-4xl text-day-text night:text-night-text">
        {mode === 'day' ? 'ヨガから、朝食へ。' : 'ハワイから、湘南の夜へ。'}
      </h2>

      <div className="mt-8 grid gap-8 md:grid-cols-[260px_1fr] items-start">
        <div className="img-hover-zoom relative aspect-[4/5] rounded-mode-lg overflow-hidden bg-day-secondary/15 night:bg-night-secondary/25 max-w-[260px]">
          <Image
            src={owner.imageSrc}
            alt={owner.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 260px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-serif text-xl text-day-text night:text-night-text">
            {owner.name}
          </p>
          <p className="mt-1 text-sm text-day-primary night:text-night-primary">
            {owner.role}
          </p>
          <p className="mt-4 text-sm md:text-base leading-relaxed text-day-text/90 night:text-night-text/90">
            {owner.bio}
          </p>
          <blockquote className="mt-6 border-l-2 border-day-accent night:border-night-accent pl-4 text-sm md:text-base italic text-day-text/95 night:text-night-text/95">
            {owner.message}
          </blockquote>
        </div>
      </div>
    </FadeInOnScroll>
  );
}
