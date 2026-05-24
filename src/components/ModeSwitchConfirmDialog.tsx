'use client';

// ====================================================================
// ModeSwitchConfirmDialog — 入力中ドラフトがある状態での切替確認
//
// アクセシビリティ:
//   - role="dialog" + aria-modal + aria-labelledby/aria-describedby
//   - Escapeでキャンセル
//   - 初期フォーカスをキャンセルボタンに置く (誤操作防止)
// ====================================================================

import { useEffect, useRef } from 'react';

import { BRANDS } from '@/data/brands';
import { MIN_TOUCH_TARGET_PX } from '@/lib/constants';
import type { Mode } from '@/lib/types';

type Props = {
  targetMode: Mode;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ModeSwitchConfirmDialog({
  targetMode,
  onConfirm,
  onCancel,
}: Props) {
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const targetBrand = BRANDS[targetMode].brandName;

  useEffect(() => {
    cancelRef.current?.focus();
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onCancel();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onCancel]);

  const minTouch: React.CSSProperties = {
    minWidth: `${MIN_TOUCH_TARGET_PX}px`,
    minHeight: `${MIN_TOUCH_TARGET_PX}px`,
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="mode-switch-confirm-title"
      aria-describedby="mode-switch-confirm-desc"
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-day-text/60 night:bg-night-bg/80 p-4"
    >
      <div className="w-full max-w-md rounded-mode-lg bg-day-bg night:bg-night-bg p-6 shadow-xl border border-day-secondary/30 night:border-night-secondary/40">
        <h2
          id="mode-switch-confirm-title"
          className="font-serif text-xl text-day-text night:text-night-text"
        >
          入力中の予約内容を削除して
          <br />
          <span className="text-day-accent night:text-night-accent">
            {targetBrand}
          </span>
          に切り替えますか？
        </h2>
        <p
          id="mode-switch-confirm-desc"
          className="mt-3 text-sm leading-relaxed text-day-text/80 night:text-night-text/80"
        >
          フォームに入力途中のデータがブラウザに保存されています。
          モードを切り替えると入力途中のデータのみ削除されます。
          送信済みのご予約には影響しません。
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            ref={cancelRef}
            type="button"
            onClick={onCancel}
            style={minTouch}
            className="rounded-mode-md border border-day-secondary night:border-night-secondary px-5 py-3 text-day-text night:text-night-text hover:bg-day-secondary/15 night:hover:bg-night-secondary/25 transition-colors"
          >
            入力を続ける
          </button>
          <button
            type="button"
            onClick={onConfirm}
            style={minTouch}
            className="rounded-mode-md bg-day-accent night:bg-night-accent px-5 py-3 font-semibold text-day-bg night:text-night-bg hover:opacity-90 transition-opacity"
          >
            削除して切り替える
          </button>
        </div>
      </div>
    </div>
  );
}
