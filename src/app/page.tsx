import AnnouncementBar  from "@/components/layout/AnnouncementBar";
import Header           from "@/components/layout/Header";
import CategoryNav      from "@/components/layout/CategoryNav";
import Footer           from "@/components/layout/Footer";

import HeroBanner       from "@/components/sections/HeroBanner";
import TrustBanner      from "@/components/sections/TrustBanner";
import SmartphoneDeals  from "@/components/sections/SmartphoneDeals";
import TopCategories    from "@/components/sections/TopCategories";
import TopBrands        from "@/components/sections/TopBrands";
import FeaturedDeals    from "@/components/sections/FeaturedDeals";

export default function HomePage() {
  return (
    <>
      {/* ── Global chrome ── */}
      <AnnouncementBar />
      <Header />
      {/* <CategoryNav /> */}

      {/* ── Page content ── */}
      <main className="pb-10 container-main">
        <HeroBanner />
        <TrustBanner />
        <SmartphoneDeals />
        <TopCategories />
        <TopBrands />
        <FeaturedDeals />
      </main>

      <Footer />
    </>
  );
}
