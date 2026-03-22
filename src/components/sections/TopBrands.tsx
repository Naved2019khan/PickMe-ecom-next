"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { topBrands } from "@/lib/data";
import { useCarousel } from "@/hooks/useCarousel";
import SectionHeader from "@/components/ui/SectionHeader";

const VISIBLE = 3; // cards visible at once

export default function TopBrands() {
  const { current, next, prev, goTo } = useCarousel({
    total:    topBrands.length,
    autoPlay: true,
    interval: 5000,
  });

  // Show a window of VISIBLE brands starting from current
  const visibleBrands = Array.from({ length: VISIBLE }, (_, i) =>
    topBrands[(current + i) % topBrands.length]
  );

  return (
    <section className="container-main mt-6 bg-white rounded-2xl p-5 shadow-[var(--shadow-card)]">
      <SectionHeader
        title="Top"
        highlight="Electronics Brands"
        viewAllHref="/brands"
      />

      <div className="relative">
        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {visibleBrands.map((brand) => (
            <Link
              key={brand.id}
              href={`/brand/${brand.id}`}
              className="brand-card overflow-hidden rounded-xl flex items-center justify-between px-5 py-4 min-h-[110px]"
              style={{ background: brand.bg }}
            >
              {/* Left: logo + offer */}
              <div className="flex flex-col gap-1 z-10">
                <div className="flex items-center gap-2">
                  {brand.logo === "realme" ? (
                    <span
                      className="text-black font-extrabold text-xl px-2 py-0.5 rounded"
                      style={{ background: "#f5e642" }}
                    >
                      realme
                    </span>
                  ) : brand.logo === "🍎" ? (
                    <div className="flex items-center gap-1">
                      <span className="text-2xl">🍎</span>
                      <span className="text-white font-bold text-xs uppercase tracking-widest">
                        iPhone
                      </span>
                    </div>
                  ) : (
                    <span className="text-white font-extrabold text-2xl">{brand.logo}</span>
                  )}
                </div>
                <span className="text-white font-bold text-sm mt-1">{brand.offer}</span>
              </div>

              {/* Right: product image */}
              <div className="relative w-20 h-20 shrink-0">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  sizes="80px"
                  className="object-contain drop-shadow-lg"
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prev}
          className="absolute -left-3 top-1/2 -translate-y-1/2 w-7 h-7 bg-white border border-[var(--color-border)] rounded-full flex items-center justify-center shadow-md hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors z-10"
          aria-label="Previous brand"
        >
          <ChevronLeft size={14} />
        </button>
        <button
          onClick={next}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-7 h-7 bg-white border border-[var(--color-border)] rounded-full flex items-center justify-center shadow-md hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors z-10"
          aria-label="Next brand"
        >
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-1.5 mt-4">
        {topBrands.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current
                ? "w-5 bg-[var(--color-primary)]"
                : "w-1.5 bg-[var(--color-border)]"
            }`}
            aria-label={`Go to brand ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
