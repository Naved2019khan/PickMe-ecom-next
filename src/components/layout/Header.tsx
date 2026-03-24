"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ShoppingCart,
  User,
  Menu,
  X,
  MapPin,
  ChevronDown,
  Heart,
  Zap,
} from "lucide-react";
import SearchBar from "@/components/ui/SearchBar";
import {
  useAppDispatch, useAppSelector,
  selectCartCount, toggleDrawer,
  openLocationDrawer, selectLocationDetails,
  openAuthDrawer, selectIsAuthenticated, selectUser,
  openWishlistDrawer, selectWishlistCount,
  setLocationDetails,
} from "@/store";

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
  const [detecting, setDetecting] = useState(false);
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector(selectCartCount);
  const location = useAppSelector(selectLocationDetails);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  const wishlistCount = useAppSelector(selectWishlistCount);

  async function detectLocation() {
    if (!navigator.geolocation) return;
    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const addr = data.address || {};
          dispatch(setLocationDetails({
            city:    addr.city || addr.town || addr.village || addr.county || "Your Location",
            state:   addr.state || "",
            country: addr.country || "India",
            pin:     addr.postcode || "",
            lat:     latitude,
            lng:     longitude,
          }));
        } catch {
          dispatch(setLocationDetails({ city: "Your Location" }));
        } finally {
          setDetecting(false);
        }
      },
      () => setDetecting(false)
    );
  }

  return (
    <>
      <header
        className="bg-white sticky top-0 z-50 "
        style={{ boxShadow: "0 2px 16px 0 rgba(0,0,0,0.07)" }}
      >
        {/* ── Main Row ── */}
        <div className="container-main ">
          <div className="flex items-center gap-2 sm:gap-4 py-3 sm:py-4">

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
            {!location.city ? (
              /* No city yet: show Detect button */
              <button
                onClick={detectLocation}
                disabled={detecting}
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-orange-50 transition-colors group shrink-0"
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
                  detecting ? "bg-orange-500 animate-pulse" : "bg-gradient-to-br from-orange-500 to-rose-500"
                }`}>
                  <MapPin size={14} className="text-white" />
                </div>
                <div className="text-left leading-tight">
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Delivery</p>
                  <p className="text-sm font-bold text-orange-500">
                    {detecting ? "Detecting…" : "Detect Location"}
                  </p>
                </div>
              </button>
            ) : (
              /* City detected: show location + open drawer on click */
              <button
                onClick={() => dispatch(openLocationDrawer())}
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-orange-50 transition-colors group shrink-0"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center shrink-0 shadow-sm shadow-orange-300 transition-all group-hover:shadow-md group-hover:shadow-orange-400">
                  <MapPin size={14} className="text-white" />
                </div>
                <div className="text-left leading-tight">
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Deliver to</p>
                  <p className="text-sm font-bold text-gray-900 flex items-center gap-1 line-clamp-1 max-w-[120px]">
                    {location.city} <ChevronDown size={13} className="text-gray-400 group-hover:text-orange-500 transition-colors mt-0.5 shrink-0" />
                  </p>
                </div>
              </button>
            )}

            <div className="hidden md:block flex-1 max-w-2xl mx-auto">
              {/* ── Search ── */}
              <SearchBar />
            </div>
            
            <div className="md:hidden flex-1" />

            {/* ── Right Actions ── */}
            <div className="flex items-center gap-1 shrink-0">

              {/* Wishlist */}
              <button
                onClick={() => dispatch(openWishlistDrawer())}
                className="hidden sm:flex relative p-2.5 rounded-xl hover:bg-rose-50 transition-colors group"
                aria-label="Wishlist"
              >
                <Heart size={20} className="text-gray-500 group-hover:text-rose-500 transition-colors" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Account */}
              <button
                onClick={() => {
                  if (isAuthenticated) {
                    dispatch(openAuthDrawer());
                  } else {
                    dispatch(openAuthDrawer({ view: 'signin' }));
                  }
                }}
                className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-orange-50 transition-colors border border-gray-100 hover:border-orange-200 group cursor-pointer"
              >
                {isAuthenticated && user ? (
                  <>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center shadow-md shadow-orange-200 ring-2 ring-orange-100">
                      <span className="text-white text-xs font-black leading-none">
                        {user.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="leading-tight text-left">
                      <p className="text-[10px] text-orange-500 font-semibold">Welcome back</p>
                      <p className="text-xs font-bold text-gray-800 max-w-[90px] truncate">{user.name}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center group-hover:shadow-md group-hover:shadow-orange-400 transition-all">
                      <User size={14} className="text-white" />
                    </div>
                    <div className="leading-tight text-left">
                      <p className="text-[10px] text-gray-400">Hello, Guest</p>
                      <p className="text-xs font-bold text-orange-500 group-hover:text-orange-600 transition-colors">Sign In</p>
                    </div>
                  </>
                )}
                <ChevronDown size={13} className="text-gray-400 group-hover:text-orange-500 transition-colors" />
              </button>

              {/* Cart */}
              <button
                onClick={() => dispatch(toggleDrawer())}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 hover:opacity-90 active:scale-95 text-white text-sm font-bold transition-all duration-150 shadow-md shadow-orange-500/30 relative ml-1"
              >
                <ShoppingCart size={18} />
                <span className="hidden sm:block">Cart</span>
                {cartCount > 0 && (
                  <span className="flex items-center justify-center w-5 h-5 bg-white text-orange-500 text-[10px] font-black rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>

            </div>
          </div>
          
          {/* ── Mobile Search Row ── */}
          <div className="md:hidden pb-3 px-1 w-full relative z-40">
            <SearchBar />
          </div>
        </div>



        {/* ── Mobile Drawer ── */}
        {menuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1 shadow-lg">
            {/* Location on mobile */}
            <button
              onClick={() => {
                dispatch(openLocationDrawer());
                setMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-orange-50 to-white border border-orange-100 mb-4 text-left shadow-sm active:scale-[0.98] transition-all"
            >
              <div className="w-9 h-9 rounded-xl bg-white border border-orange-100 flex items-center justify-center shadow-sm">
                <MapPin size={16} className="text-orange-500" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Delivering to</p>
                <p className="text-sm font-black text-gray-900 line-clamp-1">{location.city || "Select City"}</p>
              </div>
              <ChevronDown size={14} className="text-orange-400 mr-1" />
            </button>
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
      {/* <div className="lg:h-6" /> */}
    </>
  );
}