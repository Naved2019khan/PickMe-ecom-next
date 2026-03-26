import React from "react";
import { Search, UserPlus, Shield, ShieldCheck, ShieldAlert, History, Mail, MapPin, MoreHorizontal } from "lucide-react";

export default function AdminUsersPage() {
  const users = [
    { id: 1, name: "Arjun Mehta", email: "arjun@vibrant.in", role: "Super Admin", status: "Active", lastLogin: "10 mins ago", ip: "192.168.1.1", location: "Mumbai, India", initial: "AM", color: "from-purple-500 to-indigo-600" },
    { id: 2, name: "Sarah Khan", email: "sarah.k@gmail.com", role: "Manager", status: "Active", lastLogin: "1 hour ago", ip: "103.44.21.1", location: "Delhi, India", initial: "SK", color: "from-emerald-400 to-teal-500" },
    { id: 3, name: "Vikram Das", email: "vikram.das@outlook.com", role: "User", status: "Inactive", lastLogin: "3 days ago", ip: "182.77.10.4", location: "Bangalore, India", initial: "VD", color: "from-blue-400 to-cyan-500" },
    { id: 4, name: "Anjali Singh", email: "anjali22@yandex.com", role: "Manager", status: "Active", lastLogin: "5 hours ago", ip: "103.5.12.8", location: "Chennai, India", initial: "AS", color: "from-orange-400 to-pink-500" },
    { id: 5, name: "Deepak Rawat", email: "deepak.rawat@work.com", role: "User", status: "Banned", lastLogin: "2 weeks ago", ip: "115.112.5.2", location: "Pune, India", initial: "DR", color: "from-rose-500 to-red-600" },
  ];

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Super Admin": return <ShieldCheck size={16} className="text-purple-500" />;
      case "Manager": return <Shield size={16} className="text-emerald-500" />;
      default: return <Shield size={16} className="text-blue-500" />;
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Users & Authentication</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage user login info, roles, and account security.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:shadow-lg transition-all">
          <UserPlus size={18} />
          Invite Member
        </button>
      </div>

      {/* Analytics Mini Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: "Active Sessions", value: "1,224", sub: "+12.5%", color: "indigo" },
          { label: "Total Accounts", value: "2,840", sub: "Verified", color: "purple" },
          { label: "Failed Logins", value: "42", sub: "-8%", color: "rose" },
        ].map((item, i) => (
          <div key={i} className="p-6 rounded-3xl bg-white/40 dark:bg-white/5 border border-white/40 dark:border-white/10 backdrop-blur-md">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.label}</p>
            <div className="flex items-end gap-3 mt-2">
              <h4 className="text-2xl font-black text-gray-900 dark:text-white leading-none">{item.value}</h4>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${item.color === 'rose' ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-500'}`}>{item.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Users Table */}
      <div className="bg-white/60 dark:bg-[#1E1E38]/60 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="p-6 border-b border-gray-100 dark:border-white/5 flex flex-col sm:flex-row gap-4 justify-between">
           <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Filter by name, email or role..." 
              className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-white/5 rounded-2xl text-sm outline-none transition-all dark:text-white"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-xs font-bold bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl hover:bg-gray-50">Roles</button>
            <button className="px-4 py-2 text-xs font-bold bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl hover:bg-gray-50">Status</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/30 dark:bg-white/5 text-[10px] uppercase tracking-wider font-bold text-gray-400">
                <th className="px-8 py-5">User Account</th>
                <th className="px-8 py-5">Role & Priority</th>
                <th className="px-8 py-5">Login Activity</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${user.color} flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-indigo-500/10`}>
                        {user.initial}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{user.name}</span>
                        <span className="text-xs text-gray-400 flex items-center gap-1"><Mail size={12}/>{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 bg-gray-50 dark:bg-white/5 px-3 py-1.5 rounded-xl border border-gray-100 dark:border-white/10 w-fit">
                      {getRoleIcon(user.role)}
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{user.role}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                        <History size={12} className="text-indigo-500" />
                        {user.lastLogin}
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium flex items-center gap-1.5 italic">
                         <MapPin size={10}/> {user.location} • {user.ip}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                       <div className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-emerald-500 animate-pulse' : user.status === 'Inactive' ? 'bg-gray-400' : 'bg-rose-500'}`}></div>
                       <span className="text-xs font-bold text-gray-600 dark:text-gray-400">{user.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 transition-colors text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-white/5 rounded-xl">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
