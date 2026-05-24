'use client';

// ====================================================================
// FinalCta — LINE登録 (最上位) + 電話 + 予約フォーム (3導線)
// ====================================================================

import { BRANDS } from '@/data/brands';
import { CONTACT, MIN_TOUCH_TARGET_PX } from '@/lib/constants';

import { FadeInOnScroll } from './FadeInOnScroll';
import { useMode } from './ModeProvider';
import { ReservationForm } from './ReservationForm';

export function FinalCta() {
  const { mode } = useMode();
  const brand = BRANDS[mode];
  const contact = CONTACT[mode];

  const minTouch: React.CSSProperties = {
    minHeight: `${MIN_TOUCH_TARGET_PX}px`,
  };

  return (
    <section
      id="final-cta"
      aria-label="お問い合わせと予約"
      className="py-20 md:py-28 bg-day-primary/10 night:bg-night-primary/15 transition-colors duration-mode"
    >
      <div className="mx-auto max-w-5xl px-4">
        <FadeInOnScroll>
          <p className="font-serif text-sm tracking-widest text-day-primary night:text-night-primary uppercase">
            Contact
          </p>
          <h2 className="mt-2 font-serif text-2xl md:text-4xl text-day-text night:text-night-text">
            <span data-mode-only="day">海辺の朝食を、予約しておく。</span>
            <span data-mode-only="night">月の夜を、席を取って楽しむ。</span>
          </h2>
          <p className="mt-2 text-sm md:text-base text-day-text/85 night:text-night-text/85">
            最短はLINE登録。電話・フォームでも受け付けています。
          </p>
        </FadeInOnScroll>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {/* LINE + Tel カード */}
          <FadeInOnScroll className="rounded-mode-lg bg-day-bg night:bg-night-bg border border-day-secondary/30 night:border-night-secondary/30 p-6 md:p-8">
            <p className="font-serif text-base text-day-text night:text-night-text">
              LINE登録 (最短)
            </p>
            <p className="mt-1 text-sm text-day-text/85 night:text-night-text/85">
              {brand.primaryCtaLabel}
            </p>
            <a
              href={contact.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={minTouch}
              className="mt-4 inline-flex items-center justify-center rounded-mode-md bg-day-accent night:bg-night-accent px-6 py-3 font-semibold text-day-bg night:text-night-bg hover:opacity-90 transition-opacity w-full"
            >
              LINEで友だち追加
            </a>

            <div className="mt-8 pt-6 border-t border-day-secondary/30 night:border-night-secondary/30">
              <p className="font-serif text-base text-day-text night:text-night-text">
                お電話
              </p>
              <p className="mt-1 text-xs text-day-text/70 night:text-night-text/70">
                <span data-mode-only="day">受付: 8:00〜15:30</span>
                <span data-mode-only="night">受付: 18:00〜24:00</span>
              </p>
              <a
                href={`tel:${contact.tel.replace(/[^0-9+]/g, '')}`}
                style={minTouch}
                className="mt-3 inline-flex items-center justify-center rounded-mode-md border border-day-primary night:border-night-primary px-6 py-3 text-day-primary night:text-night-primary hover:bg-day-primary/10 night:hover:bg-night-primary/15 transition-colors w-full font-serif text-lg"
              >
                {contact.tel}
              </a>
            </div>
          </FadeInOnScroll>

          {/* 予約フォーム */}
          <FadeInOnScroll
            id="reservation-form"
            className="rounded-mode-lg bg-day-bg night:bg-night-bg border border-day-secondary/30 night:border-night-secondary/30 p-6 md:p-8"
          >
            <p className="font-serif text-base text-day-text night:text-night-text">
              {brand.secondaryCtaLabel}
            </p>
            <p className="mt-1 text-sm text-day-text/70 night:text-night-text/70">
              必要事項を送信すると、確認のご連絡をいたします。
            </p>
            <div className="mt-5">
              <ReservationForm />
            </div>
          </FadeInOnScroll>
        </div>
      </div>
    </section>
  );
}
