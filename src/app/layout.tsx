import type { Metadata } from 'next';
import { Caveat, Cinzel, Fraunces, Noto_Sans_JP } from 'next/font/google';
import { Suspense } from 'react';

import { ModeProvider } from '@/components/ModeProvider';
import { ModeBootstrapScript } from '@/components/ModeBootstrapScript';
import {
  MODE_DAY,
  NIGHT_MODE_START_HOUR,
} from '@/lib/constants';
import './globals.css';

const notoSansJp = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fraunces',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-caveat',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cinzel',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sunday Bowls / Moonday Bar｜湘南・鎌倉の昼夜2ブランド間借り路面店',
  description:
    '昼はアサイーボウル&南国スパイスカレーのSunday Bowls、夜はティキバー&ハワイアン小皿のMoonday Bar。' +
    '同じ路面店スペースを時間帯でシェアする独立2ブランドの公式LP。',
};

/**
 * App Router ルートレイアウト。
 *
 * SSR整合性:
 *   - 初期HTML は時刻判定モード (サーバー時刻) で data-mode を描画。
 *   - 続く ModeBootstrapScript が CSR 前に同期実行され、
 *     sessionStorage の仮切替 > localStorage の保存値 > クライアントローカル時刻
 *     の優先度で data-mode を上書き。
 *   - ModeProvider 側で React 状態が DOM の data-mode に同期される。
 *   - suppressHydrationWarning は data-mode 属性の差異のみを許容するため <html> に付与。
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialMode =
    new Date().getHours() >= NIGHT_MODE_START_HOUR ? 'night' : MODE_DAY;

  return (
    <html
      lang="ja"
      data-mode={initialMode}
      suppressHydrationWarning
      className={`${notoSansJp.variable} ${fraunces.variable} ${caveat.variable} ${cinzel.variable}`}
    >
      <body className="font-sans antialiased">
        <ModeBootstrapScript />
        <Suspense>
          <ModeProvider initialMode={initialMode}>{children}</ModeProvider>
        </Suspense>
      </body>
    </html>
  );
}
