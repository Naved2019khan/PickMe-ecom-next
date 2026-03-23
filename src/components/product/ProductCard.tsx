"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import type { Product } from "@/types";
import { formatINR } from "@/lib/utils";

/**
 * Add these to globals.css :root
 * --color-text-primary:    #1a0a00;   warm near-black (replaces purple #18162a)
 * --color-text-secondary:  #78350f;   warm brown muted (replaces purple-gray #7a728e)
 * --color-text-muted:      #d97706;   amber-muted for labels / MRP (replaces purple-gray)
 * --color-surface:         #ffffff;   plain white card bg
 * --color-border:          #f3f4f6;   neutral hairline
 * --color-surface-warm:    #fff7ed;   warm orange-tinted panel (replaces #f0eef8 purple panel)
 * --shadow-card-warm:      0 2px 10px 0 rgba(249,115,22,0.10), 0 1px 3px 0 rgba(0,0,0,0.06);
 * --shadow-hover-warm:     0 8px 24px 0 rgba(249,115,22,0.22), 0 2px 6px 0 rgba(0,0,0,0.08);
 */

interface ProductCardProps {
  product:    Product;
  className?: string;
}

export default function ProductCard({ product, className = "" }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.id}`}
      className={`group block ${className}`}
      style={{
        borderRadius: 12,
        overflow: "hidden",
        background: "var(--color-surface, #fff)",
        boxShadow: "var(--shadow-card-warm, var(--shadow-card))",
        // border: "1.5px solid var(--color-primary-border)",
        transition: "transform var(--transition-bounce), box-shadow var(--transition-base), border-color var(--transition-base)",
        textDecoration: "none",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-3px)";
        el.style.boxShadow = "var(--shadow-hover-warm, var(--shadow-primary))";
        el.style.borderColor = "var(--color-primary)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "var(--shadow-card-warm, var(--shadow-card))";
        el.style.borderColor = "var(--color-primary-border)";
      }}
    >

      {/* ── Image area ── */}
      <div
        style={{
          position: "relative",
          background: product.imageBg ?? "var(--color-primary-light)",
          padding: "16px 14px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Wishlist */}
        <button
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.85)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            boxShadow: "var(--shadow-xs)",
            opacity: 0,
            transition: "opacity var(--transition-base), transform var(--transition-bounce)",
            zIndex: 2,
          }}
          className="group-hover:!opacity-100"
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform = "scale(1.12)";
            el.style.background = "#fff";
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform = "scale(1)";
            el.style.background = "rgba(255,255,255,0.85)";
          }}
          onClick={e => { e.preventDefault(); e.stopPropagation(); }}
          aria-label="Wishlist"
        >
          <Heart size={13} strokeWidth={2} style={{ color: "var(--color-accent)" }} />
        </button>

        {/* Discount badge */}
        {product.discount && (
          <span
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              background: "var(--gradient-brand)",
              color: "#fff",
              fontSize: 10,
              fontWeight: 700,
              borderRadius: 6,
              padding: "2px 7px",
              letterSpacing: "0.03em",
              boxShadow: "var(--shadow-primary)",
              zIndex: 2,
              fontFamily: "var(--font-sans)",
            }}
          >
            -{product.discount}%
          </span>
        )}

        {/* Product image */}
        <div style={{ position: "relative", width: "100%", height: 110 }}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width:640px) 45vw, 22vw"
            style={{
              objectFit: "contain",
              filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.13))",
              transition: "transform var(--transition-slow)",
            }}
            className="group-hover:[transform:scale(1.06)]"
          />
        </div>
      </div>

      {/* ── Info panel — warm orange-tinted bg, overlaps image ── */}
      <div
        style={{
          background: "var(--color--warm, #fff7ed)",
          borderRadius: "16px 16px 0 0",
          marginTop: -16,
          position: "relative",
          zIndex: 1,
          padding: "14px 13px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 7,
          flex: 1,
        }}
      >
        {/* Tag */}
        {product.tag && (
          <span
            style={{
              display: "inline-block",
              fontSize: 9,
              fontWeight: 700,
              color: "var(--color-primary)",
              background: "var(--color-primary-light)",
              border: "1px solid var(--color-primary-border)",
              borderRadius: 5,
              padding: "2px 7px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              width: "fit-content",
              fontFamily: "var(--font-sans)",
            }}
          >
            {product.tag}
          </span>
        )}

        {/* Name */}
        <h3
          style={{
            margin: 0,
            fontSize: 13,
            fontWeight: 700,
            color: "var(--color-text-primary, #1a0a00)",
            lineHeight: 1.35,
            letterSpacing: "-0.01em",
            fontFamily: "var(--font-sans)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.name}
        </h3>

        {/* Description */}
        {product.description && (
          <p
            style={{
              margin: 0,
              fontSize: 11,
              color: "var(--color-text-secondary, #78350f)",
              lineHeight: 1.6,
              fontFamily: "var(--font-sans)",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.description}
          </p>
        )}

        {/* Hairline */}
        <div
          style={{
            height: 1,
            background: "var(--color-primary-border)",
            margin: "1px 0",
            opacity: 0.6,
          }}
        />

        {/* Price + CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 8,
            marginTop: "auto",
          }}
        >
          {/* Price stack */}
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <span
              style={{
                fontSize: 9,
                fontWeight: 600,
                color: "var(--color-primary-hover)",
                letterSpacing: "0.10em",
                textTransform: "uppercase",
                fontFamily: "var(--font-sans)",
                opacity: 0.8,
              }}
            >
              Price
            </span>
            <span
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: "var(--color-text-primary, #1a0a00)",
                letterSpacing: "-0.02em",
                lineHeight: 1,
                fontFamily: "var(--font-sans)",
              }}
            >
              {formatINR(product.price)}
            </span>
            <span
              style={{
                fontSize: 10,
                color: "var(--color-text-muted, #d97706)",
                textDecoration: "line-through",
                lineHeight: 1.3,
                fontFamily: "var(--font-sans)",
                opacity: 0.7,
              }}
            >
              {formatINR(product.mrp)}
            </span>
          </div>

          {/* Add to cart */}
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              background: "var(--gradient-brand)",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "9px 11px",
              fontSize: 11,
              fontWeight: 700,
              fontFamily: "var(--font-sans)",
              cursor: "pointer",
              boxShadow: "var(--shadow-primary)",
              whiteSpace: "nowrap",
              flexShrink: 0,
              transition:
                "filter var(--transition-fast), transform var(--transition-bounce), box-shadow var(--transition-base)",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.filter = "brightness(1.08)";
              el.style.transform = "scale(1.06)";
              el.style.boxShadow = "var(--shadow-lg)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.filter = "none";
              el.style.transform = "scale(1)";
              el.style.boxShadow = "var(--shadow-primary)";
            }}
            onClick={e => { e.preventDefault(); e.stopPropagation(); }}
          >
            <ShoppingCart size={11} strokeWidth={2.5} />
            Add
          </button>
        </div>
      </div>
    </Link>
  );
}