"use client";

import { useEffect } from "react";
import { X, Heart, Trash2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import {
  useAppDispatch, useAppSelector,
  selectWishlistItems, selectWishlistOpen,
  closeWishlistDrawer, removeWishlistItemAsync, clearWishlistAsync, fetchWishlist,
  addToCart,
} from "@/store";
import { formatINR } from "@/lib/utils";

export default function WishlistDrawer() {
  const dispatch = useAppDispatch();
  const items    = useAppSelector(selectWishlistItems);
  const isOpen   = useAppSelector(selectWishlistOpen);

  /* Lock body scroll when open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  /* Fetch wishlist items on mount */
  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  /* Close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") dispatch(closeWishlistDrawer());
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [dispatch]);

  function handleMoveToCart(item: typeof items[0]) {
    dispatch(addToCart({
      id:       item.id,
      name:     item.name,
      image:    item.image,
      price:    item.price,
      mrp:      item.mrp,
      discount: item.discount,
    }));
    dispatch(removeWishlistItemAsync(item.id));
  }

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        aria-hidden="true"
        onClick={() => dispatch(closeWishlistDrawer())}
        className={[
          "fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      />

      {/* ── Drawer ── */}
      <aside
        aria-label="Wishlist"
        role="dialog"
        aria-modal="true"
        className={[
          "fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-[70]",
          "flex flex-col shadow-2xl transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center shadow-md shadow-rose-200">
              <Heart size={15} className="text-white fill-white" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-black text-gray-900">My Wishlist</p>
              <p className="text-[11px] text-gray-400">
                {items.length === 0
                  ? "No items saved"
                  : `${items.length} item${items.length !== 1 ? "s" : ""} saved`}
              </p>
            </div>
          </div>
          <button
            onClick={() => dispatch(closeWishlistDrawer())}
            aria-label="Close wishlist"
            className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Items ── */}
        <div className="flex-1 overflow-y-auto py-3">
          {items.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center h-full gap-4 px-8 text-center">
              <div className="w-20 h-20 rounded-2xl bg-rose-50 flex items-center justify-center">
                <Heart size={36} className="text-rose-300" />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-base">No favorites yet</p>
                <p className="text-sm text-gray-400 mt-1">Tap the ♥ on any product to save it here!</p>
              </div>
              <button
                onClick={() => dispatch(closeWishlistDrawer())}
                className="mt-2 px-5 py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-bold rounded-xl shadow-md shadow-rose-200 hover:brightness-105 active:scale-95 transition-all"
              >
                Explore Products
              </button>
            </div>
          ) : (
            <ul className="space-y-2 px-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-3 p-3 rounded-2xl bg-gray-50 hover:bg-rose-50/50 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-white flex-shrink-0 border border-gray-100 relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-contain p-1"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-800 leading-tight line-clamp-2">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-sm font-black text-gray-900">
                        {formatINR(item.price)}
                      </span>
                      <span className="text-[10px] text-gray-400 line-through">
                        {formatINR(item.mrp)}
                      </span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-green-100 text-green-700">
                        {item.discount}% off
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleMoveToCart(item)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold rounded-lg bg-orange-500 text-white hover:bg-orange-600 active:scale-95 transition-all shadow-sm"
                      >
                        <ShoppingCart size={11} />
                        Move to Cart
                      </button>
                      <button
                        onClick={() => dispatch(removeWishlistItemAsync(item.id))}
                        aria-label="Remove from wishlist"
                        className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ── Footer actions ── */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 bg-white px-5 pt-3 pb-4 space-y-3">
            <button
              onClick={() => dispatch(clearWishlistAsync())}
              className="w-full text-[11px] text-gray-400 hover:text-red-500 transition-colors flex items-center justify-center gap-1"
            >
              <Trash2 size={11} /> Clear wishlist
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
