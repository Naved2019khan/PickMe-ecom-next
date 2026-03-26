import React from "react";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  trend: string;
  isPositive: boolean;
  icon: LucideIcon;
  colorFrom: string;
  colorTo: string;
}

export default function StatsCard({ title, value, trend, isPositive, icon: Icon, colorFrom, colorTo }: StatsCardProps) {
  return (
    <div className="bg-white/60 dark:bg-[#1E1E38]/60 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden group">
      {/* Background abstract gradient */}
      <div className={`absolute top-0 right-0 w-32 h-32 blur-[50px] opacity-20 bg-gradient-to-br ${colorFrom} ${colorTo} group-hover:opacity-40 transition-opacity duration-500 pointer-events-none rounded-full translate-x-1/2 -translate-y-1/2`}></div>
      
      <div className="flex items-start justify-between relative z-10">
        <div className="flex flex-col gap-4">
          <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">{title}</p>
          <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200">{value}</h3>
          
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${
              isPositive 
                ? "bg-emerald-100/50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400" 
                : "bg-rose-100/50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"
            }`}>
              {trend}
            </span>
            <span className="text-xs text-gray-400">vs last month</span>
          </div>
        </div>

        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${colorFrom} ${colorTo} text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}>
          <Icon size={24} strokeWidth={2.5} className="group-hover:rotate-6 transition-transform duration-300" />
        </div>
      </div>
    </div>
  );
}
