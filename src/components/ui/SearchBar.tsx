"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Search, X, TrendingUp, ArrowUpRight } from "lucide-react";
import { smartphones, featuredDeals, topCategories } from "@/lib/data";
import type { Product, Category } from "@/types";

/* ─── Flatten searchable items ──────────────────────────────────── */
const ALL_PRODUCTS: Product[] = [...smartphones, ...featuredDeals];
const ALL_CATEGORIES: Category[] = topCategories;

const TRENDING_SEARCHES = [
  "Smartphones",
  "Wireless Earbuds",
  "Smart Watch",
  "Laptops",
  "Running Shoes",
];

interface SearchResult {
  type: "product" | "category" | "trending";
  id: string;
  label: string;
  sublabel?: string;
  image?: string;
  price?: number;
  discount?: number;
  icon?: string;
}

function formatPrice(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

function buildResults(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const products: SearchResult[] = ALL_PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(q)
  )
    .slice(0, 5)
    .map((p) => ({
      type: "product",
      id: p.id,
      label: p.name,
      sublabel: `${formatPrice(p.price)}  •  ${p.discount}% off`,
      image: p.image,
      price: p.price,
      discount: p.discount,
    }));

  const categories: SearchResult[] = ALL_CATEGORIES.filter((c) =>
    c.label.toLowerCase().includes(q)
  )
    .slice(0, 3)
    .map((c) => ({
      type: "category",
      id: c.id,
      label: c.label,
      sublabel: "Browse category",
      icon: c.icon,
    }));

  return [...categories, ...products];
}

/* ─── Component ─────────────────────────────────────────────────── */
export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = buildResults(query);
  const showTrending = query.trim() === "" && open;
  const showResults = query.trim() !== "" && open;
  const dropdownVisible = showTrending || showResults;

  /* Close on outside click */
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Reset active index when results change */
  useEffect(() => {
    setActiveIndex(-1);
  }, [query]);

  const clearQuery = useCallback(() => {
    setQuery("");
    inputRef.current?.focus();
  }, []);

  const listItems: SearchResult[] = showTrending
    ? TRENDING_SEARCHES.map((t, i) => ({
        type: "trending",
        id: `trend-${i}`,
        label: t,
      }))
    : results;

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!dropdownVisible) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, listItems.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      const chosen = listItems[activeIndex];
      if (chosen) {
        setQuery(chosen.label);
        setOpen(false);
      }
    }
  }

  function handleSelect(item: SearchResult) {
    setQuery(item.label);
    setOpen(false);
    setActiveIndex(-1);
    inputRef.current?.blur();
  }

  return (
    <div ref={containerRef} className="flex-1 relative max-w-2xl">
      {/* ── Input wrapper ── */}
      <div
        className={[
          "flex items-center rounded-2xl overflow-visible transition-all duration-200",
          dropdownVisible
            ? "bg-white shadow-lg shadow-gray-200/80 rounded-b-none"
            : "bg-gray-100 hover:bg-gray-50 focus-within:bg-white focus-within:shadow-lg focus-within:shadow-gray-200/80",
        ].join(" ")}
      >
        <Search
          size={16}
          className={[
            "ml-4 shrink-0 transition-colors duration-150",
            open ? "text-orange-500" : "text-gray-400",
          ].join(" ")}
        />

        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={dropdownVisible}
          aria-autocomplete="list"
          aria-haspopup="listbox"
          aria-activedescendant={
            activeIndex >= 0 ? `search-item-${activeIndex}` : undefined
          }
          autoComplete="off"
          spellCheck={false}
          placeholder="Search groceries, electronics, fashion…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent px-3 py-2.5 text-sm placeholder:text-gray-400 text-gray-800"
          style={{ border: "none", outline: "none", boxShadow: "none" }}
        />

        {/* Clear button */}
        {query && (
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={clearQuery}
            aria-label="Clear search"
            className="p-1.5 mr-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X size={14} />
          </button>
        )}

        {/* Search CTA */}
        <button
          aria-label="Search"
          className="hidden sm:flex items-center gap-2 px-4 m-1.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-sm font-semibold rounded-xl transition-all duration-150 py-2 shadow-sm shadow-orange-200 shrink-0"
        >
          Search
        </button>
      </div>

      {/* ── Dropdown ── */}
      {dropdownVisible && (
        <div
          role="listbox"
          aria-label="Search suggestions"
          className="absolute left-0 right-0 top-full bg-white rounded-b-2xl shadow-lg shadow-gray-200/80 z-50 overflow-hidden animate-slide-down"
        >
          {/* Trending section */}
          {showTrending && (
            <>
              <div className="flex items-center gap-2 px-4 pt-3 pb-1.5">
                <TrendingUp size={13} className="text-orange-500" />
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  Trending Searches
                </span>
              </div>
              <ul className="py-1.5">
                {listItems.map((item, idx) => (
                  <li key={item.id}>
                    <button
                      id={`search-item-${idx}`}
                      role="option"
                      aria-selected={idx === activeIndex}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setActiveIndex(idx)}
                      className={[
                        "w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-100",
                        idx === activeIndex
                          ? "bg-orange-50 text-orange-600"
                          : "text-gray-700 hover:bg-gray-50",
                      ].join(" ")}
                    >
                      <TrendingUp
                        size={14}
                        className={
                          idx === activeIndex
                            ? "text-orange-400"
                            : "text-gray-300"
                        }
                      />
                      <span className="text-sm font-medium">{item.label}</span>
                      <ArrowUpRight
                        size={13}
                        className={[
                          "ml-auto transition-opacity",
                          idx === activeIndex ? "opacity-100 text-orange-400" : "opacity-0",
                        ].join(" ")}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Results section */}
          {showResults && listItems.length > 0 && (
            <ul className="py-1.5">
              {listItems.map((item, idx) => (
                <li key={item.id}>
                  <button
                    id={`search-item-${idx}`}
                    role="option"
                    aria-selected={idx === activeIndex}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={[
                      "w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-100",
                      idx === activeIndex
                        ? "bg-orange-50"
                        : "hover:bg-gray-50",
                    ].join(" ")}
                  >
                    {/* Category icon */}
                    {item.type === "category" && (
                      <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-orange-50 text-base shrink-0">
                        {item.icon}
                      </span>
                    )}

                    {/* Product thumbnail */}
                    {item.type === "product" && item.image && (
                      <div className="w-8 h-8 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.label}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Label + sublabel */}
                    <div className="min-w-0 flex-1">
                      <p
                        className={[
                          "text-sm font-medium truncate",
                          idx === activeIndex
                            ? "text-orange-700"
                            : "text-gray-800",
                        ].join(" ")}
                      >
                        {item.label}
                      </p>
                      {item.sublabel && (
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          {item.sublabel}
                        </p>
                      )}
                    </div>

                    {/* Category badge */}
                    {item.type === "category" && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 shrink-0">
                        Category
                      </span>
                    )}

                    {/* Discount badge */}
                    {item.type === "product" && item.discount && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-600 shrink-0">
                        {item.discount}% off
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* No results */}
          {showResults && listItems.length === 0 && (
            <div className="flex flex-col items-center gap-2 py-8 text-gray-400">
              <Search size={22} className="opacity-40" />
              <p className="text-sm font-medium">
                No results for &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-gray-300">
                Try a different keyword
              </p>
            </div>
          )}

          {/* Footer hint */}
          <div className="border-t border-gray-100 px-4 py-2 flex items-center gap-2">
            <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-gray-100 text-[10px] font-mono text-gray-500 border border-gray-200">
              ↑↓
            </kbd>
            <span className="text-[10px] text-gray-400">navigate</span>
            <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-gray-100 text-[10px] font-mono text-gray-500 border border-gray-200 ml-2">
              ↵
            </kbd>
            <span className="text-[10px] text-gray-400">select</span>
            <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-gray-100 text-[10px] font-mono text-gray-500 border border-gray-200 ml-2">
              Esc
            </kbd>
            <span className="text-[10px] text-gray-400">close</span>
          </div>
        </div>
      )}
    </div>
  );
}
