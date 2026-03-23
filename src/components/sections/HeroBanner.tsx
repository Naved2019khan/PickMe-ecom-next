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
    <section className="mt-4">
      {/* ── Outer wrapper: no fixed height — grows with content ── */}
      <div
        className="relative rounded-2xl "
        style={{
          background: slide.bg,
          boxShadow: "var(--shadow-lg)",
          transition: "background var(--transition-slow)",
        }}
      >
        {/* ── On-brand ambient blobs ── */}
        <BackgroundAnimation />

        {/* ── Slide content ── */}
        <div className="relative z-10 flex items-center justify-between gap-4 px-5 sm:px-8 md:px-10 py-6 sm:py-7 md:py-8">

          {/* Text col */}
          <div className="flex-1 min-w-0 max-w-[200px] sm:max-w-[260px] lg:max-w-xs">
            {slide.tagline && (
              <p
                className="text-[10px] font-semibold uppercase tracking-widest mb-1"
                style={{ color: "rgba(255,255,255,0.70)" }}
              >
                {slide.tagline}
              </p>
            )}

            <h1
              className="font-black tracking-tight leading-none mb-1.5"
              style={{
                fontSize: "clamp(1.1rem, 2.8vw, 1.75rem)",
                color: "rgba(255,255,255,0.95)",
              }}
            >
              {slide.title}
            </h1>

            <p
              className="font-medium mb-4 leading-snug"
              style={{
                fontSize: "clamp(0.7rem, 1.4vw, 0.8125rem)",
                color: "rgba(255,255,255,0.78)",
              }}
            >
              {slide.subtitle}
            </p>

            <Link
              href={slide.ctaHref}
              className="inline-flex items-center gap-1.5 bg-white font-bold rounded-lg active:scale-95"
              style={{
                color: "var(--color-primary)",
                fontSize: "clamp(0.65rem, 1.2vw, 0.8rem)",
                padding: "7px 16px",
                transition: "background var(--transition-fast), transform var(--transition-bounce)",
                boxShadow: "var(--shadow-md)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "var(--color-primary-light)";
                (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "#fff";
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              }}
            >
              {slide.cta}
              <span style={{ fontSize: "1.1em" }}>→</span>
            </Link>
          </div>

          {/* Image col — drives the card height */}
          <div
            className="shrink-0 relative overflow-hidden "
            style={{
              width:  "clamp(110px, 22vw, 190px)",
              height: "clamp(110px, 22vw, 190px)",
            }}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              sizes="(max-width:640px) 110px, (max-width:768px) 140px, (max-width:1024px) 170px, 190px"
              className="object-contain"
              style={{
                filter: "drop-shadow(0 12px 28px rgba(0,0,0,0.25))",
              }}
              priority
            />
          </div>
        </div>

        {/* ── Dots ── */}
        <div className="relative z-20 flex items-center gap-1.5 px-6 sm:px-10 pb-4">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                height: 6,
                width: i === current ? 22 : 6,
                borderRadius: 9999,
                border: "none",
                padding: 0,
                cursor: "pointer",
                background: i === current ? "#fff" : "rgba(255,255,255,0.40)",
                transition: "width var(--transition-base), background var(--transition-base)",
              }}
            />
          ))}
        </div>

        {/* ── Prev arrow ── */}
        <NavArrow direction="left" onClick={prev} label="Previous slide" />

        {/* ── Next arrow ── */}
        <NavArrow direction="right" onClick={next} label="Next slide" />
      </div>
    </section>
  );
}

/* ── Nav arrow — consistent sizing at all breakpoints ── */
function NavArrow({
  direction,
  onClick,
  label,
}: {
  direction: "left" | "right";
  onClick: () => void;
  label: string;
}) {
  const isLeft = direction === "left";

  return (
    <button
      onClick={onClick}
      aria-label={label}
      style={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        [isLeft ? "left" : "right"]: "clamp(-20px, -2vw, -15px)",
        zIndex: 20,
        width:  "clamp(28px, 4.5vw, 52px)",
        height: "clamp(28px, 4.5vw, 52px)",
        borderRadius: "50%",
        background: "rgba(255,255,255,0.90)",
        // border: "1.5px solid var(--color-primary-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        boxShadow: "var(--shadow-sm)",
        transition:
          "background var(--transition-fast), transform var(--transition-bounce), box-shadow var(--transition-base)",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "#fff";
        el.style.transform = "translateY(-50%) scale(1.1)";
        el.style.boxShadow = "var(--shadow-primary)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "rgba(255,255,255,0.90)";
        el.style.transform = "translateY(-50%) scale(1)";
        el.style.boxShadow = "var(--shadow-sm)";
      }}
    >
      {isLeft
        ? <ChevronLeft  style={{ color: "var(--color-primary)", width: "clamp(12px,2vw,16px)", height: "clamp(12px,2vw,16px)" }} strokeWidth={2.5} />
        : <ChevronRight style={{ color: "var(--color-primary)", width: "clamp(12px,2vw,16px)", height: "clamp(12px,2vw,16px)" }} strokeWidth={2.5} />
      }
    </button>
  );
}

/* ── On-brand ambient blobs using primary/accent palette ── */
function BackgroundAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Top-right warm glow */}
      <div
        style={{
          position: "absolute",
          top: "-30%",
          right: "-15%",
          width: "50%",
          height: "140%",
          borderRadius: "50%",
          background: "var(--color-primary)",
          opacity: 0.12,
          filter: "blur(60px)",
        }}
      />
      {/* Bottom-left accent glow */}
      <div
        style={{
          position: "absolute",
          bottom: "-40%",
          left: "-10%",
          width: "45%",
          height: "120%",
          borderRadius: "50%",
          background: "var(--color-accent)",
          opacity: 0.10,
          filter: "blur(50px)",
        }}
      />
    </div>
  );
}