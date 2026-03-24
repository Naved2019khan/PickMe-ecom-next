"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import { X, User as UserIcon, Mail, Phone, Lock, ChevronRight, CheckCircle2, Package } from "lucide-react";
import {
  useAppDispatch, useAppSelector,
  selectIsAuthDrawerOpen, selectAuthView, selectIsAuthenticated, selectUser, selectRedirectUrl,
  closeAuthDrawer, setAuthView, setUser, logout, closeDrawer as closeCartDrawer
} from "@/store";
import { loginApi, signupApi } from "@/lib/api/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AuthDrawer() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isOpen = useAppSelector(selectIsAuthDrawerOpen);
  const view = useAppSelector(selectAuthView);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  const redirectUrl = useAppSelector(selectRedirectUrl);

  const overlayRef = useRef<HTMLDivElement>(null);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Reset state on open/close
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setError("");
        setLoading(false);
      }, 300); // Wait for transition
    } else {
      document.body.style.overflow = "hidden";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Handle Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") dispatch(closeAuthDrawer());
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [dispatch]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let loggedInUser;
      if (view === "signin") {
        loggedInUser = await loginApi(email, password);
      } else {
        loggedInUser = await signupApi(name, email, phone, password);
      }
      
      dispatch(setUser(loggedInUser));
      dispatch(closeAuthDrawer());
      
      if (redirectUrl) {
        router.push(redirectUrl);
      }

    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const toggleView = () => {
    dispatch(setAuthView(view === "signin" ? "signup" : "signin"));
    setError("");
    setPassword("");
  };

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        onClick={() => dispatch(closeAuthDrawer())}
        className={[
          "fixed inset-0 bg-black/50 backdrop-blur-sm z-[80] transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      />

      {/* ── Drawer ── */}
      <aside
        aria-label="Authentication"
        role="dialog"
        aria-modal="true"
        className={[
          "fixed top-0 right-0 h-full w-full sm:w-[440px] bg-white z-[90]",
          "flex flex-col shadow-2xl transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100/80 bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center shadow-lg shadow-orange-200/50">
              <UserIcon size={18} className="text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-lg font-black text-gray-900 leading-tight">
                {isAuthenticated ? "My Account" : (view === "signin" ? "Welcome Back" : "Create Account")}
              </h2>
              <p className="text-xs font-semibold text-gray-400">
                {isAuthenticated ? "Manage your profile" : "Quick and secure checkout"}
              </p>
            </div>
          </div>
          <button
            onClick={() => dispatch(closeAuthDrawer())}
            aria-label="Close"
            className="p-2.5 rounded-2xl bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 pb-20">
          
          {isAuthenticated && user ? (
             <div className="flex flex-col items-center justify-center py-10 gap-5 text-center fade-in animate-in duration-500">
                <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center border-4 border-white shadow-xl shadow-gray-200 ring-1 ring-green-100 relative">
                   <div className="absolute top-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center text-white">
                      <CheckCircle2 size={12} strokeWidth={3} />
                   </div>
                   <UserIcon size={40} className="text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900">{user.name}</h3>
                  <p className="text-sm font-medium text-gray-500 mt-1">{user.email}</p>
                  <p className="text-xs font-bold text-gray-400 mt-0.5 bg-gray-100 px-3 py-1 rounded-full inline-block tracking-wide uppercase">Logged In</p>
                </div>
                
                <div className="w-full h-px bg-gray-100 my-2" />
                
                <div className="w-full flex flex-col gap-2">
                  <button
                    onClick={() => {
                      router.push("/orders");
                      dispatch(closeAuthDrawer());
                    }}
                    className="w-full flex items-center justify-between px-5 py-4 bg-orange-50 hover:bg-orange-100 text-orange-600 font-bold text-sm rounded-2xl transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Package size={18} />
                      My Orders
                    </div>
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => dispatch(logout())}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-gray-50 hover:bg-red-50 text-gray-600 hover:text-red-500 font-bold text-sm rounded-2xl transition-all"
                  >
                    Sign Out
                  </button>
                </div>
             </div>
          ) : (
             <form onSubmit={handleSubmit} className="flex flex-col gap-4 fade-in animate-in duration-300">
               
               {error && (
                 <div className="p-3.5 rounded-2xl bg-red-50 border border-red-100 text-sm font-semibold text-red-600 flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                   {error}
                 </div>
               )}

               {view === "signup" && (
                 <>
                   <div className="space-y-1">
                     <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                     <div className="relative">
                       <UserIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                       <input
                         type="text"
                         required
                         value={name}
                         onChange={e => setName(e.target.value)}
                         placeholder="John Doe"
                         className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-100 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:bg-white text-sm font-semibold text-gray-900 transition-all outline-none"
                       />
                     </div>
                   </div>

                   <div className="space-y-1">
                     <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Phone Number</label>
                     <div className="relative">
                       <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                       <input
                         type="tel"
                         required
                         value={phone}
                         onChange={e => setPhone(e.target.value)}
                         placeholder="+91 98765 43210"
                         className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-100 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:bg-white text-sm font-semibold text-gray-900 transition-all outline-none"
                       />
                     </div>
                   </div>
                 </>
               )}

               <div className="space-y-1">
                 <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                 <div className="relative">
                   <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                   <input
                     type="email"
                     required
                     value={email}
                     onChange={e => setEmail(e.target.value)}
                     placeholder="you@example.com"
                     className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-100 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:bg-white text-sm font-semibold text-gray-900 transition-all outline-none"
                   />
                 </div>
               </div>

               <div className="space-y-1">
                 <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Password</label>
                 <div className="relative">
                   <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                   <input
                     type="password"
                     required
                     value={password}
                     onChange={e => setPassword(e.target.value)}
                     placeholder="••••••••"
                     className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-100 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:bg-white text-sm font-semibold text-gray-900 transition-all outline-none"
                   />
                 </div>
               </div>

               <button
                 type="submit"
                 disabled={loading}
                 className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-black text-[15px] rounded-2xl shadow-xl shadow-orange-200 hover:shadow-orange-300 hover:brightness-105 active:scale-[0.98] transition-all mt-4 disabled:opacity-70 disabled:scale-100"
               >
                 {loading ? "Please wait..." : (view === "signin" ? "Sign In" : "Create Account")}
                 {!loading && <ChevronRight size={18} />}
               </button>

             </form>
          )}

          {/* Toggle View */}
          {!isAuthenticated && (
            <div className="mt-8 text-center border-t border-gray-100 pt-8">
              <p className="text-[13px] font-semibold text-gray-500">
                {view === "signin" ? "Don't have an account?" : "Already have an account?"}
              </p>
              <button
                onClick={toggleView}
                className="mt-2 text-sm font-black text-orange-500 hover:text-orange-600 underline underline-offset-4 decoration-2 decoration-orange-200 hover:decoration-orange-400 transition-all"
              >
                {view === "signin" ? "Create a new account" : "Sign in to existing account"}
              </button>
            </div>
          )}

        </div>
      </aside>
    </>
  );
}
