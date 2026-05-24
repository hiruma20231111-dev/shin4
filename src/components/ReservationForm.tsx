'use client';

// ====================================================================
// ReservationForm — ネイティブHTML5バリデーションでLP内予約フォーム
//
// - react-hook-form 非使用、constraint validation API を使用
// - 入力途中ドラフトを localStorage に保存 (モード切替時の保護対象)
// - 送信はモック (送信完了UIのみ。バックエンドなし)
// - 送信完了済みデータは別状態に保持し、モード切替の確認対象外
// ====================================================================

import { useEffect, useId, useMemo, useRef, useState } from 'react';

import {
  MIN_TOUCH_TARGET_PX,
  STORAGE_KEY_RESERVATION_DRAFT,
} from '@/lib/constants';
import type { ReservationDraft } from '@/lib/types';

import { useMode } from './ModeProvider';

const DEFAULT_PARTY_SIZE_OPTIONS = ['1', '2', '3', '4', '5', '6', '7+'];

type FieldErrors = Partial<
  Record<
    'name' | 'tel' | 'partySize' | 'date' | 'time' | 'note',
    string
  >
>;

function emptyDraft(mode: ReservationDraft['mode']): ReservationDraft {
  return {
    mode,
    name: '',
    tel: '',
    partySize: '',
    date: '',
    time: '',
    note: '',
    savedAt: new Date().toISOString(),
  };
}

export function ReservationForm() {
  const { mode } = useMode();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [draft, setDraft] = useState<ReservationDraft>(emptyDraft(mode));
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const idPrefix = useId();

  // 過去日の選択を抑止する <input type="date"> 用の min 値 (YYYY-MM-DD ローカル日付)
  const todayIso = useMemo(() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }, []);

  // マウント時: localStorage からドラフトを復元 (同一モードのみ)
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY_RESERVATION_DRAFT);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<ReservationDraft>;
      if (parsed && parsed.mode === mode) {
        setDraft({ ...emptyDraft(mode), ...parsed, mode });
      }
    } catch {
      // パース失敗時は無視
    }
  }, [mode]);

  // モード切替などで localStorage のドラフトがクリアされた場合、
  // 内部 state もクリアして食い違いを防ぐ
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY_RESERVATION_DRAFT && e.newValue === null) {
        setDraft(emptyDraft(mode));
        setSubmitted(false);
      }
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [mode]);

  // draft 変更を localStorage へ保存 (空のフィールドだけの場合は保存しない)
  useEffect(() => {
    const isEmpty =
      !draft.name &&
      !draft.tel &&
      !draft.partySize &&
      !draft.date &&
      !draft.time &&
      !draft.note;
    if (isEmpty) {
      try {
        window.localStorage.removeItem(STORAGE_KEY_RESERVATION_DRAFT);
      } catch {
        // noop
      }
      return;
    }
    try {
      const toSave: ReservationDraft = {
        ...draft,
        mode,
        savedAt: new Date().toISOString(),
      };
      window.localStorage.setItem(
        STORAGE_KEY_RESERVATION_DRAFT,
        JSON.stringify(toSave),
      );
    } catch {
      // ストレージ書き込み不可は無視
    }
  }, [draft, mode]);

  function update<K extends keyof ReservationDraft>(
    key: K,
    value: ReservationDraft[K],
  ) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    // ネイティブ Constraint Validation API
    if (!form.checkValidity()) {
      const newErrors: FieldErrors = {};
      const inputs = form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
        'input, select, textarea',
      );
      for (const el of Array.from(inputs)) {
        if (!el.validity.valid && el.name) {
          newErrors[el.name as keyof FieldErrors] =
            el.validationMessage ||
            '入力内容を確認してください。';
        }
      }
      setErrors(newErrors);
      return;
    }

    // 送信モック: 完了UI表示後にドラフトを削除
    setErrors({});
    setSubmitted(true);
    try {
      window.localStorage.removeItem(STORAGE_KEY_RESERVATION_DRAFT);
    } catch {
      // noop
    }
  }

  const minTouch: React.CSSProperties = {
    minHeight: `${MIN_TOUCH_TARGET_PX}px`,
  };

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-mode-md border border-day-primary/40 night:border-night-primary/40 bg-day-secondary/10 night:bg-night-secondary/15 p-6"
      >
        <p className="font-serif text-xl text-day-primary night:text-night-primary">
          ご予約リクエストを受け付けました。
        </p>
        <p className="mt-2 text-sm text-day-text/85 night:text-night-text/85">
          確認のご連絡を、ご記入の電話番号またはLINEからお送りします。
          このページの表示はデモのため、実際の送信は行われていません。
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setDraft(emptyDraft(mode));
          }}
          style={minTouch}
          className="mt-4 inline-flex items-center rounded-mode-md border border-day-primary night:border-night-primary px-4 py-2 text-day-primary night:text-night-primary hover:bg-day-primary/10 night:hover:bg-night-primary/15 transition-colors"
        >
          別の予約を入力する
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-label={mode === 'day' ? 'テイクアウト事前予約フォーム' : '席予約フォーム'}
      className="grid gap-5"
    >
      <FieldRow
        label="お名前"
        error={errors.name}
        htmlFor={`${idPrefix}-name`}
        required
      >
        <input
          id={`${idPrefix}-name`}
          name="name"
          type="text"
          required
          maxLength={50}
          value={draft.name}
          onChange={(e) => update('name', e.target.value)}
          className={inputClass(errors.name)}
        />
      </FieldRow>

      <FieldRow
        label="電話番号"
        error={errors.tel}
        htmlFor={`${idPrefix}-tel`}
        required
        hint="ハイフン無しでもOK / 例: 09012345678"
      >
        <input
          id={`${idPrefix}-tel`}
          name="tel"
          type="tel"
          required
          inputMode="tel"
          pattern="[0-9\-+\s]{10,15}"
          value={draft.tel}
          onChange={(e) => update('tel', e.target.value)}
          className={inputClass(errors.tel)}
        />
      </FieldRow>

      <div className="grid gap-5 md:grid-cols-3">
        <FieldRow
          label="人数"
          error={errors.partySize}
          htmlFor={`${idPrefix}-party`}
          required
        >
          <select
            id={`${idPrefix}-party`}
            name="partySize"
            required
            value={draft.partySize}
            onChange={(e) => update('partySize', e.target.value)}
            className={inputClass(errors.partySize)}
          >
            <option value="">選択</option>
            {DEFAULT_PARTY_SIZE_OPTIONS.map((p) => (
              <option key={p} value={p}>
                {p}名
              </option>
            ))}
          </select>
        </FieldRow>

        <FieldRow
          label="ご希望日"
          error={errors.date}
          htmlFor={`${idPrefix}-date`}
          required
        >
          <input
            id={`${idPrefix}-date`}
            name="date"
            type="date"
            required
            min={todayIso}
            value={draft.date}
            onChange={(e) => update('date', e.target.value)}
            className={inputClass(errors.date)}
          />
        </FieldRow>

        <FieldRow
          label="ご希望時間"
          error={errors.time}
          htmlFor={`${idPrefix}-time`}
          required
        >
          <input
            id={`${idPrefix}-time`}
            name="time"
            type="time"
            required
            value={draft.time}
            onChange={(e) => update('time', e.target.value)}
            className={inputClass(errors.time)}
          />
        </FieldRow>
      </div>

      <FieldRow
        label="ご要望 (任意)"
        error={errors.note}
        htmlFor={`${idPrefix}-note`}
      >
        <textarea
          id={`${idPrefix}-note`}
          name="note"
          rows={3}
          maxLength={300}
          value={draft.note}
          onChange={(e) => update('note', e.target.value)}
          className={inputClass(errors.note)}
        />
      </FieldRow>

      <button
        type="submit"
        style={minTouch}
        className="mt-2 inline-flex items-center justify-center rounded-mode-md bg-day-accent night:bg-night-accent px-6 py-3 font-semibold text-day-bg night:text-night-bg hover:opacity-90 transition-opacity"
      >
        {mode === 'day'
          ? 'テイクアウト予約を送信'
          : '席予約を送信'}
      </button>
      <p className="text-xs text-day-text/60 night:text-night-text/60">
        ※ ポートフォリオ用デモのため、実際の予約送信は行われません。
      </p>
    </form>
  );
}

function FieldRow({
  label,
  htmlFor,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block font-serif text-sm text-day-text night:text-night-text"
      >
        {label}
        {required && (
          <span
            aria-hidden="true"
            className="ml-1 text-day-accent night:text-night-accent"
          >
            *
          </span>
        )}
      </label>
      <div className="mt-1.5">{children}</div>
      {hint && !error && (
        <p className="mt-1 text-xs text-day-text/60 night:text-night-text/60">
          {hint}
        </p>
      )}
      {error && (
        <p
          role="alert"
          className="mt-1 text-xs text-day-accent night:text-night-accent"
        >
          {error}
        </p>
      )}
    </div>
  );
}

function inputClass(error?: string): string {
  const base =
    'block w-full rounded-mode-sm border bg-day-bg night:bg-night-bg/60 px-3 py-3 text-day-text night:text-night-text placeholder:text-day-text/40 night:placeholder:text-night-text/40 focus:outline-none focus:ring-2';
  return error
    ? `${base} border-day-accent night:border-night-accent focus:ring-day-accent/40 night:focus:ring-night-accent/40`
    : `${base} border-day-secondary/50 night:border-night-secondary/60 focus:ring-day-primary/40 night:focus:ring-night-primary/40`;
}
