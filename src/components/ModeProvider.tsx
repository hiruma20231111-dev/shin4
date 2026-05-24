'use client';

// ====================================================================
// ModeProvider — 昼夜モードのグローバル状態と切替アクションを提供
//
// 優先度: sessionStorage 仮切替 > localStorage 永続値 > 時刻判定
// - setMode(mode)        : 明示切替 (localStorage に永続化)
// - setTemporaryMode(mode): クロス送客バナー由来の仮切替
//                          (sessionStorageのみ。タブを閉じれば消える)
//
// フォーム入力中の切替: requestModeSwitch(mode, options) を介して、
// 入力中ドラフトが存在する場合は確認ダイアログを表示し、
// ユーザー承認時のみドラフトを削除して切替を実行する。
// ====================================================================

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  MODE_DAY,
  MODE_NIGHT,
  SESSION_KEY_TEMP_MODE,
  STORAGE_KEY_MODE_PREFERENCE,
  STORAGE_KEY_RESERVATION_DRAFT,
} from '@/lib/constants';
import { isMode } from '@/lib/modeUtils';
import type { Mode } from '@/lib/types';

import { ModeSwitchConfirmDialog } from './ModeSwitchConfirmDialog';

type RequestModeSwitchOptions = {
  /** 'persist' = 永続化 (localStorage更新) / 'session' = 仮切替 (sessionStorage) */
  scope: 'persist' | 'session';
};

type ModeContextValue = {
  mode: Mode;
  /** ハイドレーション後にtrueになる。初期SSRと差異の出る描画を抑制したい時に使う */
  mounted: boolean;
  /** 明示切替 (永続化) */
  setMode: (mode: Mode) => void;
  /** タブ単位の仮切替 (クロス送客バナーから) */
  setTemporaryMode: (mode: Mode) => void;
  /** 入力中ドラフト保護つき切替リクエスト (確認ダイアログを介す) */
  requestModeSwitch: (
    mode: Mode,
    options: RequestModeSwitchOptions,
  ) => void;
};

const ModeContext = createContext<ModeContextValue | null>(null);

export function useMode(): ModeContextValue {
  const ctx = useContext(ModeContext);
  if (!ctx) {
    throw new Error('useMode must be used within ModeProvider');
  }
  return ctx;
}

type PendingSwitch = {
  mode: Mode;
  scope: 'persist' | 'session';
};

export function ModeProvider({
  initialMode,
  children,
}: {
  initialMode: Mode;
  children: React.ReactNode;
}) {
  const [mode, setModeState] = useState<Mode>(initialMode);
  const [mounted, setMounted] = useState(false);
  const [pendingSwitch, setPendingSwitch] = useState<PendingSwitch | null>(
    null,
  );

  // 切替フラグ: 状態更新中のDOM/storage往復による無限ループを防止
  const isApplyingRef = useRef(false);

  // マウント時: DOM の data-mode (= ブートストラップスクリプトが書いた値) を読み、
  // React状態と一致しなければ同期する
  useEffect(() => {
    const domMode = document.documentElement.getAttribute('data-mode');
    if (isMode(domMode) && domMode !== mode) {
      setModeState(domMode);
    }
    setMounted(true);
    // 初回のみ
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // mode 変更時: DOM の data-mode を更新 (CSS テーマが切り替わる)
  useEffect(() => {
    if (!mounted) return;
    isApplyingRef.current = true;
    document.documentElement.setAttribute('data-mode', mode);
    // 次フレームでフラグを戻す
    const id = window.setTimeout(() => {
      isApplyingRef.current = false;
    }, 0);
    return () => window.clearTimeout(id);
  }, [mode, mounted]);

  const applyMode = useCallback(
    (next: Mode, scope: 'persist' | 'session') => {
      setModeState(next);
      try {
        if (scope === 'persist') {
          // 明示切替: 永続化し、仮切替フラグはクリア
          window.localStorage.setItem(STORAGE_KEY_MODE_PREFERENCE, next);
          window.sessionStorage.removeItem(SESSION_KEY_TEMP_MODE);
        } else {
          // クロス送客バナー: 仮切替のみ。localStorage は変更しない
          window.sessionStorage.setItem(SESSION_KEY_TEMP_MODE, next);
        }
      } catch {
        // プライベートブラウジング等で storage 不可の場合は無視
      }
    },
    [],
  );

  const setMode = useCallback(
    (next: Mode) => applyMode(next, 'persist'),
    [applyMode],
  );

  const setTemporaryMode = useCallback(
    (next: Mode) => applyMode(next, 'session'),
    [applyMode],
  );

  /** 入力中ドラフト存在チェック */
  const hasReservationDraft = useCallback((): boolean => {
    try {
      const raw = window.localStorage.getItem(
        STORAGE_KEY_RESERVATION_DRAFT,
      );
      return Boolean(raw && raw.length > 0);
    } catch {
      return false;
    }
  }, []);

  /**
   * 入力中ドラフトがあれば確認ダイアログを起こし、
   * 承認時のみドラフトを削除してモード切替を実行する。
   * 送信済みデータ (フォーム送信完了UI) には影響しない。
   */
  const requestModeSwitch = useCallback(
    (next: Mode, options: RequestModeSwitchOptions) => {
      if (next === mode) return;
      if (hasReservationDraft()) {
        setPendingSwitch({ mode: next, scope: options.scope });
        return;
      }
      applyMode(next, options.scope);
    },
    [mode, hasReservationDraft, applyMode],
  );

  const confirmPendingSwitch = useCallback(() => {
    if (!pendingSwitch) return;
    try {
      window.localStorage.removeItem(STORAGE_KEY_RESERVATION_DRAFT);
    } catch {
      // noop
    }
    applyMode(pendingSwitch.mode, pendingSwitch.scope);
    setPendingSwitch(null);
  }, [pendingSwitch, applyMode]);

  const cancelPendingSwitch = useCallback(() => {
    setPendingSwitch(null);
  }, []);

  const value = useMemo<ModeContextValue>(
    () => ({
      mode,
      mounted,
      setMode,
      setTemporaryMode,
      requestModeSwitch,
    }),
    [mode, mounted, setMode, setTemporaryMode, requestModeSwitch],
  );

  return (
    <ModeContext.Provider value={value}>
      {children}
      {pendingSwitch && (
        <ModeSwitchConfirmDialog
          targetMode={pendingSwitch.mode}
          onConfirm={confirmPendingSwitch}
          onCancel={cancelPendingSwitch}
        />
      )}
    </ModeContext.Provider>
  );
}

// 再エクスポート (テスト不要のため最低限)
export { MODE_DAY, MODE_NIGHT };
