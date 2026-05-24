// ====================================================================
// Reviews — Googleビジネスプロフィール口コミ形式モック (写真なし)
// ====================================================================

import { REVIEWS_BY_MODE } from '@/data/reviews';
import type { Mode, Review } from '@/lib/types';

import { FadeInOnScroll } from './FadeInOnScroll';

const FULL_STAR = 5;

export function Reviews() {
  return (
    <section
      id="reviews"
      aria-label="お客様の声"
      className="py-20 md:py-28 bg-day-bg night:bg-night-bg transition-colors duration-mode"
    >
      <div className="mx-auto max-w-6xl px-4">
        <ReviewBlock mode="day" />
        <ReviewBlock mode="night" />
      </div>
    </section>
  );
}

function ReviewBlock({ mode }: { mode: Mode }) {
  const reviews = REVIEWS_BY_MODE[mode];
  const accentFontClass =
    mode === 'day' ? 'font-day-accent' : 'font-night-accent';
  return (
    <div data-mode-only={mode}>
      <FadeInOnScroll>
        <p
          className={`${accentFontClass} text-xl md:text-2xl tracking-widest text-day-primary night:text-night-primary`}
        >
          Reviews
        </p>
        <h2 className="mt-2 font-serif text-2xl md:text-4xl text-day-text night:text-night-text">
          {mode === 'day'
            ? '湘南の朝に通う、常連の声'
            : '夜の島時間を訪れた、人々の声'}
        </h2>
        <p className="mt-2 text-sm text-day-text/70 night:text-night-text/70">
          Googleビジネスプロフィールに寄せられたレビュー (掲載許可済みの抜粋)
        </p>
      </FadeInOnScroll>

      <ul className="mt-8 grid gap-6 md:grid-cols-2">
        {reviews.map((r) => (
          <FadeInOnScroll key={r.id} as="li">
            <ReviewCard review={r} />
          </FadeInOnScroll>
        ))}
      </ul>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="rounded-mode-md border border-day-secondary/30 night:border-night-secondary/30 bg-day-bg night:bg-night-bg p-6 h-full">
      <div className="flex items-center justify-between gap-3">
        <p className="font-serif text-base text-day-text night:text-night-text">
          {review.authorName}
        </p>
        <p className="text-xs text-day-text/60 night:text-night-text/60">
          {review.postedAt}
        </p>
      </div>
      <p
        aria-label={`星評価 ${review.rating} / ${FULL_STAR}`}
        className="mt-2 text-day-accent night:text-night-accent text-lg tracking-wider"
      >
        {'★'.repeat(review.rating)}
        <span className="text-day-text/25 night:text-night-text/25">
          {'★'.repeat(FULL_STAR - review.rating)}
        </span>
      </p>
      <p className="mt-3 text-sm md:text-base leading-relaxed text-day-text/90 night:text-night-text/90">
        {review.body}
      </p>
    </article>
  );
}
