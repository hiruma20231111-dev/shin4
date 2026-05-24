'use client';

// ====================================================================
// Faq — モード別 + 共通質問のアコーディオン
// <details>/<summary> ベースで JS なしでも動作可。
// ====================================================================

import { FAQ_ENTRIES } from '@/data/faq';
import type { FaqEntry, Mode } from '@/lib/types';

import { FadeInOnScroll } from './FadeInOnScroll';
import { useMode } from './ModeProvider';

export function Faq() {
  const { mode } = useMode();
  const visible = FAQ_ENTRIES.filter(
    (e) => e.scope === 'common' || e.scope === mode,
  );

  return (
    <section
      id="faq"
      aria-label="よくある質問"
      className="py-20 md:py-28 bg-day-secondary/10 night:bg-night-secondary/15 transition-colors duration-mode"
    >
      <div className="mx-auto max-w-3xl px-4">
        <FadeInOnScroll>
          <p className="font-serif text-sm tracking-widest text-day-primary night:text-night-primary uppercase">
            FAQ
          </p>
          <h2 className="mt-2 font-serif text-2xl md:text-4xl text-day-text night:text-night-text">
            よくある質問
          </h2>
          <p className="mt-2 text-sm text-day-text/70 night:text-night-text/70">
            「同じ場所ですか？」「昼の店で夜は飲めますか？」など、
            間借り営業ならではのご質問にお答えしています。
          </p>
        </FadeInOnScroll>

        <ul className="mt-8 space-y-3">
          {visible.map((entry) => (
            <FadeInOnScroll key={entry.id} as="li">
              <FaqItem entry={entry} mode={mode} />
            </FadeInOnScroll>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FaqItem({ entry, mode }: { entry: FaqEntry; mode: Mode }) {
  const scopeBadgeLabel =
    entry.scope === 'common'
      ? '共通'
      : entry.scope === 'day'
        ? '昼の部'
        : '夜の部';
  const scopeBadgeActive = entry.scope === mode;
  const scopeBadgeColor = scopeBadgeActive
    ? 'bg-day-accent text-day-bg night:bg-night-accent night:text-night-bg'
    : 'bg-day-secondary/25 text-day-text night:bg-night-secondary/35 night:text-night-text';

  return (
    <details className="group rounded-mode-md border border-day-secondary/30 night:border-night-secondary/30 bg-day-bg night:bg-night-bg open:shadow-sm">
      <summary className="cursor-pointer list-none flex items-start justify-between gap-4 px-5 py-4 text-day-text night:text-night-text">
        <span className="flex items-start gap-3">
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold shrink-0 ${scopeBadgeColor}`}
          >
            {scopeBadgeLabel}
          </span>
          <span className="font-serif text-base md:text-lg">
            {entry.question}
          </span>
        </span>
        <span
          aria-hidden="true"
          className="shrink-0 mt-1 text-day-primary night:text-night-primary transition-transform group-open:rotate-45"
        >
          ＋
        </span>
      </summary>
      <div className="px-5 pb-5 text-sm md:text-base leading-relaxed text-day-text/85 night:text-night-text/85">
        {entry.answer}
      </div>
    </details>
  );
}
