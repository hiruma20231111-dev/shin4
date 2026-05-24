// ====================================================================
// コンセプトストーリー (モード別)
// ====================================================================

import type { Mode } from '@/lib/types';

export type ConceptContent = {
  sectionLabel: string;
  title: string;
  storyParagraphs: readonly string[];
  /** 「1日の物語」を象徴する時刻別キーフレーズ */
  timelineHighlights: readonly { time: string; label: string }[];
};

export const CONCEPT_BY_MODE: Record<Mode, ConceptContent> = {
  day: {
    sectionLabel: 'Concept',
    title: '海風で、体と一日を整える朝食を。',
    storyParagraphs: [
      '湘南で15年ヨガを教えてきたオーナーが、「動いたあとに、体が本当に喜ぶ朝ごはん」を作るために独立。',
      '無添加グラノーラ、国産フルーツ、自家ブレンドのスパイスカレー。' +
        '海から戻ってきた人の頬と同じ温度の、優しいカフェです。',
    ],
    timelineHighlights: [
      { time: '8:00', label: '海から一番近い席で、最初の一杯' },
      { time: '11:30', label: 'ヨガ帰りに、ボウル&グリーンカレー' },
      { time: '15:30', label: '海風と読書、ラストオーダー前の小休止' },
    ],
  },
  night: {
    sectionLabel: 'Concept',
    title: '湘南で、ハワイの夜風を吸う場所。',
    storyParagraphs: [
      'オアフ島ノースショアのティキバーで5年間、バーテンダーを務めたオーナーが帰郷後に開いた小さな夜のお店。',
      'ハワイで仕入れた香辛料と、自家製インフュージョン20種以上のラム。' +
        '波音とウクレレのレコードに混じる、もう一つの島時間を。',
    ],
    timelineHighlights: [
      { time: '18:00', label: 'ティキランタンを灯して、開店' },
      { time: '20:00', label: 'デート・友人飲み、第2ピーク' },
      { time: '23:00', label: 'ラムをロックで、潮の音と一緒に' },
    ],
  },
};
