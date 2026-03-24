"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Player } from "@lottiefiles/react-lottie-player";
import { Package, Calendar, ArrowRight } from "lucide-react";

export default function CheckoutSuccessPage() {
  const [orderDetails, setOrderDetails] = useState({ id: "", amount: 0, date: "" });

  useEffect(() => {
    const id = "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();

    // Future date format for delivery computation
    const d = new Date();
    d.setDate(d.getDate() + 3);
    const dateStr = d.toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' });

    setOrderDetails({ id, amount: 2499, date: dateStr });
  }, []);

  return (
    <main className="min-h-[85vh] flex flex-col items-center justify-center py-12 px-4 bg-gray-50/50 relative overflow-hidden">

      {/* Premium Theme Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <div className="w-[600px] h-[600px] bg-gradient-to-r from-orange-300 to-rose-300 blur-[130px] rounded-full absolute -top-10" />
      </div>

      {/* The Celebration Popup Card */}
      <div className="bg-white border border-orange-100 p-8 sm:p-10 rounded-[40px] shadow-[0_20px_60px_-15px_rgba(249,115,22,0.15)] flex flex-col items-center max-w-sm w-full relative z-10 animate-scale-up text-center">

        {/* Confetti / Success Lottie - Smaller & Themed */}
        <div className="w-24 h-24 mb-4 relative flex items-center justify-center">
          <div className="absolute inset-0 bg-orange-100 rounded-full scale-75 blur-2xl"></div>
          <Player
            autoplay
            keepLastFrame
            src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f389/lottie.json" // Party Popper 🎉
            style={{ height: "130%", width: "130%" }}
          />
        </div>

        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500 mb-2 tracking-tight">
          Order Placed!
        </h1>
        <p className="text-gray-500 font-medium text-sm mb-8 leading-snug">
          Your order has been confirmed securely and is already being prepared.
        </p>

        {/* Order Details Receipt Box */}
        <div className="w-full bg-gray-50/80 border border-gray-100 rounded-[28px] p-5 mb-8 text-left space-y-4 shadow-inner">
          <div className="flex justify-between items-center border-b border-gray-200/60 pb-3">
            <div className="flex items-center gap-2 text-gray-500">
              <Package size={15} className="text-orange-500" />
              <span className="text-xs font-bold uppercase tracking-wider">Order ID</span>
            </div>
            <span className="text-sm font-black text-gray-900">{orderDetails.id || "..."}</span>
          </div>

          <div className="flex justify-between items-center border-b border-gray-200/60 pb-3">
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar size={15} className="text-rose-500" />
              <span className="text-xs font-bold uppercase tracking-wider">Arrival</span>
            </div>
            <span className="text-sm font-black text-gray-900">{orderDetails.date || "..."}</span>
          </div>

          <div className="flex justify-between items-end pt-1">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Paid</span>
            <span className="text-xl font-black text-orange-500 tracking-tight">₹{orderDetails.amount.toLocaleString("en-IN")}</span>
          </div>
        </div>

        {/* CTAs */}
        <Link
          href="/"
          className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 hover:brightness-105 text-white font-black px-10 py-4 rounded-2xl shadow-xl shadow-orange-200 active:scale-95 transition-all w-full justify-center group"
        >
          View My Orders
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link href="/" className="mt-5 text-[13px] font-bold text-gray-400 hover:text-orange-500 underline underline-offset-4 decoration-2 decoration-gray-200 hover:decoration-orange-200 transition-colors">
          Continue Shopping
        </Link>

      </div>

    </main>
  );
}
