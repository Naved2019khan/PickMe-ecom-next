"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store";
import { setLocationDetails } from "@/store/locationSlice";

export default function LocationInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Check if location is already detected (or skip if you want to re-detect every refresh)
    // For now, let's detect on every hard refresh if permission is granted.
    
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
            const data = await res.json();
            
            if (data && data.address) {
              dispatch(setLocationDetails({
                city: data.address.city || data.address.town || data.address.village || "Unknown City",
                state: data.address.state || "",
                country: data.address.country || "",
                pin: data.address.postcode || "",
                lat: latitude,
                lng: longitude
              }));
              console.log("Auto-location detected:", data.address.city);
            }
          } catch (error) {
            console.error("Auto-geocoding failed", error);
          }
        },
        (error) => {
          console.log("Location access denied or failed:", error.message);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }
  }, [dispatch]);

  return null; // This component doesn't render anything
}
