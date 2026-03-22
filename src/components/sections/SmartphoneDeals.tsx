import { smartphones } from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";
import SectionHeader from "@/components/ui/SectionHeader";

export default function SmartphoneDeals() {
  return (
    <section className="container-main mt-8 bg-white rounded-2xl p-5 shadow-[var(--shadow-card)]">
      <SectionHeader
        title="Grab the best deal on"
        highlight="Smartphones"
        viewAllHref="/electronics/phones"
      />

      {/* Scrollable row */}
      <div className="scroll-row pb-1">
        {smartphones.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            width={180}
          />
        ))}
      </div>
    </section>
  );
}
