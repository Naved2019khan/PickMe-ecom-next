"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { topBrands } from "@/lib/data";
import { useCarousel } from "@/hooks/useCarousel";
import SectionHeader from "@/components/ui/SectionHeader";

const VISIBLE = 3;

// Per-brand text color — white on dark/coloured bg, black on light bg
const textColor: Record<string, string> = {
  "brand-1": "#ffffff",
  "brand-2": "#111111",
  "brand-3": "#ffffff",
  "brand-4": "#ffffff",
  "brand-5": "#ffffff",
};

export default function TopBrands() {
  const { current, next, prev, goTo } = useCarousel({
    total:    topBrands.length,
    autoPlay: true,
    interval: 5000,
  });

  const visibleBrands = Array.from({ length: VISIBLE }, (_, i) =>
    topBrands[(current + i) % topBrands.length]
  );

  return (
    <section
      className="container-main mt-6 rounded-2xl p-5"
      style={{
        background: "var(--color-surface, #fff)",
        boxShadow: "var(--shadow-card)",
        border: "1.5px solid var(--color-primary-border)",
      }}
    >
      <SectionHeader
        title="Top"
        highlight="Electronics Brands"
        viewAllHref="/brands"
      />

      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {visibleBrands.map((brand, idx) => {
            const fg = textColor[brand.id] ?? "#ffffff";
            const isDark = fg === "#ffffff";

            return (
              <Link
                key={brand.id}
                href={`/brand/${brand.id}`}
                className={`animate-fade-in delay-${idx + 1} group`}
                style={{
                  display: "block",
                  position: "relative",
                  borderRadius: 16,
                  overflow: "hidden",
                  background: brand.bg,
                  height: 130,
                  textDecoration: "none",
                  boxShadow: "var(--shadow-md)",
                  transition:
                    "transform var(--transition-bounce), box-shadow var(--transition-base)",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-3px)";
                  el.style.boxShadow = "var(--shadow-xl)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "var(--shadow-md)";
                }}
              >
                {/* ── Subtle noise texture overlay ── */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
                    opacity: 0.6,
                    pointerEvents: "none",
                    zIndex: 1,
                  }}
                />

                {/* ── Large faded brand initial — editorial background text ── */}
                <div
                  style={{
                    position: "absolute",
                    right: -8,
                    bottom: -16,
                    fontSize: 100,
                    fontWeight: 900,
                    lineHeight: 1,
                    letterSpacing: "-0.06em",
                    color: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)",
                    pointerEvents: "none",
                    userSelect: "none",
                    zIndex: 1,
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {brand.logo === "🍎" ? "A" : brand.logo}
                </div>

                {/* ── Product image — right side, bleeds out of card ── */}
                <div
                  style={{
                    position: "absolute",
                    right: -4,
                    bottom: 0,
                    width: 120,
                    height: 120,
                    zIndex: 3,
                    transition: "transform var(--transition-spring)",
                  }}
                  className="group-hover:[transform:translateY(-6px)_scale(1.05)]"
                >
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    sizes="120px"
                    style={{
                      objectFit: "contain",
                      filter: isDark
                        ? "drop-shadow(0 8px 20px rgba(0,0,0,0.45))"
                        : "drop-shadow(0 8px 20px rgba(0,0,0,0.20))",
                    }}
                  />
                </div>

                {/* ── Text content — left side ── */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 4,
                    padding: "16px 130px 16px 18px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  {/* Top: brand name + arrow */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* Logo / wordmark */}
                    {brand.logo === "realme" ? (
                      <span
                        style={{
                          fontWeight: 900,
                          fontSize: 15,
                          letterSpacing: "-0.02em",
                          color: "#111",
                          background: "#f5e642",
                          padding: "1px 7px",
                          borderRadius: 4,
                        }}
                      >
                        realme
                      </span>
                    ) : brand.logo === "🍎" ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <span style={{ fontSize: 18, lineHeight: 1 }}>🍎</span>
                        <span
                          style={{
                            fontWeight: 800,
                            fontSize: 13,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: fg,
                          }}
                        >
                          iPhone
                        </span>
                      </div>
                    ) : (
                      <span
                        style={{
                          fontWeight: 900,
                          fontSize: 22,
                          letterSpacing: "-0.03em",
                          color: fg,
                          fontFamily: "var(--font-sans)",
                          lineHeight: 1,
                        }}
                      >
                        {brand.logo}
                      </span>
                    )}

                    {/* Arrow icon */}
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.10)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "background var(--transition-fast), transform var(--transition-bounce)",
                      }}
                      className="group-hover:![background:rgba(255,255,255,0.28)] group-hover:![transform:rotate(45deg)]"
                    >
                      <ArrowUpRight size={12} color={fg} strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Bottom: offer text */}
                  <div>
                    <p
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)",
                        marginBottom: 2,
                        fontFamily: "var(--font-sans)",
                      }}
                    >
                      Limited Offer
                    </p>
                    <p
                      style={{
                        fontSize: 17,
                        fontWeight: 900,
                        letterSpacing: "-0.03em",
                        color: fg,
                        lineHeight: 1,
                        fontFamily: "var(--font-sans)",
                      }}
                    >
                      {brand.offer}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* ── Navigation arrows ── */}
        {[
          { label: "Previous brand", Icon: ChevronLeft,  side: "left",  handler: prev },
          { label: "Next brand",     Icon: ChevronRight, side: "right", handler: next },
        ].map(({ label, Icon, side, handler }) => (
          <button
            key={side}
            onClick={handler}
            aria-label={label}
            className="absolute top-1/2 -translate-y-1/2 w-7 h-7 bg-white rounded-full flex items-center justify-center z-10"
            style={{
              [side]: "-12px",
              border: "1px solid var(--color-primary-border)",
              boxShadow: "var(--shadow-sm)",
              color: "#6b7280",
              transition:
                "border-color var(--transition-fast), color var(--transition-fast), box-shadow var(--transition-fast)",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--color-primary)";
              el.style.color = "var(--color-primary)";
              el.style.boxShadow = "var(--shadow-primary)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--color-primary-border)";
              el.style.color = "#6b7280";
              el.style.boxShadow = "var(--shadow-sm)";
            }}
          >
            <Icon size={14} />
          </button>
        ))}
      </div>

      {/* ── Dots ── */}
      <div className="flex items-center justify-center gap-1.5 mt-4">
        {topBrands.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to brand ${i + 1}`}
            style={{
              height: 6,
              width: i === current ? 24 : 8,
              borderRadius: 9999,
              border: "none",
              padding: 0,
              cursor: "pointer",
              background: i === current
                ? "var(--color-primary)"
                : "var(--color-primary-border)",
              transition: "width var(--transition-base), background var(--transition-base)",
            }}
          />
        ))}
      </div>
    </section>
  );
}