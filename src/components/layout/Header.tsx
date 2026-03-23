"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  MapPin,
  ChevronDown,
  Bell,
  Heart,
  Zap,
} from "lucide-react";

const NAV_CATEGORIES = [
  { label: "Groceries", emoji: "🥦" },
  { label: "Fashion", emoji: "👗" },
  { label: "Electronics", emoji: "📱" },
  { label: "Beauty", emoji: "💄" },
  { label: "Home & Kitchen", emoji: "🏠" },
  { label: "Toys", emoji: "🧸" },
  { label: "Sports", emoji: "⚽" },
];


export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <>
      <header
        className="bg-white sticky top-0 z-50 "
        style={{ boxShadow: "0 2px 16px 0 rgba(0,0,0,0.07)" }}
      >
        {/* ── Main Row ── */}
        <div className="container-main">
          <div className="flex items-center gap-4 py-3">

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 rounded-xl hover:bg-orange-50 transition-colors text-gray-500"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-2 shrink-0 select-none">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center shadow-md">
                <Zap size={17} className="text-white fill-white" />
              </div>
              <span className="text-xl font-black tracking-tight text-gray-900 hidden sm:block">
                Mega<span className="text-orange-500">Mart</span>
              </span>
            </Link>

            {/* ── Delivery Location ── */}
            <button className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-orange-50 transition-colors border border-transparent hover:border-orange-100 group shrink-0">
              <MapPin size={16} className="text-orange-500 shrink-0" />
              <div className="text-left leading-tight">
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Deliver to</p>
                <p className="text-sm font-bold text-gray-800 flex items-center gap-1">
                  Greater Noida <ChevronDown size={13} className="text-gray-400 group-hover:text-orange-500 transition-colors mt-0.5" />
                </p>
              </div>
            </button>

            {/* ── Search ── */}
            <div className="flex-1 relative max-w-2xl">
              <div className="flex items-center bg-gray-50 border-2 border-gray-200 rounded-2xl overflow-hidden focus-within:border-orange-400 focus-within:bg-white transition-all duration-200 shadow-sm focus-within:shadow-orange-100 focus-within:shadow-md">
                <Search size={16} className="ml-4 text-gray-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search groceries, electronics, fashion…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-gray-400 text-gray-800"
                />
                <button className="hidden sm:flex items-center gap-2 px-4 m-1.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-sm font-semibold rounded-xl transition-all duration-150 py-2 shadow-sm shadow-orange-200">
                  Search
                </button>
              </div>
              {/* Trending pills */}
              
            </div>

            {/* ── Right Actions ── */}
            <div className="flex items-center gap-1 shrink-0">

              {/* Notifications */}
              <button className="hidden sm:flex relative p-2.5 rounded-xl hover:bg-gray-50 transition-colors group">
                <Bell size={20} className="text-gray-500 group-hover:text-orange-500 transition-colors" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="hidden sm:flex relative p-2.5 rounded-xl hover:bg-gray-50 transition-colors group"
              >
                <Heart size={20} className="text-gray-500 group-hover:text-rose-500 transition-colors" />
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                  2
                </span>
              </Link>

              {/* Account */}
              <Link
                href="/account"
                className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100 group"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center shadow-sm">
                  <User size={13} className="text-white" />
                </div>
                <div className="leading-tight text-left">
                  <p className="text-[10px] text-gray-400">Hello, Guest</p>
                  <p className="text-xs font-bold text-gray-700">Sign In</p>
                </div>
                <ChevronDown size={13} className="text-gray-400 group-hover:text-orange-500 transition-colors" />
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-sm font-semibold transition-all duration-150 shadow-md shadow-orange-200 relative ml-1"
              >
                <ShoppingCart size={18} />
                <span className="hidden sm:block">Cart</span>
                <span className="flex items-center justify-center w-5 h-5 bg-white text-orange-500 text-[10px] font-black rounded-full">
                  3
                </span>
              </Link>

            </div>
          </div>
        </div>

       

        {/* ── Mobile Drawer ── */}
        {menuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1 shadow-lg">
            {/* Location on mobile */}
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-orange-50 border border-orange-100 mb-3">
              <MapPin size={15} className="text-orange-500" />
              <div>
                <p className="text-[10px] text-gray-400">Delivering to</p>
                <p className="text-sm font-bold text-gray-800">Greater Noida</p>
              </div>
            </div>
            {NAV_CATEGORIES.map((cat) => (
              <Link
                key={cat.label}
                href={`/${cat.label.toLowerCase().replace(/\s+/g, "-")}`}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <span className="text-base">{cat.emoji}</span>
                {cat.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Spacer so content below doesn't hide behind trending pills */}
      <div className="lg:h-6" />
    </>
  );
}