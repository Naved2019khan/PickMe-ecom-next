import AnnouncementBar  from "@/components/layout/AnnouncementBar";
import HeroBanner       from "@/components/sections/HeroBanner";
import TopBrands        from "@/components/sections/TopBrands";
import FeaturedDeals    from "@/components/sections/FeaturedDeals";
import ProductSection from "@/components/sections/ProductSection";

export default function HomePage() {
  return (
    <>
      {/* ── Global chrome ── */}
      <AnnouncementBar />
      {/* <CategoryNav /> */}

      {/* ── Page content ── */}
      <main className="pb-10 container-main">
        <HeroBanner />
        {/* <TrustBanner /> */}
        <ProductSection />
        {/* <TopCategories /> */}
        <TopBrands />
        <FeaturedDeals />
      </main>
    </>
  );
}
