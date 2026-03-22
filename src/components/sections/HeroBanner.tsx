"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/lib/data";
import { useCarousel } from "@/hooks/useCarousel";

export default function HeroBanner() {
  const { current, next, prev, goTo } = useCarousel({
    total:    heroSlides.length,
    autoPlay: true,
    interval: 4500,
  });

  const slide = heroSlides[current];

  return (
    <section className="container-main mt-4">
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{ background: slide.bg, minHeight: 220 }}
      >
        {/* ── Slide content ── */}
        <div className="relative z-10 flex items-center justify-between px-6 sm:px-10 md:px-14 py-8 md:py-10 min-h-[220px]">

          {/* Text */}
          <div className="max-w-xs sm:max-w-sm lg:max-w-md">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-white/70 mb-1">
              {slide.tagline}
            </p>
            <h1
              className="text-white font-black tracking-tight leading-none mb-2"
              style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}
            >
              {slide.title}
            </h1>
            <p className="text-white/90 font-semibold text-sm sm:text-base mb-5">
              {slide.subtitle}
            </p>
            <Link
              href={slide.ctaHref}
              className="inline-flex items-center gap-2 bg-white font-bold text-sm px-5 py-2.5 rounded-full shadow-md transition-all hover:bg-white/90 active:scale-95"
              style={{ color: "var(--color-primary)" }}
            >
              {slide.cta} →
            </Link>
          </div>

          {/* Image */}
          <div className="relative shrink-0 w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-64 lg:h-64">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, (max-width: 1024px) 208px, 256px"
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* ── Prev arrow ── */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="bg-white rounded-full absolute -left-9 top-1/2 -translate-y-1/2 z-20 size-[70px] flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md"
        >
          <ChevronLeft className="text-gray-800" size={30} strokeWidth={2.5} />
        </button>

        {/* ── Next arrow ── */}
        <button
          onClick={next}
          aria-label="Next slide"
          className="bg-white rounded-full absolute -right-9 top-1/2 -translate-y-1/2 z-20 size-[70px] flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md"
        >
          <ChevronRight className="text-gray-800" size={30} strokeWidth={2.5} />
        </button>

        {/* ── Dots ── */}
        <div className="absolute bottom-4 left-6 z-20 flex items-center gap-1.5">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="dot"
              style={{ height: "6px", width: i === current ? "22px" : "6px" }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}