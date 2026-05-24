import { Access } from '@/components/Access';
import { Concept } from '@/components/Concept';
import { CrossPromotionBanner } from '@/components/CrossPromotionBanner';
import { DesktopFloatingCta } from '@/components/DesktopFloatingCta';
import { Faq } from '@/components/Faq';
import { FinalCta } from '@/components/FinalCta';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { InstagramFeed } from '@/components/InstagramFeed';
import { Menu } from '@/components/Menu';
import { MobileFixedCtaBar } from '@/components/MobileFixedCtaBar';
import { Owner } from '@/components/Owner';
import { Reviews } from '@/components/Reviews';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* 1. ファーストビュー */}
        <Hero />
        {/* 2. クロス送客バナー */}
        <CrossPromotionBanner />
        {/* 3. コンセプト */}
        <Concept />
        {/* 4. メニュー */}
        <Menu />
        {/* 5. Instagram */}
        <InstagramFeed />
        {/* 6. お客様の声 */}
        <Reviews />
        {/* 7. オーナー紹介 */}
        <Owner />
        {/* 8. アクセス・営業時間 */}
        <Access />
        {/* 9. FAQ */}
        <Faq />
        {/* 10. 最終CTA (LINE / 電話 / 予約フォーム) */}
        <FinalCta />
      </main>

      {/* スマホ画面下固定CTA + デスクトップ追従CTA */}
      <MobileFixedCtaBar />
      <DesktopFloatingCta />

      {/* モバイルCTA分の余白 (md以下のみ) */}
      <div aria-hidden="true" className="md:hidden h-20" />
    </>
  );
}
