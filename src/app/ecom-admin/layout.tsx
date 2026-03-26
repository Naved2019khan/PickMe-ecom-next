import Sidebar from "@/components/ecom-admin/Sidebar";

export default function EcomAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-[#0F0F1B] selection:bg-purple-500/30 font-sans">
      {/* Side Navigation */}
      <Sidebar />

      {/* Main Content Space */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Decorative background blur elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none"></div>

        {/* Top Header Placeholder (can expand if needed, e.g., search bar) */}
        <header className="h-20 flex items-center justify-between px-10 border-b border-gray-200/50 dark:border-white/5 bg-white/50 dark:bg-[#1A1A2E]/50 backdrop-blur-md sticky top-0 z-20">
          <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Welcome back, Admin 👋</h1>
          <div className="flex items-center gap-4">
            {/* Action buttons could go here */}
            <div className="w-9 h-9 border border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center bg-white dark:bg-black/50 hover:bg-gray-50 transition-colors cursor-pointer">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
            </div>
          </div>
        </header>

        {/* Scrollable page body */}
        <div className="flex-1 overflow-y-auto p-10 relative z-10 w-full max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
