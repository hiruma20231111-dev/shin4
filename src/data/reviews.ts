// ====================================================================
// お客様の声 — Googleビジネスプロフィール口コミ形式 (人物写真なし)
// ====================================================================

import type { Mode, Review } from '@/lib/types';

export const REVIEWS_BY_MODE: Record<Mode, readonly Review[]> = {
  day: [
    {
      id: 'day-review-1',
      authorName: 'M. Sakurai',
      rating: 5,
      body:
        'ヨガの帰りに毎週通っています。フルーツの果肉感が他店と段違い。' +
        '海を見ながら食べる時間がリセットになります。',
      postedAt: '2026-04-18',
    },
    {
      id: 'day-review-2',
      authorName: 'A. Takahashi',
      rating: 5,
      body:
        'スパイスカレー目当てに鎌倉まで。ココナッツチキンの香り高さに驚きました。' +
        '小麦不使用なので体への負担も少ないです。',
      postedAt: '2026-04-02',
    },
    {
      id: 'day-review-3',
      authorName: 'Y. Mori',
      rating: 4,
      body:
        '抹茶の新作ボウルが素晴らしい。和素材とアサイーの組み合わせが新鮮でした。' +
        '週末は満席なので予約してから行くのがおすすめ。',
      postedAt: '2026-03-22',
    },
    {
      id: 'day-review-4',
      authorName: 'K. Nakamura',
      rating: 5,
      body:
        '一人で本を読みながら過ごせる落ち着いた空気感。' +
        'グラノーラもオーナーさんの手作りらしく、香ばしさが違います。',
      postedAt: '2026-03-10',
    },
  ],
  night: [
    {
      id: 'night-review-1',
      authorName: 'R. Yoshida',
      rating: 5,
      body:
        '昼のヘルシーなお店が、夜にここまで変わるとは。ティキランタンの灯りに包まれて、' +
        'デートにぴったりでした。マイタイは人生で一番です。',
      postedAt: '2026-04-12',
    },
    {
      id: 'night-review-2',
      authorName: 'T. Suzuki',
      rating: 5,
      body:
        'バーテンダーさんのハワイ話が最高。カクテル一杯ごとに島の景色を見ているようでした。' +
        'ガーリックシュリンプも本場の味。',
      postedAt: '2026-03-30',
    },
    {
      id: 'night-review-3',
      authorName: 'H. Ito',
      rating: 4,
      body:
        '月1のライブイベントに友人と参加。湘南でこんなにハワイアンな夜を体験できるとは。' +
        'カウンター席が早く埋まるので予約必須です。',
      postedAt: '2026-03-15',
    },
    {
      id: 'night-review-4',
      authorName: 'N. Kobayashi',
      rating: 5,
      body:
        '自家製インフュージョンの説明をしてくれて、酒好きにはたまらない時間。' +
        'お任せ3杯コースで頼むのが一番楽しいです。',
      postedAt: '2026-02-28',
    },
  ],
};
