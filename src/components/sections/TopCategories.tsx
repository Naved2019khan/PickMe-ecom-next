"use client";

import Link from "next/link";
import { topCategories } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";

export default function TopCategories() {
  return (
    <section
      className="container-main mt-6"
      style={{
        background: "#fff",
        borderRadius: 20,
        padding: "20px 20px 24px",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <SectionHeader
        title="Shop From"
        highlight="Top Categories"
        viewAllHref="/categories"
      />

      <div className="scroll-row pb-1">
        {topCategories.map((cat, i) => (
          <Link
            key={cat.id}
            href={cat.href}
            className="group"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              flexShrink: 0,
              width: 76,
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            {/* Icon circle */}
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                // active first item uses brand light bg + border
                background: i === 0
                  ? "var(--color-primary-light)"
                  : "#fff7ed",
                border: i === 0
                  ? "2px solid var(--color-primary)"
                  : "2px solid var(--color-primary-border)",
                boxShadow: i === 0
                  ? "var(--shadow-primary)"
                  : "var(--shadow-xs)",
                transition:
                  "border-color var(--transition-base), background var(--transition-base), box-shadow var(--transition-base), transform var(--transition-bounce)",
              }}
              className={`
                ${i !== 0
                  ? "group-hover:!border-[var(--color-primary)] group-hover:![background:var(--color-primary-light)] group-hover:![box-shadow:var(--shadow-primary)]"
                  : ""
                }
                group-hover:![transform:translateY(-2px)_scale(1.06)]
              `}
            >
              {cat.icon}
            </div>

            {/* Label */}
            <span
              style={{
                fontSize: 11,
                fontWeight: i === 0 ? 700 : 500,
                textAlign: "center",
                lineHeight: 1.3,
                color: i === 0
                  ? "var(--color-primary)"
                  : "#6b6070",
                fontFamily: "var(--font-sans)",
                transition: "color var(--transition-base), font-weight var(--transition-base)",
              }}
              className={i !== 0 ? "group-hover:!text-[var(--color-primary)] group-hover:!font-bold" : ""}
            >
              {cat.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}