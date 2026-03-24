"use client";

import Link from "next/link";
import { Player } from "@lottiefiles/react-lottie-player";
import { RefreshCcw } from "lucide-react";

export default function CheckoutFailurePage() {
  return (
    <main className="container-main min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 relative overflow-hidden">

      {/* Background aesthetics */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <div className="w-[500px] h-[500px] bg-red-200/50 blur-[100px] rounded-full absolute top-[10%]" />
      </div>

      <div className="bg-white/80 backdrop-blur-2xl border border-white/50 p-8 sm:p-12 rounded-[40px] shadow-2xl shadow-red-900/10 flex flex-col items-center max-w-lg w-full relative z-10 animate-slide-up text-center">

        <div className="w-40 h-40 mb-2 flex items-center justify-center overflow-hidden">
          <Player
            autoplay
            keepLastFrame
            src="https://fonts.gstatic.com/s/e/notoemoji/latest/274c/lottie.json"
            style={{ height: "120%", width: "120%" }}
          />
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3 tracking-tight">Payment Failed</h1>
        <p className="text-gray-500 font-medium text-base mb-8 max-w-sm">
          Unfortunately, we couldn't process your payment. This might be due to a network glitch or a declined card. Your cart has been saved.
        </p>

        <Link
          href="/checkout"
          className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-rose-600 hover:brightness-105 text-white font-black px-10 py-4 rounded-2xl shadow-xl shadow-red-200 active:scale-95 transition-all w-full justify-center group"
        >
          <RefreshCcw size={18} className="group-hover:-rotate-90 transition-transform duration-500" />
          Try Again
        </Link>

        <Link href="/" className="mt-5 text-sm font-bold text-gray-400 hover:text-gray-600 underline underline-offset-4 decoration-2 decoration-gray-200 hover:decoration-gray-300 transition-colors">
          Return to secure home page
        </Link>
      </div>

    </main>
  );
}
