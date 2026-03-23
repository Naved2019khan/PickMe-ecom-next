"use client"
import { Truck, RotateCcw, ShieldCheck, Headphones } from "lucide-react";

const features = [
  {
    Icon:    Truck,
    title:   "Free Delivery",
    desc:    "On orders above ₹499",
    bg:      "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)",
    border:  "var(--color-primary-border)",
    iconBg:  "var(--color-primary-light)",
    color:   "var(--color-primary)",
    shadow:  "var(--shadow-primary)",
  },
  {
    Icon:    RotateCcw,
    title:   "Easy Returns",
    desc:    "10-day hassle-free returns",
    bg:      "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)",
    border:  "#c7d2fe",
    iconBg:  "#eef2ff",
    color:   "var(--color-info)",
    shadow:  "0 4px 14px 0 rgba(99,102,241,0.20)",
  },
  {
    Icon:    ShieldCheck,
    title:   "Secure Payments",
    desc:    "100% secure transactions",
    bg:      "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)",
    border:  "var(--color-success-border)",
    iconBg:  "var(--color-success-light)",
    color:   "var(--color-success)",
    shadow:  "0 4px 14px 0 rgba(16,185,129,0.18)",
  },
  {
    Icon:    Headphones,
    title:   "24/7 Support",
    desc:    "Dedicated customer support",
    bg:      "linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)",
    border:  "var(--color-accent-border)",
    iconBg:  "var(--color-accent-light)",
    color:   "var(--color-accent)",
    shadow:  "0 4px 14px 0 rgba(239,68,68,0.18)",
  },
];

export default function TrustBanner() {
  return (
    <section className="container-main mt-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {features.map(({ Icon, title, desc, bg, border, iconBg, color, shadow }) => (
          <div
            key={title}
            style={{
              background: bg,
              border: `1.5px solid ${border}`,
              borderRadius: 16,
              padding: "14px 14px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              boxShadow: "var(--shadow-xs)",
              transition:
                "transform var(--transition-bounce), box-shadow var(--transition-base)",
              cursor: "default",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.transform = "translateY(-2px)";
              el.style.boxShadow = shadow;
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "var(--shadow-xs)";
            }}
          >
            {/* Icon bubble */}
            <div
              style={{
                flexShrink: 0,
                width: 40,
                height: 40,
                borderRadius: 12,
                background: iconBg,
                border: `1.5px solid ${border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon size={18} style={{ color }} strokeWidth={2} />
            </div>

            {/* Text */}
            <div style={{ minWidth: 0 }}>
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#18160a",
                  letterSpacing: "-0.01em",
                  fontFamily: "var(--font-sans)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {title}
              </p>
              <p
                style={{
                  margin: "2px 0 0",
                  fontSize: 10,
                  fontWeight: 500,
                  color: "#9ca3af",
                  fontFamily: "var(--font-sans)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  lineHeight: 1.4,
                }}
              >
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}