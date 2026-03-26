"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Copyleft, LayoutDashboard, ShoppingCart, Users, Settings, LogOut } from "lucide-react";

const navItems = [
  { name: "Overview", href: "/ecom-admin", icon: LayoutDashboard },
  { name: "Orders", href: "/ecom-admin/orders", icon: ShoppingCart },
  { name: "Users", href: "/ecom-admin/users", icon: Users },
  { name: "Settings", href: "/ecom-admin/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen max-h-screen sticky top-0 flex flex-col bg-white/40 dark:bg-[#1A1A2E]/70 backdrop-blur-xl border-r border-white/20 dark:border-white/10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      {/* Brand */}
      <div className="h-20 flex items-center px-8 border-b border-white/20 dark:border-white/10">
        <Link href="/ecom-admin" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all duration-300">
            <Copyleft size={22} className="group-hover:rotate-12 transition-transform duration-300"/>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 tracking-tight">
            PickMe <span className="font-light text-purple-600 dark:text-purple-400">Admin</span>
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-8 px-4 flex flex-col gap-2">
        <p className="px-4 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Commerce</p>
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                isActive 
                  ? "bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-700 dark:text-indigo-300 font-medium" 
                  : "text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <div className={`flex items-center justify-center transition-colors duration-300 ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-gray-400 group-hover:text-indigo-500"}`}>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              {item.name}
              {isActive && (
                <div className="ml-auto w-1.5 h-6 rounded-full bg-gradient-to-b from-indigo-500 to-purple-600 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Footer / Profile */}
      <div className="p-4 border-t border-white/20 dark:border-white/10 m-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-purple-500/20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3 group-hover:scale-110 transition-transform duration-500"></div>
        <div className="relative z-10 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 text-sm font-bold">
              AK
            </div>
            <div>
              <p className="text-sm font-semibold">Admin User</p>
              <p className="text-xs text-white/70">admin@pickme.com</p>
            </div>
          </div>
          <button className="flex items-center gap-2 text-xs font-medium bg-white/20 hover:bg-white/30 transition-colors py-2 px-3 rounded-lg backdrop-blur-sm border border-white/10 w-full justify-center mt-1">
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
