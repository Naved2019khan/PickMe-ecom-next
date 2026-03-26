import React from "react";
import { Search, Filter, MoreVertical, Eye, Download, ChevronRight, ChevronLeft } from "lucide-react";

export default function AdminOrdersPage() {
  const categories = ["All Orders", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
  
  const orders = [
    { id: "ORD-9901", customer: "Arjun Mehta", email: "arjun@vibrant.in", items: 2, amount: "₹1,599", date: "Mar 25, 2026", status: "Processing", payment: "online" },
    { id: "ORD-9902", customer: "Sarah Khan", email: "sarah.k@gmail.com", items: 1, amount: "₹849", date: "Mar 25, 2026", status: "Pending", payment: "cod" },
    { id: "ORD-9903", customer: "Vikram Das", email: "vikram.das@outlook.com", items: 4, amount: "₹3,290", date: "Mar 24, 2026", status: "Delivered", payment: "online" },
    { id: "ORD-9904", customer: "Anjali Singh", email: "anjali22@yandex.com", items: 3, amount: "₹2,100", date: "Mar 24, 2026", status: "Shipped", payment: "online" },
    { id: "ORD-9905", customer: "Deepak Rawat", email: "deepak.rawat@work.com", items: 1, amount: "₹499", date: "Mar 23, 2026", status: "Cancelled", payment: "cod" },
    { id: "ORD-9906", customer: "Ishita Gaur", email: "ishita.g@live.in", items: 2, amount: "₹1,250", date: "Mar 23, 2026", status: "Delivered", payment: "online" },
    { id: "ORD-9907", customer: "Rohan Varma", email: "rohan.v@gmail.com", items: 6, amount: "₹5,400", date: "Mar 22, 2026", status: "Processing", payment: "online" },
    { id: "ORD-9908", customer: "Megha Jain", email: "megha.j@outlook.com", items: 2, amount: "₹1,899", date: "Mar 22, 2026", status: "Shipped", payment: "cod" },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Delivered": return "bg-emerald-100/60 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400";
      case "Shipped": return "bg-blue-100/60 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400";
      case "Processing": return "bg-indigo-100/60 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400";
      case "Pending": return "bg-amber-100/60 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400";
      case "Cancelled": return "bg-rose-100/60 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Order Management</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and track your customer commerce orders.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white dark:bg-[#1A1A2E] border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-50 transition-all shadow-sm">
          <Download size={18} className="text-indigo-500" />
          Export All
        </button>
      </div>

      {/* Tabs / Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat, i) => (
          <button 
            key={i} 
            className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
              i === 0 
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" 
                : "bg-white/50 dark:bg-white/5 text-gray-500 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tools / Search */}
      <div className="bg-white/40 dark:bg-[#1E1E38]/40 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl p-4 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by order ID, customer name..." 
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-black/20 border border-gray-200 dark:border-white/5 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-black/20 border border-gray-200 dark:border-white/5 rounded-2xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 transition-all">
          <Filter size={18} />
          More Filters
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-white/60 dark:bg-[#1E1E38]/60 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5 text-[10px] uppercase tracking-wider font-bold text-gray-400">
                <th className="px-8 py-5">Order details</th>
                <th className="px-8 py-5">Customer info</th>
                <th className="px-8 py-5">Value</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {orders.map((order, i) => (
                <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">{order.id}</span>
                      <span className="text-xs text-gray-400 mt-0.5">{order.date}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{order.customer}</span>
                      <span className="text-xs text-gray-400 mt-0.5">{order.email}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm">
                    <div className="flex flex-col">
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">{order.amount}</span>
                      <span className="text-[10px] uppercase text-gray-400 font-medium">{order.items} Items • {order.payment}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full ${getStatusStyle(order.status)} uppercase tracking-wide`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 transition-colors text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg" title="View Details">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 transition-colors text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
          <p className="text-xs text-gray-500">Showing 1 to 8 of 156 orders</p>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all">
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map(p => (
                <button key={p} className={`w-9 h-9 flex items-center justify-center rounded-xl text-xs font-bold transition-all ${p === 1 ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20" : "hover:bg-gray-50 dark:hover:bg-white/5 text-gray-500"}`}>
                  {p}
                </button>
              ))}
              <span className="text-gray-400 px-2 leading-none">...</span>
              <button className="w-9 h-9 flex items-center justify-center rounded-xl text-xs font-bold hover:bg-gray-50 dark:hover:bg-white/5 text-gray-500">
                20
              </button>
            </div>
            <button className="p-2 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
