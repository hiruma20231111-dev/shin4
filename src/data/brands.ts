// ====================================================================
// ブランドアイデンティティ
// ====================================================================

import type { BrandIdentity, Mode } from '@/lib/types';

export const BRANDS: Record<Mode, BrandIdentity> = {
  day: {
    brandName: 'Sunday Bowls',
    catchCopy: '海風と、果物と、ヨガのあとに。',
    description:
      '湘南の朝陽に映えるアサイーボウルと、自家製スパイスブレンドの南国カレー。' +
      '無添加グラノーラと国産フルーツを毎朝仕込み、走ったあと・ヨガのあとの体が喜ぶ一皿を。',
    trustBadges: [
      'Instagramフォロワー 2.3万',
      '湘南エリア 人気No.1 アサイーボウル',
      '国産フルーツ／無添加グラノーラ',
    ],
    primaryCtaLabel: 'LINE登録で 次回100円OFF＋月1新作試食招待',
    secondaryCtaLabel: 'テイクアウト事前予約',
    heroImageSrc: '/images/hero-day.svg',
    heroImageAlt: '朝の光が差し込むSunday Bowlsのカウンターに置かれたアサイーボウル',
    crossPromotionLabel: '同じ場所、夜は南国バー「Moonday Bar」をのぞく',
  },
  night: {
    brandName: 'Moonday Bar',
    catchCopy: '波音と、ラム酒と、月明かりの下で。',
    description:
      'ハワイ仕入れの香辛料と、20種以上の自家製インフュージョン・ラムベースカクテル。' +
      '海風に育てられた小皿料理と、月1のライブで満たされる、もう一つの島時間。',
    trustBadges: [
      'Instagramフォロワー 1.8万',
      '月1ライブイベント開催',
      '自家製ラムインフュージョン 20種以上',
    ],
    primaryCtaLabel: 'LINE登録で ウェルカムカクテル1杯無料',
    secondaryCtaLabel: '席予約フォーム',
    heroImageSrc: '/images/hero-night.svg',
    heroImageAlt: '夜のティキランタンに照らされたMoonday Barのカウンターとカクテル',
    crossPromotionLabel: '同じ場所、昼はヘルシーボウル「Sunday Bowls」をのぞく',
  },
};
