import React from "react";
import StatsCard from "@/components/ecom-admin/StatsCard";
import { ShoppingBag, Users as UsersIcon, IndianRupee, TrendingUp, Package, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AdminOverviewPage() {
  const stats = [
    {
      title: "Total Revenue",
      value: "₹1,24,500",
      trend: "+12.5%",
      isPositive: true,
      icon: IndianRupee,
      colorFrom: "from-emerald-500",
      colorTo: "to-teal-600",
    },
    {
      title: "New Orders",
      value: "156",
      trend: "+8.2%",
      isPositive: true,
      icon: ShoppingBag,
      colorFrom: "from-indigo-500",
      colorTo: "to-purple-600",
    },
    {
      title: "Total Customers",
      value: "2,840",
      trend: "+5.1%",
      isPositive: true,
      icon: UsersIcon,
      colorFrom: "from-orange-400",
      colorTo: "to-rose-500",
    },
    {
      title: "Average Order Value",
      value: "₹798",
      trend: "-2.4%",
      isPositive: false,
      icon: TrendingUp,
      colorFrom: "from-blue-500",
      colorTo: "to-cyan-600",
    },
  ];

  const recentOrders = [
    { id: "#ORD-7721", customer: "Rahul Sharma", items: 3, total: "₹2,499", status: "Delivered", date: "2 mins ago" },
    { id: "#ORD-7720", customer: "Priya Patel", items: 1, total: "₹899", status: "Pending", date: "15 mins ago" },
    { id: "#ORD-7719", customer: "Amit Kumar", items: 2, total: "₹1,250", status: "Shipped", date: "1 hour ago" },
    { id: "#ORD-7718", customer: "Sneha Reddy", items: 5, total: "₹4,120", status: "Delivered", date: "3 hours ago" },
  ];

  return (
    <div className="flex flex-col gap-10">
      {/* Page Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Dashboard Overview</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Real-time performance and analytics for your store.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 rounded-xl bg-white dark:bg-[#1A1A2E] border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition-all shadow-sm">
            Export Report
          </button>
          <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all">
            Add Product
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <StatsCard key={i} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Section */}
        <div className="lg:col-span-2 bg-white/60 dark:bg-[#1E1E38]/60 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="p-6 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Package size={20} className="text-indigo-500" />
              Recent Orders
            </h3>
            <Link href="/ecom-admin/orders" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 dark:bg-white/5 text-[10px] uppercase tracking-wider font-bold text-gray-400">
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4 text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                {recentOrders.map((order, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">{order.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{order.customer}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                        order.status === "Delivered" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400" :
                        order.status === "Shipped" ? "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400" :
                        "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-indigo-600 dark:text-indigo-400">{order.total}</td>
                    <td className="px-6 py-4 text-sm text-gray-400 text-right">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sales Chart Placeholder / Analytics Mini Card */}
        <div className="flex flex-col gap-6">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden h-full min-h-[300px]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10 flex flex-col h-full">
              <h3 className="text-xl font-bold mb-1">Growth Forecast</h3>
              <p className="text-white/70 text-sm mb-8">Estimated sales for next quarter</p>
              
              <div className="mt-auto">
                <div className="text-4xl font-extrabold mb-2">₹15.2L</div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="bg-white/20 px-2 py-0.5 rounded-lg text-xs font-bold font-mono">+24%</span>
                  <span>predicted improvement</span>
                </div>
                
                <div className="mt-8 flex gap-1 items-end h-24">
                  {[40, 70, 45, 90, 65, 80, 55, 95].map((h, i) => (
                    <div key={i} className="flex-1 bg-white/20 rounded-t-lg transition-all duration-500 hover:bg-white/40 cursor-help" style={{ height: `${h}%` }}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
