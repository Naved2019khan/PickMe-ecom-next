"use client";

import { useEffect, useRef, useState, FormEvent, useCallback } from "react";
import { X, MapPin, Navigation, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import {
  useAppDispatch, useAppSelector,
  selectIsLocationDrawerOpen, selectLocationDetails,
  closeLocationDrawer, setLocationDetails
} from "@/store";

const MapSelector = dynamic(() => import("./MapSelector"), { ssr: false, loading: () => <div className="w-full h-[200px] rounded-2xl bg-gray-100 animate-pulse flex items-center justify-center text-gray-400 font-semibold text-sm">Loading Map...</div> });

export default function LocationDrawer() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsLocationDrawerOpen);
  const location = useAppSelector(selectLocationDetails);
  
  const [city, setCity] = useState(location.city);
  const [stateName, setStateName] = useState(location.state);
  const [country, setCountry] = useState(location.country);
  const [pin, setPin] = useState(location.pin);
  const [lat, setLat] = useState<number>(location.lat || 12.9716);
  const [lng, setLng] = useState<number>(location.lng || 77.5946);
  
  const [loadingGeo, setLoadingGeo] = useState(false);
  
  // Sync when opened
  useEffect(() => {
    if (isOpen) {
      setCity(location.city);
      setStateName(location.state);
      setCountry(location.country);
      setPin(location.pin);
      if (location.lat) setLat(location.lat);
      if (location.lng) setLng(location.lng);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen, location]);

  const fetchAddressFromCoords = async (latitude: number, longitude: number) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
      const data = await res.json();
      if (data && data.address) {
        setCity(data.address.city || data.address.town || data.address.village || "");
        setStateName(data.address.state || "");
        setCountry(data.address.country || "");
        setPin(data.address.postcode || "");
      }
    } catch (error) {
      console.error("Geocoding failed", error);
    }
  };

  const handleMapChange = useCallback((newLat: number, newLng: number) => {
    setLat(newLat);
    setLng(newLng);
    fetchAddressFromCoords(newLat, newLng);
  }, []);

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setLoadingGeo(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLat(latitude);
        setLng(longitude);
        fetchAddressFromCoords(latitude, longitude).finally(() => setLoadingGeo(false));
      },
      () => {
        alert("Unable to retrieve your location");
        setLoadingGeo(false);
      }
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setLocationDetails({ city, state: stateName, country, pin, lat, lng }));
    dispatch(closeLocationDrawer());
  };

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={() => dispatch(closeLocationDrawer())}
        className={[
          "fixed inset-0 bg-black/50 backdrop-blur-sm z-[80] transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      />

      {/* Drawer */}
      <aside
        className={[
          "fixed top-0 left-0 h-full w-full sm:w-[440px] bg-white z-[90] flex flex-col shadow-2xl transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100/80 sticky top-0 bg-white/90 backdrop-blur-md z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center shadow-lg shadow-orange-200">
              <MapPin size={18} className="text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-lg font-black text-gray-900 leading-tight">Delivery Location</h2>
              <p className="text-xs font-semibold text-gray-400">Where should we send your order?</p>
            </div>
          </div>
          <button
            onClick={() => dispatch(closeLocationDrawer())}
            className="p-2.5 rounded-2xl bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {/* Map Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Pin Location</label>
              <button 
                type="button" 
                onClick={handleDetectLocation}
                disabled={loadingGeo}
                className="flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-full transition-colors disabled:opacity-50"
              >
                {loadingGeo ? <Loader2 size={14} className="animate-spin" /> : <Navigation size={14} />}
                {loadingGeo ? "Detecting..." : "Detect Me"}
              </button>
            </div>
            
            <div className="h-[220px] w-full rounded-2xl overflow-hidden shadow-inner border border-gray-100">
              {isOpen && <MapSelector lat={lat} lng={lng} onChange={handleMapChange} />}
            </div>
          </div>

          <form id="location-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Address line removed per user request */}
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">City</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-sm font-semibold text-gray-900"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Pin Code</label>
                <input
                  type="text"
                  required
                  value={pin}
                  onChange={e => setPin(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-sm font-semibold text-gray-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">State</label>
                <input
                  type="text"
                  required
                  value={stateName}
                  onChange={e => setStateName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-sm font-semibold text-gray-900"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Country</label>
                <input
                  type="text"
                  required
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-sm font-semibold text-gray-900"
                />
              </div>
            </div>
          </form>
        </div>

        <div className="p-5 border-t border-gray-100 bg-white">
          <button
            type="submit"
            form="location-form"
            className="w-full flex items-center justify-center py-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-black text-[15px] rounded-2xl shadow-xl shadow-orange-200 hover:brightness-105 active:scale-[0.98] transition-all"
          >
            Confirm Location
          </button>
        </div>
      </aside>
    </>
  );
}
