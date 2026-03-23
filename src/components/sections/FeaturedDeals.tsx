"use client";

import { featuredDeals } from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";
import SectionHeader from "@/components/ui/SectionHeader";

export default function FeaturedDeals() {
  return (
    <section className="container-main mt-6 bg-gray-50 rounded-2xl p-5 shadow-[var(--shadow-card)]">
      <SectionHeader
        title="Today's"
        highlight="Best Deals"
        viewAllHref="/deals"
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 ">
        {featuredDeals.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
