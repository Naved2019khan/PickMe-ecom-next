"use client";

import { featuredDeals } from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";
import SectionHeader from "@/components/ui/SectionHeader";

// ── Swap in any product array from @/lib/data ──
// e.g. topRated, newArrivals, trendingNow, etc.
const products = featuredDeals;

export default function ProductSection() {
  return (
    <section className=" mt-6 relative group z-10">
      
      {/* Search-bar style gradient glow shadow */}
      {/* <div className="absolute -inset-[3px] bg-gradient-to-r from-orange-400 via-rose-400 to-orange-400 opacity-10 group-hover:opacity-40 blur-md transition-opacity duration-300 rounded-[20px] pointer-events-none z-0"></div> */}

      <div className="relative bg-white rounded-2xl p-5 shadow-sm border border-orange-50/50 z-10">
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
      </div>
    </section>
  );
}