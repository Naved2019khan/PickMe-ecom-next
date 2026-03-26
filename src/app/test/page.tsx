"use client";
import axios from "axios";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default function TestPage() {
  const [product, setProduct] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Ref holds the latest token — always readable inside interceptors
  const tokenRef = useRef(null);

  // Helper: update both ref AND state together
  const setToken = (token) => {
    tokenRef.current = token;
    setIsLoggedIn(!!token);
  };

  // 🧠 REQUEST INTERCEPTOR — reads from ref, not state
  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      if (tokenRef.current) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${tokenRef.current}`;
      }
      return config;
    });

    return () => api.interceptors.request.eject(authInterceptor);
  }, []); // ✅ No dependency needed — ref is always current

  // 🔄 RESPONSE INTERCEPTOR — refresh on 401/403
  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        const isUnauthorized =
          error.response?.status === 401 ||
          (error.response?.status === 403 &&
            error.response?.data?.message === "Unauthorized");

        if (isUnauthorized && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // Refresh endpoint sends httpOnly cookie automatically
            const response = await api.post("/auth/refresh");
            const newToken = response.data.accessToken;

            // ✅ Update ref immediately — retry uses it right away
            setToken(newToken);

            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest); // ✅ Retry with new token
          } catch (err) {
            setToken(null); // Refresh failed — log user out
            return Promise.reject(err);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => api.interceptors.response.eject(refreshInterceptor);
  }, []); // ✅ No dependency needed — ref is always current

  // 🔐 On mount: restore session silently via refresh cookie
  useEffect(() => {
    const initAuth = async () => {
      try {
        const response = await api.post("/auth/refresh");
        setToken(response.data.accessToken);
      } catch {
        setToken(null); // No valid session
      }
    };
    initAuth();
  }, []);

  // 🔐 LOGIN
  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/login", {
        email: "naved2019khan@gmail.com",
        password: "naved_admin",
      });
      setToken(response.data.accessToken);
    } catch {
      setToken(null);
    }
  };

  // 📦 FETCH PRODUCTS
  const handleFetchProducts = async () => {
    try {
      const response = await api.get("/ecom/product");
      setProduct(response.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4">
      <h1>{BASE_URL}</h1>
      <p>Status: {isLoggedIn ? "✅ Logged in" : "❌ Not logged in"}</p>

      <button onClick={handleLogin} className="bg-black text-white p-2">
        Login
      </button>
      <button onClick={handleFetchProducts} className="bg-orange-200 p-2">
        Fetch Products
      </button>

      {product === null && <p>No data yet...</p>}
      {product?.map((value) => (
        <div key={value._id}>{value.name}</div>
      ))}
    </div>
  );
}
// ```


// ## Why This Works — The Key Concepts
// ```
// STATE (token)        ← triggers re-render, but async closures see old snapshot
// REF  (tokenRef)      ← mutates instantly, closures always read the latest value
// ```