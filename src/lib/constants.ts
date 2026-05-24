// ====================================================================
// 共通定数
// ブランド切替・営業時間・ストレージキーなど、マジックナンバーを禁止し
// すべて意図が明確な定数として一元管理する。
// ====================================================================

import type { Mode } from './types';

/** モード識別子 */
export const MODE_DAY: Mode = 'day';
export const MODE_NIGHT: Mode = 'night';
export const ALL_MODES: readonly Mode[] = [MODE_DAY, MODE_NIGHT];

/**
 * 時刻自動判定の境界 (時)。
 * この時間以降は夜モードを初期表示する。中休み (16:00〜18:00) は
 * 自動判定の境界として扱わず、デフォルトで17時を採用。
 */
export const NIGHT_MODE_START_HOUR = 17;

/** 営業時間 (両モード併記の時間表で利用) */
export const OPENING_HOURS = {
  day: { open: '08:00', close: '16:00' },
  night: { open: '18:00', close: '25:00' },
} as const;

/** 中休み (運営切替・清掃) */
export const HANDOVER_PERIOD = { start: '16:00', end: '18:00' } as const;

/** localStorage キー: ユーザーが明示的に選択したモード */
export const STORAGE_KEY_MODE_PREFERENCE = 'sbmb:mode-preference';

/** sessionStorage キー: クロス送客バナーによるタブ単位の仮切替 */
export const SESSION_KEY_TEMP_MODE = 'sbmb:temp-mode';

/** localStorage キー: 入力途中の予約フォームドラフト */
export const STORAGE_KEY_RESERVATION_DRAFT = 'sbmb:reservation-draft';

/** Instagram フィードキャッシュ秒数 (1時間) */
export const INSTAGRAM_CACHE_REVALIDATE_SECONDS = 60 * 60;

/** モードごとに表示する Instagram 投稿数 */
export const INSTAGRAM_POSTS_PER_MODE = 9;

/** モード切替クロスフェード時間 (ms) */
export const MODE_TRANSITION_DURATION_MS = 500;

/** タッチターゲットの最小サイズ (px) — WCAG準拠 */
export const MIN_TOUCH_TARGET_PX = 44;

/** モバイル/デスクトップ判定ブレークポイント (Tailwind md と同等) */
export const DESKTOP_BREAKPOINT_PX = 768;

/** スクロール検知しきい値: ヘッダー表示切替のpx */
export const SCROLL_THRESHOLD_HEADER_COMPACT_PX = 120;

/** Instagramモック使用フラグ (環境変数, デフォルト true) */
export const USE_MOCK_INSTAGRAM =
  process.env.NEXT_PUBLIC_USE_MOCK_INSTAGRAM !== 'false';

/** モード別連絡先 (環境変数, フォールバックはデモ用ダミー) */
export const CONTACT = {
  day: {
    lineUrl:
      process.env.NEXT_PUBLIC_LINE_URL_DAY ??
      'https://lin.ee/sundaybowls-demo',
    tel: process.env.NEXT_PUBLIC_TEL_DAY ?? '0467-00-1100',
  },
  night: {
    lineUrl:
      process.env.NEXT_PUBLIC_LINE_URL_NIGHT ??
      'https://lin.ee/moondaybar-demo',
    tel: process.env.NEXT_PUBLIC_TEL_NIGHT ?? '0467-00-1800',
  },
} as const;

/** 共通: 店舗住所・GoogleMaps検索クエリ */
export const STORE_LOCATION = {
  address: '神奈川県鎌倉市坂ノ下0-0-0 江ノ電海ノ家ビル 1F',
  // GoogleMaps埋め込み用クエリ (デモ: 江ノ電 海辺の店想定)
  mapsQuery: '江ノ電 鎌倉高校前駅',
  nearestStation: '江ノ電 鎌倉高校前駅 徒歩3分',
} as const;
