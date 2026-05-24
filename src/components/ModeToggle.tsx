'use client';

// ====================================================================
// ModeToggle — ☀ DAY / ☾ NIGHT のセグメント型トグル
//
// 仕様:
//   - ヒーロー右上に固定で常時アクセス可能
//   - スクロール後はヘッダー内に縮小表示 (variant prop で切替)
//   - タップ領域 44px 確保
//   - 永続化切替: requestModeSwitch('persist') を通すことで
//     フォーム入力中の安全確認を担保
// ====================================================================

import { MIN_TOUCH_TARGET_PX } from '@/lib/constants';
import type { Mode } from '@/lib/types';

import { useMode } from './ModeProvider';

type Variant = 'floating' | 'compact';

export function ModeToggle({ variant }: { variant: Variant }) {
  const { mode, requestModeSwitch } = useMode();

  const onSelect = (next: Mode) => {
    if (next === mode) return;
    requestModeSwitch(next, { scope: 'persist' });
  };

  const minTouch: React.CSSProperties = {
    minHeight: `${MIN_TOUCH_TARGET_PX}px`,
  };

  const containerClass =
    variant === 'floating'
      ? 'rounded-full border border-day-secondary/60 night:border-night-secondary/60 bg-day-bg/85 night:bg-night-bg/80 backdrop-blur-md shadow-lg'
      : 'rounded-full border border-day-secondary/50 night:border-night-secondary/50 bg-day-bg/70 night:bg-night-bg/70';

  const paddingClass =
    variant === 'floating' ? 'p-1.5' : 'p-1';
  const fontClass =
    variant === 'floating'
      ? 'text-sm tracking-wider'
      : 'text-xs tracking-wider';

  return (
    <div
      role="group"
      aria-label="昼夜モード切替"
      className={`inline-flex items-center ${containerClass} ${paddingClass}`}
      style={minTouch}
    >
      <ToggleButton
        active={mode === 'day'}
        onClick={() => onSelect('day')}
        ariaLabel="昼の部 Sunday Bowls に切替"
        fontClass={fontClass}
      >
        <span aria-hidden="true">☀</span>
        <span className="ml-1.5 font-serif">DAY</span>
      </ToggleButton>
      <ToggleButton
        active={mode === 'night'}
        onClick={() => onSelect('night')}
        ariaLabel="夜の部 Moonday Bar に切替"
        fontClass={fontClass}
      >
        <span aria-hidden="true">☾</span>
        <span className="ml-1.5 font-serif">NIGHT</span>
      </ToggleButton>
    </div>
  );
}

function ToggleButton({
  active,
  onClick,
  ariaLabel,
  children,
  fontClass,
}: {
  active: boolean;
  onClick: () => void;
  ariaLabel: string;
  children: React.ReactNode;
  fontClass: string;
}) {
  const minTouch: React.CSSProperties = {
    minWidth: `${MIN_TOUCH_TARGET_PX}px`,
    minHeight: `${MIN_TOUCH_TARGET_PX}px`,
  };
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={active}
      style={minTouch}
      className={`flex items-center justify-center px-4 py-2 rounded-full transition-colors ${fontClass} ${
        active
          ? 'bg-day-accent text-day-bg night:bg-night-accent night:text-night-bg'
          : 'text-day-text/70 night:text-night-text/70 hover:text-day-text night:hover:text-night-text'
      }`}
    >
      {children}
    </button>
  );
}
