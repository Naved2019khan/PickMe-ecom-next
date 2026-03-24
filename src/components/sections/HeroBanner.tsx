"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star, Zap, ShieldCheck } from "lucide-react";
import { heroSlides } from "@/lib/data";
import { useCarousel } from "@/hooks/useCarousel";

/* ── Per-slide accent data ─────────────────────────────────────── */
const SLIDE_META = [
  {
    accentColor: "#ef4444",
    glowA: "rgba(239,68,68,0.35)",
    glowB: "rgba(251,113,133,0.20)",
    badge: "🔥 Today's Best Deal",
    stats: [
      { icon: <Star size={11} className="fill-yellow-400 text-yellow-400" />, label: "4.9 Rating" },
      { icon: <ShieldCheck size={11} className="text-emerald-400" />,        label: "Secure Pay"  },
    ],
  },
  {
    accentColor: "#0ea5e9",
    glowA: "rgba(14,165,233,0.35)",
    glowB: "rgba(56,189,248,0.20)",
    badge: "📱 Top Sellers",
    stats: [
      { icon: <Zap size={11} className="text-yellow-400" />,                 label: "Fast Delivery" },
      { icon: <ShieldCheck size={11} className="text-emerald-400" />,        label: "1yr Warranty"  },
    ],
  },
  {
    accentColor: "#a855f7",
    glowA: "rgba(168,85,247,0.35)",
    glowB: "rgba(192,132,252,0.20)",
    badge: "✨ New Arrivals",
    stats: [
      { icon: <Star size={11} className="fill-yellow-400 text-yellow-400" />, label: "Trending Now" },
      { icon: <Zap size={11} className="text-yellow-400" />,                  label: "Free Returns" },
    ],
  },
];

export default function HeroBanner() {
  const { current, next, prev, goTo } = useCarousel({
    total:    heroSlides.length,
    autoPlay: true,
    interval: 4500,
  });

  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    setAnimKey((k) => k + 1);
  }, [current]);

  const slide = heroSlides[current];
  const meta  = SLIDE_META[current];

  return (
    <section className="mt-4 relative">
      <div
        className="relative rounded-3xl overflow-hidden"
        style={{
          height:      "clamp(280px, 60vw, 450px)",
          boxShadow:   "0 25px 60px -10px rgba(0,0,0,0.45), 0 10px 24px -6px rgba(0,0,0,0.30)",
        }}
      >
        {/* ── Background & Layered mesh glows (overflow-hidden to contain orbs) ── */}
        <div 
          className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none"
          style={{
            background: slide.bg,
            transition: "background 600ms ease",
          }}
        >
          {/* Main orb */}
          <div style={{
            position: "absolute", top: "-20%", right: "10%",
            width: "55%", height: "130%", borderRadius: "50%",
            background: meta.glowA, filter: "blur(80px)",
            transition: "background 600ms ease",
          }} />
          {/* Secondary orb */}
          <div style={{
            position: "absolute", bottom: "-30%", left: "-5%",
            width: "45%", height: "110%", borderRadius: "50%",
            background: meta.glowB, filter: "blur(60px)",
            transition: "background 600ms ease",
          }} />
          {/* Subtle grid overlay */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }} />
          {/* Radial vignette */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 70% 50%, transparent 40%, rgba(0,0,0,0.35) 100%)",
          }} />
        </div>

        {/* ── Slide content ── */}
        <div className="absolute inset-0 z-10 flex items-center justify-between gap-4 px-6 sm:px-10 md:px-14 pb-10 sm:pb-8">
          
          {/* ── Text column (No remount, no slide animation) ── */}
          <div
            className="flex-1 w-full flex flex-col justify-center z-20"
            style={{ maxWidth: "clamp(260px, 85%, 520px)" }}
          >
            {/* Flash badge */}
            <span
              className="inline-flex items-center gap-1.5 self-start mb-4"
              style={{
                background:   "rgba(255,255,255,0.12)",
                backdropFilter: "blur(10px)",
                border:       `1px solid rgba(255,255,255,0.20)`,
                borderRadius: 9999,
                padding:      "5px 12px",
                fontSize:     11,
                fontWeight:   700,
                color:        "#fff",
                letterSpacing: "0.04em",
              }}
            >
              {meta.badge}
            </span>

            {/* Tagline */}
            <p
              style={{
                fontSize:      "clamp(10px, 1.2vw, 13px)",
                fontWeight:    600,
                color:         "rgba(255,255,255,0.60)",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom:  8,
              }}
            >
              {slide.tagline}
            </p>

            {/* Title */}
            <h1
              style={{
                fontSize:      "clamp(1.6rem, 4.5vw, 3.4rem)",
                fontWeight:    900,
                color:         "#fff",
                lineHeight:    1.0,
                letterSpacing: "-0.025em",
                marginBottom:  "clamp(6px, 1.2vw, 14px)",
              }}
            >
              {slide.title}
            </h1>

            {/* Discount pill */}
            <div>
              <span
                style={{
                  display:      "inline-block",
                  background:   `linear-gradient(135deg, ${meta.accentColor}, rgba(255,255,255,0.25))`,
                  color:        "#fff",
                  fontWeight:   900,
                  fontSize:     "clamp(0.85rem, 2vw, 1.35rem)",
                  padding:      "4px 16px",
                  borderRadius: 9999,
                  letterSpacing: "-0.01em",
                  boxShadow:    `0 4px 16px ${meta.glowA}`,
                  marginBottom: "clamp(12px, 2vw, 20px)",
                }}
              >
                {slide.subtitle}
              </span>
            </div>

            {/* Stat pills */}
            <div className="flex items-center flex-wrap gap-2 mb-5">
              {meta.stats.map((s, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5"
                  style={{
                    background:   "rgba(255,255,255,0.10)",
                    backdropFilter: "blur(8px)",
                    border:       "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 9999,
                    padding:      "4px 10px",
                    fontSize:     11,
                    fontWeight:   600,
                    color:        "rgba(255,255,255,0.90)",
                  }}
                >
                  {s.icon}
                  {s.label}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-3">
              <Link
                href={slide.ctaHref}
                className="inline-flex items-center gap-2 font-black rounded-2xl active:scale-95"
                style={{
                  background:    "#fff",
                  color:         meta.accentColor,
                  fontSize:      "clamp(0.75rem, 1.4vw, 0.925rem)",
                  padding:       "clamp(9px,1.4vw,13px) clamp(16px,2.5vw,28px)",
                  boxShadow:     `0 8px 24px ${meta.glowA}`,
                  transition:    "transform 150ms ease, box-shadow 150ms ease",
                  whiteSpace:    "nowrap",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform  = "scale(1.04) translateY(-1px)";
                  el.style.boxShadow  = `0 14px 36px ${meta.glowA}`;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform  = "scale(1)";
                  el.style.boxShadow  = `0 8px 24px ${meta.glowA}`;
                }}
              >
                {slide.cta}
                <span style={{ fontSize: "1.1em" }}>→</span>
              </Link>

              <span className="hidden sm:inline" style={{ color: "rgba(255,255,255,0.45)", fontSize: 11 }}>
                Free shipping ≥ ₹499
              </span>
            </div>
          </div>

          {/* ── Image column (Does NOT remount, prevents flicker) ── */}
          <div
            className="shrink-0 absolute right-[-15%] sm:right-0 sm:relative opacity-30 sm:opacity-100 z-0 pointer-events-none sm:pointer-events-auto"
            style={{
              width:  "clamp(180px, 40vw, 300px)",
              height: "clamp(180px, 40vw, 300px)",
            }}
          >
            {/* Glowing ring behind image */}
            <div style={{
              position: "absolute", inset: "10%",
              borderRadius: "50%",
              background: meta.glowA,
              filter: "blur(30px)",
              transition: "background 600ms ease",
            }} />

            <div className="absolute inset-0 z-10" style={{ transition: "opacity 300ms ease" }}>
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                sizes="(max-width:640px) 140px, (max-width:768px) 200px, (max-width:1024px) 260px, 300px"
                className="object-contain"
                style={{ filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.40))" }}
                priority
              />
            </div>
          </div>
        </div>

        {/* ── Bottom bar: dots + slide counter ── */}
        <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-6 sm:px-10 md:px-14 pb-4 sm:pb-5">
          {/* Dots */}
          <div className="flex items-center gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                style={{
                  height:     6,
                  width:      i === current ? 28 : 6,
                  borderRadius: 9999,
                  border:     "none",
                  padding:    0,
                  cursor:     "pointer",
                  background: i === current ? "#fff" : "rgba(255,255,255,0.30)",
                  transition: "width 300ms ease, background 300ms ease",
                }}
              />
            ))}
          </div>

          {/* Counter */}
          <span style={{ color: "rgba(255,255,255,0.40)", fontSize: 11, fontWeight: 600 }}>
            {String(current + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* ── Nav arrows (Positioned freely outside the overflow-hidden container) ── */}
      <NavArrow direction="left"  onClick={prev} label="Previous slide" accentColor={meta.accentColor} />
      <NavArrow direction="right" onClick={next} label="Next slide"     accentColor={meta.accentColor} />
    </section>
  );
}

/* ── Nav arrow ──────────────────────────────────────────────────── */
function NavArrow({
  direction, onClick, label, accentColor,
}: {
  direction:   "left" | "right";
  onClick:     () => void;
  label:       string;
  accentColor: string;
}) {
  const isLeft = direction === "left";
  return (
    <button
      onClick={onClick}
      aria-label={label}
      style={{
        position:        "absolute",
        top:             "50%",
        transform:       "translateY(-50%)",
        [isLeft ? "left" : "right"]: "clamp(-14px, -1.5vw, -10px)",
        zIndex:          20,
        width:           "clamp(32px, 5vw, 48px)",
        height:          "clamp(32px, 5vw, 48px)",
        borderRadius:    "50%",
        background:      "rgba(255,255,255,0.95)",
        border:          "none",
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        cursor:          "pointer",
        backdropFilter:  "blur(8px)",
        boxShadow:       "0 4px 16px rgba(0,0,0,0.25)",
        transition:      "transform 200ms ease, box-shadow 200ms ease",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-50%) scale(1.12)";
        el.style.boxShadow = `0 8px 28px ${accentColor}60`;
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-50%) scale(1)";
        el.style.boxShadow = "0 4px 16px rgba(0,0,0,0.25)";
      }}
    >
      {isLeft
        ? <ChevronLeft  style={{ color: accentColor, width: "clamp(14px,2vw,18px)", height: "clamp(14px,2vw,18px)" }} strokeWidth={2.5} />
        : <ChevronRight style={{ color: accentColor, width: "clamp(14px,2vw,18px)", height: "clamp(14px,2vw,18px)" }} strokeWidth={2.5} />
      }
    </button>
  );
}