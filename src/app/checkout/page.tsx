"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppSelector, selectCartItems, selectCartTotals } from "@/store";
import { formatINR } from "@/lib/utils";
import { MapPin, CreditCard, CheckCircle2, ShoppingBag, Truck, Tag } from "lucide-react";

/* ── MOCK DATA ── */
const ADDRESSES = [
  {
    id: "addr1",
    name: "Ajitesh Kumar",
    type: "Home",
    address: "Block B, Tech Park Road, Koramangala, Bangalore 560034",
    phone: "+91 98765 43210",
  },
  {
    id: "addr2",
    name: "Ajitesh Kumar",
    type: "Work",
    address: "9th Floor, Horizon Tower, Whitefield, Bangalore 560066",
    phone: "+91 98765 43210",
  },
];

const PAYMENTS = [
  { id: "upi",  name: "UPI", desc: "Google Pay, PhonePe, Paytm" },
  { id: "card", name: "Credit / Debit Card", desc: "Visa, Mastercard, RuPay" },
  { id: "cod",  name: "Cash on Delivery", desc: "Pay at your doorstep" },
];

export default function CheckoutPage() {
  const items  = useAppSelector(selectCartItems);
  const totals = useAppSelector(selectCartTotals);

  const [step, setStep]           = useState<"address" | "payment" | "confirm">("address");
  const [selectedAddr, setAddr]   = useState(ADDRESSES[0].id);
  const [selectedPay, setPay]     = useState(PAYMENTS[0].id);

  if (items.length === 0) {
    return (
      <main className="container-main py-12 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-24 h-24 rounded-full bg-orange-50 flex items-center justify-center mb-6 shadow-inner">
          <ShoppingBag size={40} className="text-orange-300" />
        </div>
        <h1 className="text-2xl font-black text-gray-900 mb-2">Cart is empty</h1>
        <p className="text-gray-500 mb-8 max-w-sm text-center">Looks like you haven't added anything to your cart yet.</p>
        <Link
          href="/"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-full shadow-lg shadow-orange-200 transition-transform active:scale-95"
        >
          Return to Shop
        </Link>
      </main>
    );
  }

  const isAddressDone = step === "payment" || step === "confirm";
  const isPaymentDone = step === "confirm";

  return (
    <main className="container-main py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-8 tracking-tight">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
        
        {/* ── LEFT: Stepper ── */}
        <div className="lg:w-2/3 flex flex-col gap-5">
          
          {/* STEP 1: ADDRESS */}
          <div className={`rounded-3xl border ${step === "address" ? "border-orange-200 shadow-[0_12px_24px_-8px_rgba(249,115,22,0.15)] ring-1 ring-orange-100" : "border-gray-100 bg-gray-50/50"} overflow-hidden transition-all duration-300`}>
            {/* Header */}
            <div 
              className={`px-6 py-5 flex items-center justify-between cursor-pointer ${step !== "address" ? "hover:bg-gray-50" : "bg-white"}`}
              onClick={() => step !== "address" && setStep("address")}
            >
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step === "address" ? "bg-orange-500 text-white" : isAddressDone ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}`}>
                  {isAddressDone ? <CheckCircle2 size={16} /> : "1"}
                </div>
                <div>
                  <h2 className={`font-bold ${step === "address" ? "text-gray-900" : "text-gray-600"}`}>Delivery Address</h2>
                  {isAddressDone && <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{ADDRESSES.find(a => a.id === selectedAddr)?.address}</p>}
                </div>
              </div>
              {isAddressDone && <span className="text-sm font-semibold text-orange-500">Edit</span>}
            </div>

            {/* Content */}
            {step === "address" && (
              <div className="px-6 pb-6 pt-2 bg-white flex flex-col gap-4 animate-in slide-in-from-top-4 fade-in duration-300">
                <div className="grid sm:grid-cols-2 gap-4">
                  {ADDRESSES.map((addr) => (
                    <label
                      key={addr.id}
                      className={`relative flex gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        selectedAddr === addr.id 
                          ? "border-orange-500 bg-orange-50/30" 
                          : "border-gray-100 hover:border-gray-200 bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="address"
                        className="mt-1 flex-shrink-0 w-4 h-4 text-orange-500 accent-orange-500 cursor-pointer"
                        checked={selectedAddr === addr.id}
                        onChange={() => setAddr(addr.id)}
                      />
                      <div className="flex flex-col gap-1.5 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900">{addr.name}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 tracking-wide uppercase">{addr.type}</span>
                        </div>
                        <p className="text-sm text-gray-600 leading-snug">{addr.address}</p>
                        <p className="text-sm font-medium text-gray-900 mt-1">{addr.phone}</p>
                      </div>
                    </label>
                  ))}
                </div>
                
                <button
                  onClick={() => setStep("payment")}
                  className="mt-4 self-start bg-gray-900 hover:bg-black text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-gray-200 active:scale-95 transition-all w-full sm:w-auto"
                >
                  Deliver Here
                </button>
              </div>
            )}
          </div>

          {/* STEP 2: PAYMENT */}
          <div className={`rounded-3xl border ${step === "payment" ? "border-orange-200 shadow-[0_12px_24px_-8px_rgba(249,115,22,0.15)] ring-1 ring-orange-100" : "border-gray-100 bg-gray-50/50"} overflow-hidden transition-all duration-300`}>
            {/* Header */}
            <div 
              className={`px-6 py-5 flex items-center justify-between cursor-pointer ${step !== "payment" && isAddressDone ? "hover:bg-gray-50" : "bg-white"}`}
              onClick={() => isAddressDone && step !== "payment" && setStep("payment")}
            >
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step === "payment" ? "bg-orange-500 text-white" : isPaymentDone ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}`}>
                  {isPaymentDone ? <CheckCircle2 size={16} /> : "2"}
                </div>
                <div>
                  <h2 className={`font-bold ${step === "payment" ? "text-gray-900" : "text-gray-600"}`}>Payment Method</h2>
                  {isPaymentDone && <p className="text-sm text-gray-500 mt-0.5">{PAYMENTS.find(p => p.id === selectedPay)?.name}</p>}
                </div>
              </div>
              {isPaymentDone && <span className="text-sm font-semibold text-orange-500">Edit</span>}
            </div>

            {/* Content */}
            {step === "payment" && (
              <div className="px-6 pb-6 pt-2 bg-white flex flex-col gap-3 animate-in slide-in-from-top-4 fade-in duration-300">
                {PAYMENTS.map((pay) => (
                  <label
                    key={pay.id}
                    className={`relative flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      selectedPay === pay.id 
                        ? "border-orange-500 bg-orange-50/30" 
                        : "border-gray-100 hover:border-gray-200 bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      className="flex-shrink-0 w-4 h-4 text-orange-500 accent-orange-500 cursor-pointer"
                      checked={selectedPay === pay.id}
                      onChange={() => setPay(pay.id)}
                    />
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedPay === pay.id ? "bg-orange-100 text-orange-600" : "bg-gray-100 text-gray-500"}`}>
                        <CreditCard size={18} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900">{pay.name}</span>
                        <span className="text-xs text-gray-500">{pay.desc}</span>
                      </div>
                    </div>
                  </label>
                ))}
                
                <button
                  onClick={() => setStep("confirm")}
                  className="mt-5 self-start bg-gray-900 hover:bg-black text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-gray-200 active:scale-95 transition-all w-full sm:w-auto"
                >
                  Use this payment method
                </button>
              </div>
            )}
          </div>

          {/* STEP 3: CONFIRM */}
          <div className={`rounded-3xl border ${step === "confirm" ? "border-green-200 bg-green-50/30 shadow-[0_12px_24px_-8px_rgba(34,197,94,0.15)] ring-1 ring-green-100" : "border-gray-100 bg-gray-50/50"} overflow-hidden transition-all duration-300`}>
            <div className="px-6 py-5 flex items-center gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === "confirm" ? "bg-green-500 text-white shadow-lg shadow-green-200" : "bg-gray-200 text-gray-500"}`}>
                3
              </div>
              <h2 className={`font-bold ${step === "confirm" ? "text-green-800" : "text-gray-600"}`}>Review & Place Order</h2>
            </div>
            {step === "confirm" && (
               <div className="px-6 pb-6 pt-2 animate-in fade-in duration-300">
                  <p className="text-sm text-green-700 font-medium mb-4">Everything looks good! Review your order summary on the right and place your order.</p>
                  <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 hover:brightness-105 text-white py-3.5 px-8 rounded-xl font-black text-[15px] transition-all duration-200 active:scale-95 shadow-[0_8px_24px_rgba(239,68,68,0.35)]">
                    Place Order — {formatINR(totals.total)}
                  </button>
               </div>
            )}
          </div>

        </div>


        {/* ── RIGHT: Order Summary ── */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sticky top-24 overflow-hidden">
            <div className="px-5 py-4 bg-gray-50/50 border-b border-gray-100">
              <h2 className="font-bold text-gray-900 text-lg">Order Summary</h2>
              <p className="text-xs text-gray-500 mt-0.5">{items.length} items in cart</p>
            </div>

            {/* Items list compact */}
            <div className="px-5 py-3 border-b border-gray-100 max-h-[300px] overflow-y-auto space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 flex-shrink-0 relative">
                     <Image src={item.image} alt={item.name} fill className="object-contain p-1" sizes="48px" />
                     <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gray-800 text-white rounded-full flex items-center justify-center text-[9px] font-bold shadow-sm ring-2 ring-white">
                        {item.quantity}
                     </span>
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <p className="text-xs font-bold text-gray-800 line-clamp-1">{item.name}</p>
                    <p className="text-sm font-black text-gray-900 mt-0.5">{formatINR(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals breakdown */}
            <div className="px-5 py-4 space-y-3 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="font-medium text-gray-800">{formatINR(totals.subtotal)}</span>
              </div>
              {totals.savings > 0 && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Tag size={13} /> Savings
                  </span>
                  <span>−{formatINR(totals.savings)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-500 border-b border-dashed border-gray-200 pb-3">
                <span className="flex items-center gap-1.5">
                  <Truck size={13} /> Delivery
                </span>
                {totals.delivery === 0 ? (
                  <span className="font-bold text-green-600">FREE</span>
                ) : (
                  <span className="font-medium text-gray-800">{formatINR(totals.delivery)}</span>
                )}
              </div>
              <div className="flex justify-between items-end pt-1">
                <div className="flex flex-col">
                   <span className="text-base font-black text-gray-900 leading-none">Grand Total</span>
                   <span className="text-[10px] text-gray-400 mt-1">Inclusive of all taxes</span>
                </div>
                <span className="text-xl font-black text-orange-500">{formatINR(totals.total)}</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
