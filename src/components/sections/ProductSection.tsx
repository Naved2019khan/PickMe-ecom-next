import { featuredDeals } from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";
import SectionHeader from "@/components/ui/SectionHeader";

// ── Swap in any product array from @/lib/data ──
// e.g. topRated, newArrivals, trendingNow, etc.
const products = featuredDeals;

export default function ProductSection() {
  return (
    <section
      className="container-main mt-6"
      style={{
        background: "var(--color-surface, #fff)",
        borderRadius: 20,
        padding: "20px 20px 24px",
        boxShadow: "var(--shadow-card)",
        border: "1.5px solid var(--color-primary-border)",
      }}
    >
      <SectionHeader
        title="Featured"
        highlight="Products"
        viewAllHref="/products"
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}