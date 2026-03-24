"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatINR } from "@/lib/utils";
import { fetchUserOrders } from "@/lib/api/orders";
import type { PastOrder } from "@/lib/api/orders";
import { useAppSelector, useAppDispatch, selectIsAuthenticated, openAuthDrawer } from "@/store";
import { AlertCircle, Package, Clock, CheckCircle2, XCircle, Truck, ChevronRight } from "lucide-react";

const STATUS_CONFIG = {
  Processing: { color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-200", icon: Clock },
  Shipped:    { color: "text-blue-500",  bg: "bg-blue-50",  border: "border-blue-200",  icon: Truck },
  Delivered:  { color: "text-green-500", bg: "bg-green-50", border: "border-green-200", icon: CheckCircle2 },
  Cancelled:  { color: "text-red-500",   bg: "bg-red-50",   border: "border-red-200",   icon: XCircle },
};

export default function OrdersPage() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  
  const [orders, setOrders] = useState<PastOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true);
      fetchUserOrders().then(data => {
        setOrders(data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // ── UNATHENTICATED STATE ── //
  if (!isAuthenticated && !loading) {
    return (
      <main className="container-main min-h-[70vh] flex flex-col items-center justify-center py-12 px-4">
        <div className="bg-white border border-gray-100 p-8 sm:p-12 rounded-[40px] shadow-2xl flex flex-col items-center max-w-md w-full text-center">
          <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-6">
            <Package size={32} className="text-orange-500" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">Track Your Orders</h1>
          <p className="text-gray-500 font-medium text-sm mb-8">
            Please log in to view your past purchases, track active deliveries, and manage your account.
          </p>
          <button
            onClick={() => dispatch(openAuthDrawer({ view: "signin" }))}
            className="w-full bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-200 active:scale-95 transition-all"
          >
            Sign In to Continue
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="container-main py-8 sm:py-12 min-h-[80vh]">
      <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-8 tracking-tight">My Orders</h1>

      {loading ? (
        <div className="flex flex-col gap-4">
          {[1,2,3].map(i => (
            <div key={i} className="w-full h-48 bg-gray-100 animate-pulse rounded-3xl" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-[32px] border border-gray-100 dashed text-center">
          <Package size={40} className="text-gray-300 mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">No orders found</h2>
          <p className="text-gray-500 max-w-sm mb-6">Looks like you haven't placed any orders yet.</p>
          <Link href="/" className="px-6 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-colors">Start Shopping</Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => {
            const config = STATUS_CONFIG[order.status];
            const StatusIcon = config.icon;

            return (
              <div key={order.id} className="bg-white border text-left border-gray-100 rounded-3xl overflow-hidden hover:border-gray-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all flex flex-col sm:flex-row">
                
                {/* Image & Items Summary Left Side */}
                <div className="bg-gray-50/50 p-5 sm:p-6 sm:w-1/3 flex flex-col justify-center border-b sm:border-b-0 sm:border-r border-gray-100">
                  <div className="flex -space-x-3 mb-4">
                    {order.items.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="w-14 h-14 rounded-xl bg-white border-2 border-white shadow-sm overflow-hidden relative flex-shrink-0 z-10" style={{ zIndex: 3 - idx }}>
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="w-14 h-14 rounded-xl bg-gray-100 border-2 border-white shadow-sm flex items-center justify-center z-0">
                        <span className="text-xs font-bold text-gray-500">+{order.items.length - 3}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm font-bold text-gray-800 line-clamp-2">
                    {order.items.map(i => i.name).join(", ")}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{order.items.length} {order.items.length === 1 ? 'Item' : 'Items'}</p>
                </div>

                {/* Status & Action Right Side */}
                <div className="p-5 sm:p-6 sm:flex-1 flex flex-col justify-between">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                    <div>
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${config.bg} ${config.border} ${config.color} text-xs font-bold uppercase tracking-wider mb-3`}>
                        <StatusIcon size={12} strokeWidth={3} />
                        {order.status}
                      </div>
                      <h3 className="text-lg font-black text-gray-900">{formatINR(order.total)}</h3>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Order Placed</p>
                      <p className="text-sm font-bold text-gray-800">{order.date}</p>
                      <p className="text-xs font-semibold text-gray-500 mt-1">ID: {order.id}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 mt-auto">
                    <button className="flex-1 sm:flex-none py-2.5 px-5 bg-gray-900 hover:bg-black text-white text-sm font-bold rounded-xl transition-colors active:scale-95 text-center">
                      {order.status === "Delivered" ? "Buy Again" : order.status === "Cancelled" ? "Reorder" : "Track Package"}
                    </button>
                    <button className="flex-1 sm:flex-none py-2.5 px-5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-bold rounded-xl transition-colors active:scale-95 text-center flex items-center justify-center gap-1">
                      View Details <ChevronRight size={14} />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
