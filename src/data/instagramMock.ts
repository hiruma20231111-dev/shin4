// ====================================================================
// Instagramモックデータ
// 本番では Route Handler 側で Graph API レスポンスへ差し替える前提。
// 画像URL・キャプション・いいね数・日付フィールドを持つ型に揃える。
// ====================================================================

import { INSTAGRAM_POSTS_PER_MODE } from '@/lib/constants';
import type { InstagramPost, Mode } from '@/lib/types';

const DAY_RAW: ReadonlyArray<Omit<InstagramPost, 'isMock'>> = [
  {
    id: 'day-ig-1',
    imageSrc: '/images/instagram/day-1.svg',
    caption: '今朝のサンライズボウル。苺の季節になりました🍓 #sundaybowls',
    likeCount: 412,
    postedAt: '2026-05-20',
  },
  {
    id: 'day-ig-2',
    imageSrc: '/images/instagram/day-2.svg',
    caption: 'グリーンベジカレー、入荷の三浦野菜たっぷりで仕込み中。',
    likeCount: 318,
    postedAt: '2026-05-17',
  },
  {
    id: 'day-ig-3',
    imageSrc: '/images/instagram/day-3.svg',
    caption: '海を見ながらの読書時間。窓側カウンター席が一番好き。',
    likeCount: 521,
    postedAt: '2026-05-14',
  },
  {
    id: 'day-ig-4',
    imageSrc: '/images/instagram/day-4.svg',
    caption: '新作｜抹茶&黒蜜きなこボウル、本日から！',
    likeCount: 689,
    postedAt: '2026-05-11',
  },
  {
    id: 'day-ig-5',
    imageSrc: '/images/instagram/day-5.svg',
    caption: '自家焙煎グラノーラ、香ばしく仕上がりました。',
    likeCount: 245,
    postedAt: '2026-05-08',
  },
  {
    id: 'day-ig-6',
    imageSrc: '/images/instagram/day-6.svg',
    caption: 'ヨガクラスとのコラボ朝食会、満員御礼でした。',
    likeCount: 372,
    postedAt: '2026-05-05',
  },
  {
    id: 'day-ig-7',
    imageSrc: '/images/instagram/day-7.svg',
    caption: '宮崎マンゴー入荷！マンゴー&パッションボウルおすすめです🥭',
    likeCount: 458,
    postedAt: '2026-05-02',
  },
  {
    id: 'day-ig-8',
    imageSrc: '/images/instagram/day-8.svg',
    caption: '湘南エビとトマトのスパイスカレー、辛さ控えめで仕込み直しました。',
    likeCount: 296,
    postedAt: '2026-04-29',
  },
  {
    id: 'day-ig-9',
    imageSrc: '/images/instagram/day-9.svg',
    caption: '朝の海。今日も気持ちのいい一日になりそうです。',
    likeCount: 612,
    postedAt: '2026-04-26',
  },
];

const NIGHT_RAW: ReadonlyArray<Omit<InstagramPost, 'isMock'>> = [
  {
    id: 'night-ig-1',
    imageSrc: '/images/instagram/night-1.svg',
    caption: 'マウンテン・マイタイ、3層仕立てで完成。 #moondaybar',
    likeCount: 587,
    postedAt: '2026-05-21',
  },
  {
    id: 'night-ig-2',
    imageSrc: '/images/instagram/night-2.svg',
    caption: 'ライブナイト盛況でした。ご来店ありがとうございます🌺',
    likeCount: 824,
    postedAt: '2026-05-18',
  },
  {
    id: 'night-ig-3',
    imageSrc: '/images/instagram/night-3.svg',
    caption: 'ガーリックシュリンプ、ノースショア仕込みの香り。',
    likeCount: 412,
    postedAt: '2026-05-15',
  },
  {
    id: 'night-ig-4',
    imageSrc: '/images/instagram/night-4.svg',
    caption: '新着 自家製パイナップル&唐辛子インフュージョンラム、本日解禁。',
    likeCount: 731,
    postedAt: '2026-05-12',
  },
  {
    id: 'night-ig-5',
    imageSrc: '/images/instagram/night-5.svg',
    caption: 'ティキランタンの灯りと、ウクレレのレコード。',
    likeCount: 528,
    postedAt: '2026-05-09',
  },
  {
    id: 'night-ig-6',
    imageSrc: '/images/instagram/night-6.svg',
    caption: 'カルアポーク、12時間調理。タロイモチップスでサンドして。',
    likeCount: 369,
    postedAt: '2026-05-06',
  },
  {
    id: 'night-ig-7',
    imageSrc: '/images/instagram/night-7.svg',
    caption: 'ブルーハワイ、バタフライピーで色が変わる瞬間が好き。',
    likeCount: 642,
    postedAt: '2026-05-03',
  },
  {
    id: 'night-ig-8',
    imageSrc: '/images/instagram/night-8.svg',
    caption: 'クローブ&シナモンを漬け込んだダークラム、冬の定番。',
    likeCount: 451,
    postedAt: '2026-04-30',
  },
  {
    id: 'night-ig-9',
    imageSrc: '/images/instagram/night-9.svg',
    caption: '夜の海と、月明かりと、ラム酒の香りと。',
    likeCount: 893,
    postedAt: '2026-04-27',
  },
];

function decorateAsMock(
  raw: ReadonlyArray<Omit<InstagramPost, 'isMock'>>,
): InstagramPost[] {
  return raw.slice(0, INSTAGRAM_POSTS_PER_MODE).map((p) => ({
    ...p,
    isMock: true,
  }));
}

export const INSTAGRAM_MOCK_BY_MODE: Record<Mode, InstagramPost[]> = {
  day: decorateAsMock(DAY_RAW),
  night: decorateAsMock(NIGHT_RAW),
};
