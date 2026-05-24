// ====================================================================
// Access — アクセス・営業時間表 (両モード併記で間借り構造を明示)
// ====================================================================

import {
  HANDOVER_PERIOD,
  OPENING_HOURS,
  STORE_LOCATION,
} from '@/lib/constants';

import { FadeInOnScroll } from './FadeInOnScroll';

export function Access() {
  return (
    <section
      id="access"
      aria-label="アクセス・営業時間"
      className="py-20 md:py-28 bg-day-bg night:bg-night-bg transition-colors duration-mode"
    >
      <div className="mx-auto max-w-6xl px-4">
        <FadeInOnScroll>
          <p className="font-serif text-sm tracking-widest text-day-primary night:text-night-primary uppercase">
            Access
          </p>
          <h2 className="mt-2 font-serif text-2xl md:text-4xl text-day-text night:text-night-text">
            <span data-mode-only="day">海辺の同じ場所で、朝も夜も。</span>
            <span data-mode-only="night">同じ路面店で、もう一つの時間が始まる。</span>
          </h2>
        </FadeInOnScroll>

        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <FadeInOnScroll>
            <OpeningHoursTable />
          </FadeInOnScroll>

          <FadeInOnScroll>
            <div className="space-y-4">
              <div>
                <p className="font-serif text-base text-day-text night:text-night-text">
                  住所
                </p>
                <p className="mt-1 text-sm md:text-base text-day-text/85 night:text-night-text/85">
                  {STORE_LOCATION.address}
                </p>
                <p className="mt-1 text-sm text-day-text/70 night:text-night-text/70">
                  最寄駅: {STORE_LOCATION.nearestStation}
                </p>
              </div>

              <div className="aspect-[4/3] rounded-mode-md overflow-hidden border border-day-secondary/30 night:border-night-secondary/30">
                {/* TODO: 本番では実店舗座標のGoogle Maps埋め込みURLに差し替え */}
                <iframe
                  title="店舗位置のGoogle Maps埋め込みプレースホルダー"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    STORE_LOCATION.mapsQuery,
                  )}&output=embed`}
                  loading="lazy"
                  className="h-full w-full border-0"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </div>
    </section>
  );
}

function OpeningHoursTable() {
  return (
    <div className="rounded-mode-md border border-day-secondary/40 night:border-night-secondary/40 overflow-hidden">
      <table className="w-full text-sm md:text-base">
        <caption className="sr-only">営業時間表 (両モード併記)</caption>
        <thead className="bg-day-secondary/15 night:bg-night-secondary/25">
          <tr>
            <th
              scope="col"
              className="px-4 py-3 text-left font-serif text-day-text night:text-night-text"
            >
              時間帯
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left font-serif text-day-text night:text-night-text"
            >
              ブランド
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left font-serif text-day-text night:text-night-text"
            >
              営業内容
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-day-secondary/30 night:divide-night-secondary/30">
          <tr>
            <th
              scope="row"
              className="px-4 py-3 text-left font-serif text-day-primary night:text-night-primary whitespace-nowrap"
            >
              {OPENING_HOURS.day.open} 〜 {OPENING_HOURS.day.close}
            </th>
            <td className="px-4 py-3 text-day-text night:text-night-text">
              Sunday Bowls (昼)
            </td>
            <td className="px-4 py-3 text-day-text/85 night:text-night-text/85">
              アサイーボウル＆南国スパイスカレー
            </td>
          </tr>
          <tr className="bg-day-secondary/10 night:bg-night-secondary/15">
            <th
              scope="row"
              className="px-4 py-3 text-left font-serif text-day-text night:text-night-text whitespace-nowrap"
            >
              {HANDOVER_PERIOD.start} 〜 {HANDOVER_PERIOD.end}
            </th>
            <td className="px-4 py-3 text-day-text/70 night:text-night-text/70">
              中休み
            </td>
            <td className="px-4 py-3 text-day-text/70 night:text-night-text/70">
              清掃・運営切替 (入店不可)
            </td>
          </tr>
          <tr>
            <th
              scope="row"
              className="px-4 py-3 text-left font-serif text-day-primary night:text-night-primary whitespace-nowrap"
            >
              {OPENING_HOURS.night.open} 〜 {OPENING_HOURS.night.close}
            </th>
            <td className="px-4 py-3 text-day-text night:text-night-text">
              Moonday Bar (夜)
            </td>
            <td className="px-4 py-3 text-day-text/85 night:text-night-text/85">
              ティキバー＋ハワイアン小皿
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
