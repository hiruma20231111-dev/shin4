// ====================================================================
// Concept — オーナーの想い・1日の物語 (モード別)
// ====================================================================

import { CONCEPT_BY_MODE } from '@/data/concept';
import type { Mode } from '@/lib/types';

import { FadeInOnScroll } from './FadeInOnScroll';

export function Concept() {
  return (
    <section
      id="concept"
      aria-label="コンセプト"
      className="py-20 md:py-28 bg-day-bg night:bg-night-bg transition-colors duration-mode"
    >
      <div className="mx-auto max-w-5xl px-4">
        <ConceptBody mode="day" />
        <ConceptBody mode="night" />
      </div>
    </section>
  );
}

function ConceptBody({ mode }: { mode: Mode }) {
  const content = CONCEPT_BY_MODE[mode];
  const accentFontClass =
    mode === 'day' ? 'font-day-accent' : 'font-night-accent';
  return (
    <FadeInOnScroll data-mode-only={mode} className="block">
      <p
        className={`${accentFontClass} text-xl md:text-2xl tracking-widest text-day-primary night:text-night-primary`}
      >
        {content.sectionLabel}
      </p>
      <h2 className="mt-2 font-serif text-2xl md:text-4xl text-day-text night:text-night-text leading-tight max-w-3xl">
        {content.title}
      </h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          {content.storyParagraphs.map((p) => (
            <p
              key={p}
              className="text-base leading-relaxed text-day-text/90 night:text-night-text/90"
            >
              {p}
            </p>
          ))}
        </div>
        <ol className="space-y-4 border-l-2 border-day-secondary night:border-night-secondary pl-6">
          {content.timelineHighlights.map((h) => (
            <li key={h.time} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[33px] top-1 inline-flex h-4 w-4 rounded-full bg-day-accent night:bg-night-accent"
              />
              <p className="font-serif text-2xl text-day-primary night:text-night-primary">
                {h.time}
              </p>
              <p className="mt-1 text-sm md:text-base text-day-text/90 night:text-night-text/90">
                {h.label}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </FadeInOnScroll>
  );
}
