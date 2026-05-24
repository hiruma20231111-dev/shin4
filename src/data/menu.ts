// ====================================================================
// メニューデータ (モード別)
// ====================================================================

import type { MenuCategory, Mode } from '@/lib/types';

/** モードごとの2タブ構成。先頭タブが初期表示 */
export const MENU_BY_MODE: Record<Mode, readonly MenuCategory[]> = {
  day: [
    {
      id: 'bowls',
      label: 'アサイーボウル',
      items: [
        {
          id: 'bowl-classic',
          name: 'クラシック・サンライズボウル',
          description:
            '無添加グラノーラ、苺、バナナ、自家製ココナッツチップス。湘南の朝に一番出る定番。',
          priceYen: 1480,
          imageSrc: '/images/menu/day-bowl-1.svg',
          imageAlt: '苺とバナナがのったアサイーボウル',
          badge: 'シグネチャー',
        },
        {
          id: 'bowl-tropical',
          name: 'マンゴー&パッションフルーツ',
          description: '宮崎県産マンゴーと国産パッションフルーツを贅沢に重ねたトロピカル仕立て。',
          priceYen: 1680,
          imageSrc: '/images/menu/day-bowl-2.svg',
          imageAlt: 'マンゴーとパッションフルーツのアサイーボウル',
        },
        {
          id: 'bowl-matcha',
          name: '抹茶&黒蜜きなこ',
          description: '宇治抹茶のスムージーベース、黒蜜・きなこ・白玉添え。和素材のヘルシーボウル。',
          priceYen: 1580,
          imageSrc: '/images/menu/day-bowl-3.svg',
          imageAlt: '抹茶と黒蜜きなこの和風ボウル',
          badge: '新作',
        },
      ],
    },
    {
      id: 'curry',
      label: '南国スパイスカレー',
      items: [
        {
          id: 'curry-chicken',
          name: 'ココナッツチキンカレー',
          description: '20種のスパイスを焙煎し、ココナッツミルクで仕上げた香り高い定番。',
          priceYen: 1380,
          imageSrc: '/images/menu/day-curry-1.svg',
          imageAlt: 'ココナッツチキンカレー',
          badge: '人気',
        },
        {
          id: 'curry-veg',
          name: '畑のグリーンベジカレー',
          description: '三浦半島の野菜と自家製グリーンペースト。乳製品・小麦不使用。',
          priceYen: 1480,
          imageSrc: '/images/menu/day-curry-2.svg',
          imageAlt: 'グリーンベジカレー',
        },
        {
          id: 'curry-shrimp',
          name: '湘南エビとトマトのスパイスカレー',
          description: '相模湾で獲れたエビと完熟トマト、自家製ガラムマサラで仕上げた一皿。',
          priceYen: 1680,
          imageSrc: '/images/menu/day-curry-3.svg',
          imageAlt: 'エビとトマトのスパイスカレー',
        },
      ],
    },
  ],
  night: [
    {
      id: 'cocktails',
      label: 'シグネチャーカクテル',
      items: [
        {
          id: 'cocktail-mai-tai',
          name: 'マウンテン・マイタイ',
          description: '自家製パイナップル&唐辛子インフュージョンラム使用。3層仕立てのシグネチャー。',
          priceYen: 1480,
          imageSrc: '/images/menu/night-cocktail-1.svg',
          imageAlt: 'マイタイのカクテルグラス',
          badge: 'シグネチャー',
        },
        {
          id: 'cocktail-blue-hawaii',
          name: 'ムーンライト・ブルーハワイ',
          description: 'バタフライピーで色が変わる、月のように揺らぐブルーハワイ。',
          priceYen: 1380,
          imageSrc: '/images/menu/night-cocktail-2.svg',
          imageAlt: 'バタフライピーが入ったブルーカクテル',
        },
        {
          id: 'cocktail-spiced',
          name: 'ハワイアン・スパイスト・オールドファッションド',
          description: 'クローブとシナモンを漬け込んだダークラムをベースに、深い香りで仕上げる。',
          priceYen: 1580,
          imageSrc: '/images/menu/night-cocktail-3.svg',
          imageAlt: 'スパイストオールドファッションドのロックグラス',
          badge: '冬限定',
        },
      ],
    },
    {
      id: 'plates',
      label: 'ハワイアン小皿',
      items: [
        {
          id: 'plate-poke',
          name: 'アヒ・ポキ ハワイ仕込み',
          description: 'マグロ・アボカド・玉ねぎを島醤油とごま油で。シンプルなハワイ流。',
          priceYen: 980,
          imageSrc: '/images/menu/night-plate-1.svg',
          imageAlt: 'アヒポキの小皿',
          badge: '定番',
        },
        {
          id: 'plate-garlic-shrimp',
          name: 'ガーリックシュリンプ',
          description: 'オアフ島ノースショア仕込みのレシピで、殻ごと豪快に。',
          priceYen: 1280,
          imageSrc: '/images/menu/night-plate-2.svg',
          imageAlt: 'ガーリックシュリンプの皿',
        },
        {
          id: 'plate-kalua',
          name: 'カルアポーク&タロイモチップス',
          description: '低温調理で12時間。タロイモのチップスでサンドにしてどうぞ。',
          priceYen: 1180,
          imageSrc: '/images/menu/night-plate-3.svg',
          imageAlt: 'カルアポークの小皿',
        },
      ],
    },
  ],
};
