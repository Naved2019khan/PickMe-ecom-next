"use client";

import { useEffect, useRef } from "react";
import { X, ShoppingBag, Plus, Minus, Trash2, Tag, Truck, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  useAppDispatch, useAppSelector,
  selectCartItems, selectCartTotals, selectDrawerOpen, selectIsAuthenticated,
  increment, decrement, removeFromCart, clearCart, closeDrawer, openAuthDrawer
} from "@/store";
import { formatINR } from "@/lib/utils";
import { useRouter } from "next/navigation";

/* ─── Free-delivery threshold ───────────────────────────────────── */
const FREE_THRESHOLD = 499;
const DELIVERY_FEE   = 49;

export default function CartDrawer() {
  const dispatch   = useAppDispatch();
  const router     = useRouter();
  const items      = useAppSelector(selectCartItems);
  const totals     = useAppSelector(selectCartTotals);
  const isOpen     = useAppSelector(selectDrawerOpen);
  const isAuth     = useAppSelector(selectIsAuthenticated);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleCheckoutClick = () => {
    dispatch(closeDrawer());
    if (isAuth) {
      router.push("/checkout");
    } else {
      dispatch(openAuthDrawer("signin"));
    }
  };

  /* Lock body scroll when open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  /* Close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") dispatch(closeDrawer());
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [dispatch]);

  const amountToFree = FREE_THRESHOLD - totals.subtotal;

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        onClick={() => dispatch(closeDrawer())}
        className={[
          "fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      />

      {/* ── Drawer ── */}
      <aside
        aria-label="Shopping cart"
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
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center shadow-md shadow-orange-200">
              <ShoppingBag size={15} className="text-white" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-black text-gray-900">My Cart</p>
              <p className="text-[11px] text-gray-400">
                {items.length === 0
                  ? "No items"
                  : `${items.reduce((a, i) => a + i.quantity, 0)} item${items.reduce((a, i) => a + i.quantity, 0) !== 1 ? "s" : ""}`}
              </p>
            </div>
          </div>
          <button
            onClick={() => dispatch(closeDrawer())}
            aria-label="Close cart"
            className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Free delivery progress ── */}
        {items.length > 0 && (
          <div className="px-5 py-3 bg-orange-50 border-b border-orange-100">
            {amountToFree > 0 ? (
              <div className="space-y-1.5">
                <p className="text-[11px] text-orange-700 font-semibold flex items-center gap-1.5">
                  <Truck size={12} />
                  Add <span className="font-black">{formatINR(amountToFree)}</span> more for FREE delivery
                </p>
                <div className="h-1.5 bg-orange-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-rose-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((totals.subtotal / FREE_THRESHOLD) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-[11px] text-green-700 font-semibold flex items-center gap-1.5">
                <Truck size={12} className="text-green-600" />
                🎉 You get <span className="font-black">FREE delivery!</span>
              </p>
            )}
          </div>
        )}

        {/* ── Items ── */}
        <div className="flex-1 overflow-y-auto py-3">
          {items.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center h-full gap-4 px-8 text-center">
              <div className="w-20 h-20 rounded-2xl bg-orange-50 flex items-center justify-center">
                <ShoppingBag size={36} className="text-orange-300" />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-base">Your cart is empty</p>
                <p className="text-sm text-gray-400 mt-1">Add some products to get started!</p>
              </div>
              <button
                onClick={() => dispatch(closeDrawer())}
                className="mt-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-sm font-bold rounded-xl shadow-md shadow-orange-200 hover:brightness-105 active:scale-95 transition-all"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-2 px-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-3 p-3 rounded-2xl bg-gray-50 hover:bg-orange-50/50 transition-colors"
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

                    {/* Stepper + Remove */}
                    <div className="flex items-center justify-between mt-2">
                      {/* Stepper */}
                      <div className="flex items-center rounded-xl overflow-hidden border border-orange-200 bg-white">
                        <button
                          onClick={() => dispatch(decrement(item.id))}
                          aria-label="Decrease quantity"
                          className="w-7 h-7 flex items-center justify-center text-orange-500 hover:bg-orange-50 transition-colors"
                        >
                          <Minus size={12} strokeWidth={2.5} />
                        </button>
                        <span className="w-7 h-7 flex items-center justify-center text-xs font-black text-gray-800 bg-orange-50">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => dispatch(increment(item.id))}
                          aria-label="Increase quantity"
                          className="w-7 h-7 flex items-center justify-center text-orange-500 hover:bg-orange-50 transition-colors"
                        >
                          <Plus size={12} strokeWidth={2.5} />
                        </button>
                      </div>

                      {/* Line total */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-gray-900">
                          {formatINR(item.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => dispatch(removeFromCart(item.id))}
                          aria-label="Remove item"
                          className="p-1 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ── Order Summary ── */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 bg-white px-5 pt-4 pb-5 space-y-3">

            {/* Clear cart */}
            <button
              onClick={() => dispatch(clearCart())}
              className="w-full text-[11px] text-gray-400 hover:text-red-500 transition-colors flex items-center justify-center gap-1 mb-1"
            >
              <Trash2 size={11} /> Clear all items
            </button>

            {/* Totals */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-700">{formatINR(totals.subtotal)}</span>
              </div>

              {totals.savings > 0 && (
                <div className="flex justify-between text-green-600">
                  <span className="flex items-center gap-1.5">
                    <Tag size={12} /> You save
                  </span>
                  <span className="font-bold">−{formatINR(totals.savings)}</span>
                </div>
              )}

              <div className="flex justify-between text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Truck size={12} /> Delivery
                </span>
                {totals.delivery === 0 ? (
                  <span className="font-semibold text-green-600">FREE</span>
                ) : (
                  <span className="font-semibold text-gray-700">{formatINR(DELIVERY_FEE)}</span>
                )}
              </div>

              <div className="h-px bg-gray-100" />

              <div className="flex justify-between text-base font-black text-gray-900">
                <span>Total</span>
                <span>{formatINR(totals.total)}</span>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleCheckoutClick}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-black text-sm rounded-2xl shadow-lg shadow-orange-200 hover:brightness-105 active:scale-[0.98] transition-all"
            >
              Proceed to Checkout
              <ChevronRight size={16} />
            </button>

            <p className="text-center text-[10px] text-gray-400">
              Free delivery on orders above {formatINR(FREE_THRESHOLD)}
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
