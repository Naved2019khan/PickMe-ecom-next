"use client"
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import type { Product } from "@/types";
import { formatINR, calcSaving } from "@/lib/utils";
import DiscountBadge from "@/components/ui/DiscountBadge";
import StarRating from "@/components/ui/StarRating";

interface ProductCardProps {
  product:   Product;
  className?: string;
  width?:    number; // fixed width for scroll rows
}

export default function ProductCard({ product, className = "", width }: ProductCardProps) {
  const saving = calcSaving(product.price, product.mrp);

  return (
    <Link
      href={`/product/${product.id}`}
      style={width ? { width } : undefined}
      className={`product-card bg-white rounded-xl overflow-hidden border border-[var(--color-border)] cursor-pointer block relative group ${className}`}
    >
      {/* Discount badge */}
      <div className="absolute top-2 left-2 z-10">
        <DiscountBadge percent={product.discount} />
      </div>

      {/* Wishlist button */}
      <button
        className="absolute top-2 right-2 z-10 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-50"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
        aria-label="Add to wishlist"
      >
        <Heart size={13} className="text-[var(--color-text-muted)] hover:text-red-500 transition-colors" />
      </button>

      {/* Product image */}
      <div className="relative aspect-square bg-[var(--color-surface-muted)] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 160px, 200px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.tag && (
          <span className="absolute bottom-2 left-2 bg-[var(--color-primary)] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
            {product.tag}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-xs font-medium text-[var(--color-text-primary)] line-clamp-2 mb-2 leading-snug">
          {product.name}
        </p>

        {product.rating && (
          <div className="mb-2">
            <StarRating rating={product.rating} reviews={product.reviews} />
          </div>
        )}

        {/* Prices */}
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className="text-sm font-bold text-[var(--color-text-primary)]">
            {formatINR(product.price)}
          </span>
          <span className="text-xs text-[var(--color-price-old)] line-through">
            {formatINR(product.mrp)}
          </span>
        </div>

        <p className="text-xs text-[var(--color-badge-green)] font-medium mt-0.5">
          Save {formatINR(saving)}
        </p>

        {/* Add to cart – appears on hover */}
        <button
          className="mt-2 w-full flex items-center justify-center gap-1.5 bg-[var(--color-primary)] text-white text-xs font-semibold py-1.5 rounded-lg opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
        >
          <ShoppingCart size={12} />
          Add to Cart
        </button>
      </div>
    </Link>
  );
}
