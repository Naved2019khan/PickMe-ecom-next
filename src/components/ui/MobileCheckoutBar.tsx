"use client";

import { useAppSelector, useAppDispatch, selectCartItems, selectCartTotals, selectIsAuthenticated, openAuthDrawer } from "@/store";
import { formatINR } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";
import { ChevronRight, ShoppingBag } from "lucide-react";

export default function MobileCheckoutBar() {
  const items = useAppSelector(selectCartItems);
  const totals = useAppSelector(selectCartTotals);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  if (items.length === 0 || pathname === "/checkout") return null;

  const handleCheckout = () => {
    if (isAuthenticated) {
      router.push("/checkout");
    } else {
      dispatch(openAuthDrawer({ view: "signin", redirectUrl: "/checkout" }));
    }
  };

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 p-4 pb-6 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.1)] z-50">
      <div className="flex items-center justify-between gap-4">
        
        {/* Left: Summary */}
        <div className="flex flex-col justify-center">
          <p className="text-xs font-bold text-gray-500 flex items-center gap-1.5">
            <ShoppingBag size={12} className="text-orange-500" />
            {totalItems} item{totalItems > 1 ? "s" : ""}
          </p>
          <p className="text-lg font-black text-gray-900 leading-none mt-0.5">
            {formatINR(totals.total)}
          </p>
        </div>

        {/* Right: Checkout CTA */}
        <button
          onClick={handleCheckout}
          className="flex-1 max-w-[160px] flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-black text-sm rounded-xl shadow-lg shadow-orange-200 hover:brightness-105 active:scale-95 transition-all"
        >
          Checkout
          <ChevronRight size={16} strokeWidth={3} />
        </button>

      </div>
    </div>
  );
}
