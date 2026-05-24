// ====================================================================
// 共通型定義
// ====================================================================

/** モード識別子: 昼 (Sunday Bowls) / 夜 (Moonday Bar) */
export type Mode = 'day' | 'night';

/** メニューカテゴリ識別子 (モードごとに2タブ) */
export type MenuCategoryId =
  | 'bowls' // 昼: アサイーボウル
  | 'curry' // 昼: スパイスカレー
  | 'cocktails' // 夜: シグネチャーカクテル
  | 'plates'; // 夜: ハワイアン小皿

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  priceYen: number;
  imageSrc: string;
  imageAlt: string;
  /** 「シグネチャー」「新作」などのバッジラベル */
  badge?: string;
};

export type MenuCategory = {
  id: MenuCategoryId;
  label: string;
  items: readonly MenuItem[];
};

export type InstagramPost = {
  id: string;
  imageSrc: string;
  caption: string;
  likeCount: number;
  /** ISO 8601 日付文字列 */
  postedAt: string;
  /** モックフラグ — 本番Graph API差し替え時にfalseを返す */
  isMock: boolean;
};

export type InstagramFeedResponse = {
  mode: Mode;
  posts: InstagramPost[];
};

export type Review = {
  id: string;
  /** イニシャル中心のニックネーム — 個人特定を避けたGBP口コミ風 */
  authorName: string;
  /** 1〜5 の星評価 */
  rating: 1 | 2 | 3 | 4 | 5;
  body: string;
  /** 投稿日 (yyyy-mm-dd) */
  postedAt: string;
};

export type FaqEntry = {
  id: string;
  question: string;
  answer: string;
  /** モード別 or 共通 */
  scope: Mode | 'common';
};

export type OwnerProfile = {
  name: string;
  role: string;
  bio: string;
  message: string;
  imageSrc: string;
  imageAlt: string;
};

export type BrandIdentity = {
  brandName: string;
  catchCopy: string;
  description: string;
  /** Instagramフォロワー数バッジなど信頼の根拠 */
  trustBadges: readonly string[];
  /** 最上位CTAボタン文言 */
  primaryCtaLabel: string;
  /** サブCTAボタン文言 */
  secondaryCtaLabel: string;
  heroImageSrc: string;
  heroImageAlt: string;
  /** クロス送客バナーで「もう一つの顔をのぞく」時の対向ブランド誘導文 */
  crossPromotionLabel: string;
};

/** モード入力中ドラフト (localStorage に保存) */
export type ReservationDraft = {
  mode: Mode;
  name: string;
  tel: string;
  partySize: string;
  date: string;
  time: string;
  note: string;
  /** 保存時刻 (ISO) */
  savedAt: string;
};
