'use client';

// ====================================================================
// Menu — モードごと2タブ切替 (3〜6品)
// ====================================================================

import Image from 'next/image';
import { useMemo, useState } from 'react';

import { MENU_BY_MODE } from '@/data/menu';
import { MIN_TOUCH_TARGET_PX } from '@/lib/constants';
import type { MenuCategory, MenuCategoryId, Mode } from '@/lib/types';

import { FadeInOnScroll } from './FadeInOnScroll';
import { useMode } from './ModeProvider';

const PRICE_LOCALE = 'ja-JP';

export function Menu() {
  const { mode } = useMode();

  return (
    <section
      id="menu"
      aria-label="メニュー"
      className="py-20 md:py-28 bg-day-bg night:bg-night-bg transition-colors duration-mode"
    >
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader mode={mode} />
        <MenuTabs mode={mode} />
      </div>
    </section>
  );
}

function SectionHeader({ mode }: { mode: Mode }) {
  const accentFontClass =
    mode === 'day' ? 'font-day-accent' : 'font-night-accent';
  return (
    <FadeInOnScroll>
      <p
        className={`${accentFontClass} text-xl md:text-2xl tracking-widest text-day-primary night:text-night-primary`}
      >
        Menu
      </p>
      <h2 className="mt-2 font-serif text-2xl md:text-4xl text-day-text night:text-night-text">
        <span data-mode-only="day">朝陽と一緒に食べる、定番3カテゴリ</span>
        <span data-mode-only="night">月明かりの下で味わう、自家製の3カテゴリ</span>
      </h2>
    </FadeInOnScroll>
  );
}

/**
 * モードが切り替わると activeId が現在のモードのカテゴリ集合に含まれないので
 * useMemo で常に先頭カテゴリへフォールバックする。
 */
function MenuTabs({ mode }: { mode: Mode }) {
  const categories = MENU_BY_MODE[mode];
  const firstCategoryId = categories[0]?.id;
  const [activeIdByMode, setActiveIdByMode] = useState<
    Partial<Record<Mode, MenuCategoryId>>
  >({});

  const activeId: MenuCategoryId | undefined = useMemo(() => {
    const stored = activeIdByMode[mode];
    if (stored && categories.some((c) => c.id === stored)) return stored;
    return firstCategoryId;
  }, [activeIdByMode, mode, categories, firstCategoryId]);

  const activeCategory: MenuCategory | undefined = categories.find(
    (c) => c.id === activeId,
  );

  const minTouch: React.CSSProperties = {
    minHeight: `${MIN_TOUCH_TARGET_PX}px`,
  };

  return (
    <div className="mt-8">
      {/* タブヘッダー */}
      <div
        role="tablist"
        aria-label="メニューカテゴリ"
        className="inline-flex rounded-mode-md border border-day-secondary night:border-night-secondary bg-day-bg/60 night:bg-night-bg/60 p-1"
      >
        {categories.map((cat) => {
          const active = cat.id === activeId;
          return (
            <button
              key={cat.id}
              role="tab"
              type="button"
              aria-selected={active}
              aria-controls={`menu-panel-${cat.id}`}
              id={`menu-tab-${cat.id}`}
              onClick={() =>
                setActiveIdByMode((prev) => ({ ...prev, [mode]: cat.id }))
              }
              style={minTouch}
              className={`px-5 py-2 rounded-mode-md font-serif transition-colors ${
                active
                  ? 'bg-day-accent text-day-bg night:bg-night-accent night:text-night-bg'
                  : 'text-day-text/80 night:text-night-text/80 hover:text-day-text night:hover:text-night-text'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* パネル */}
      {activeCategory && (
        <div
          role="tabpanel"
          id={`menu-panel-${activeCategory.id}`}
          aria-labelledby={`menu-tab-${activeCategory.id}`}
          className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {activeCategory.items.map((item) => (
            <FadeInOnScroll key={item.id}>
              <article className="rounded-mode-lg bg-day-bg night:bg-night-bg border border-day-secondary/30 night:border-night-secondary/30 overflow-hidden shadow-sm">
                <div className="img-hover-zoom relative aspect-[4/3] bg-day-secondary/15 night:bg-night-secondary/25">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                  {item.badge && (
                    <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-day-accent night:bg-night-accent px-3 py-1 text-xs font-semibold text-day-bg night:text-night-bg">
                      {item.badge}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg text-day-text night:text-night-text">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-day-text/85 night:text-night-text/85">
                    {item.description}
                  </p>
                  <p className="mt-4 font-serif text-2xl text-day-primary night:text-night-primary">
                    ¥{item.priceYen.toLocaleString(PRICE_LOCALE)}
                    <span className="ml-1 text-xs text-day-text/60 night:text-night-text/60">
                      (税込)
                    </span>
                  </p>
                </div>
              </article>
            </FadeInOnScroll>
          ))}
        </div>
      )}
    </div>
  );
}
