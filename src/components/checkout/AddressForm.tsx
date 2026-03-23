"use client";

import { useState, useEffect, useCallback } from "react";
import {
  User, Phone, MapPin, Home, Briefcase, MoreHorizontal,
  Loader2, CheckCircle2, X,
} from "lucide-react";
import { lookupPincode } from "@/lib/api/pincode";
import type { Address } from "@/store";

/* ─── Props ──────────────────────────────────────────────────────── */
interface AddressFormProps {
  initial?: Address;            // undefined = add mode, defined = edit mode
  onSave:   (data: Omit<Address, "id"> & { id?: string }) => void;
  onCancel: () => void;
}

const ADDRESS_TYPES: Address["type"][] = ["Home", "Work", "Other"];
const TYPE_ICONS = { Home: Home, Work: Briefcase, Other: MoreHorizontal };

/* ─── Component ──────────────────────────────────────────────────── */
export default function AddressForm({ initial, onSave, onCancel }: AddressFormProps) {
  const [name, setName]       = useState(initial?.name     ?? "");
  const [phone, setPhone]     = useState(initial?.phone    ?? "");
  const [pincode, setPincode] = useState(initial?.pincode  ?? "");
  const [line, setLine]       = useState(initial?.line     ?? "");
  const [city, setCity]       = useState(initial?.city     ?? "");
  const [state, setState]     = useState(initial?.state    ?? "");
  const [type, setType]       = useState<Address["type"]>(initial?.type ?? "Home");

  const [pinLoading, setPinLoading] = useState(false);
  const [pinSuccess, setPinSuccess] = useState(false);
  const [errors, setErrors]        = useState<Record<string, string>>({});

  /* ── Pincode lookup when 6 digits entered ── */
  const fetchPincode = useCallback(async (pin: string) => {
    if (!/^\d{6}$/.test(pin)) return;
    setPinLoading(true);
    setPinSuccess(false);
    const result = await lookupPincode(pin);
    setPinLoading(false);
    if (result) {
      setCity(result.city);
      setState(result.state);
      setPinSuccess(true);
      setErrors((prev) => {
        const { pincode: _p, city: _c, state: _s, ...rest } = prev;
        return rest;
      });
    }
  }, []);

  useEffect(() => {
    if (pincode.length === 6) {
      fetchPincode(pincode);
    } else {
      setPinSuccess(false);
    }
  }, [pincode, fetchPincode]);

  /* ── Validation ── */
  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    if (!name.trim())                          newErrors.name    = "Name is required";
    if (!/^\+?\d[\d\s-]{8,14}$/.test(phone))  newErrors.phone   = "Valid phone required";
    if (!/^\d{6}$/.test(pincode))              newErrors.pincode = "6-digit pincode required";
    if (!line.trim())                          newErrors.line    = "Address is required";
    if (!city.trim())                          newErrors.city    = "City is required";
    if (!state.trim())                         newErrors.state   = "State is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    onSave({
      ...(initial?.id ? { id: initial.id } : {}),
      name: name.trim(),
      phone: phone.trim(),
      pincode: pincode.trim(),
      line: line.trim(),
      city: city.trim(),
      state: state.trim(),
      type,
    });
  }

  /* ── Shared input classes ── */
  const inputBase =
    "w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 focus:bg-white text-sm font-semibold text-gray-900 transition-all outline-none placeholder:text-gray-400 placeholder:font-normal";
  const errorInput = "border-red-300 focus:border-red-400 focus:ring-red-100";

  return (
    <div className="animate-in slide-in-from-top-4 fade-in duration-300">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-black text-gray-900">
          {initial ? "Edit Address" : "Add New Address"}
        </h3>
        <button
          onClick={onCancel}
          className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Cancel"
        >
          <X size={18} />
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">
            Full Name *
          </label>
          <div className="relative">
            <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Naved Khan"
              className={`${inputBase} ${errors.name ? errorInput : ""}`}
            />
          </div>
          {errors.name && <p className="text-xs text-red-500 font-medium ml-1">{errors.name}</p>}
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">
            Phone Number *
          </label>
          <div className="relative">
            <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className={`${inputBase} ${errors.phone ? errorInput : ""}`}
            />
          </div>
          {errors.phone && <p className="text-xs text-red-500 font-medium ml-1">{errors.phone}</p>}
        </div>

        {/* Pincode */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">
            Pincode *
          </label>
          <div className="relative">
            <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              maxLength={6}
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
              placeholder="201310"
              className={`${inputBase} ${errors.pincode ? errorInput : ""}`}
            />
            {pinLoading && (
              <Loader2 size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-orange-500 animate-spin" />
            )}
            {pinSuccess && !pinLoading && (
              <CheckCircle2 size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-green-500" />
            )}
          </div>
          {errors.pincode && <p className="text-xs text-red-500 font-medium ml-1">{errors.pincode}</p>}
        </div>

        {/* Address Line — full width */}
        <div className="space-y-1 sm:col-span-2">
          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">
            Address (House No, Street, Landmark) *
          </label>
          <div className="relative">
            <Home size={15} className="absolute left-3.5 top-3.5 text-gray-400" />
            <textarea
              rows={2}
              value={line}
              onChange={(e) => setLine(e.target.value)}
              placeholder="Block B, Tech Park Road, Near Metro Station"
              className={`${inputBase} resize-none !py-3 ${errors.line ? errorInput : ""}`}
            />
          </div>
          {errors.line && <p className="text-xs text-red-500 font-medium ml-1">{errors.line}</p>}
        </div>

        {/* City */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">
            City *
            {pinSuccess && <span className="text-green-600 normal-case ml-1">— auto-filled</span>}
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            className={`w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 focus:bg-white text-sm font-semibold text-gray-900 transition-all outline-none placeholder:text-gray-400 placeholder:font-normal ${
              pinSuccess ? "bg-green-50/50 border-green-200" : ""
            } ${errors.city ? errorInput : ""}`}
          />
          {errors.city && <p className="text-xs text-red-500 font-medium ml-1">{errors.city}</p>}
        </div>

        {/* State */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">
            State *
            {pinSuccess && <span className="text-green-600 normal-case ml-1">— auto-filled</span>}
          </label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="State"
            className={`w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 focus:bg-white text-sm font-semibold text-gray-900 transition-all outline-none placeholder:text-gray-400 placeholder:font-normal ${
              pinSuccess ? "bg-green-50/50 border-green-200" : ""
            } ${errors.state ? errorInput : ""}`}
          />
          {errors.state && <p className="text-xs text-red-500 font-medium ml-1">{errors.state}</p>}
        </div>

        {/* Address Type */}
        <div className="space-y-2 sm:col-span-2">
          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">
            Address Type
          </label>
          <div className="flex gap-3">
            {ADDRESS_TYPES.map((t) => {
              const Icon = TYPE_ICONS[t];
              const active = type === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${
                    active
                      ? "border-orange-500 bg-orange-50 text-orange-600"
                      : "border-gray-100 bg-white text-gray-500 hover:border-gray-200"
                  }`}
                >
                  <Icon size={14} />
                  {t}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-6 pt-5 border-t border-gray-100">
        <button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-orange-500 to-rose-500 hover:brightness-105 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-orange-200 active:scale-95 transition-all text-sm"
        >
          {initial ? "Update Address" : "Save Address"}
        </button>
        <button
          onClick={onCancel}
          className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
