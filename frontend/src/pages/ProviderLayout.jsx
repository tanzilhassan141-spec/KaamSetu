
import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  Activity,
  Bell,
  CalendarDays,
  ChevronRight,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  UserRound,
  Wallet,
  Wrench,
  X,
} from "lucide-react";
import { motion } from "motion/react";

const navigation = [
  { label: "Dashboard", path: "/provider/dashboard", icon: LayoutDashboard },
  { label: "Booking requests", path: "/provider/requests", icon: ClipboardList },
  { label: "My jobs", path: "/provider/jobs", icon: CalendarDays },
  { label: "Earnings", path: "/provider/earnings", icon: Wallet },
  { label: "My profile", path: "/provider/profile", icon: UserRound },
  { label: "Settings", path: "/provider/settings", icon: Settings },
];

const pageTitles = {
  "/provider/dashboard": "Professional Dashboard",
  "/provider/requests": "Booking Requests",
  "/provider/jobs": "My Jobs",
  "/provider/earnings": "Earnings & Transactions",
  "/provider/profile": "Professional Profile",
  "/provider/settings": "Account Settings",
};

export default function ProviderLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const title = pageTitles[location.pathname] || "Professional Workspace";

  const sidebar = (
    <div className="flex h-full flex-col bg-white">
      <div className="flex h-[76px] items-center justify-between border-b border-slate-100 px-5">
        <Link
          to="/provider/dashboard"
          onClick={() => setSidebarOpen(false)}
          className="flex items-center gap-3"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-white shadow-lg shadow-blue-100">
            <Wrench size={22} />
          </span>
          <span className="text-xl font-black tracking-tight">
            Kaam<span className="text-blue-700">Setu</span>
            <span className="text-orange-500">.</span>
          </span>
        </Link>

        <button
          onClick={() => setSidebarOpen(false)}
          aria-label="Close navigation"
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
        >
          <X size={19} />
        </button>
      </div>

      <div className="border-b border-slate-100 p-4">
        <div className="flex items-center gap-3 rounded-2xl bg-blue-50 p-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-700 font-black text-white">
            P
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-extrabold text-slate-800">
              Professional account
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Service provider
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-6">
        <p className="px-3 pb-3 text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-400">
          Workspace
        </p>

        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-blue-700 text-white shadow-md shadow-blue-100"
                    : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                }`
              }
            >
              <Icon size={19} />
              <span className="flex-1">{item.label}</span>
              {location.pathname === item.path && (
                <ChevronRight size={16} />
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4">
        <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
          <Activity size={23} className="text-blue-700" />
          <p className="mt-3 text-sm font-extrabold text-slate-900">
            Grow your business
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Keep your professional profile up to date.
          </p>
          <NavLink
            to="/provider/profile"
            onClick={() => setSidebarOpen(false)}
            className="mt-3 inline-block text-xs font-extrabold text-blue-700"
          >
            Update profile →
          </NavLink>
        </div>

        <Link
          to="/"
          className="mt-3 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <LogOut size={18} /> Back to home
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[260px] border-r border-slate-200 lg:block">
        {sidebar}
      </aside>

      {sidebarOpen && (
        <button
          aria-label="Close sidebar overlay"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[280px] shadow-2xl transition-transform duration-300 lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebar}
      </aside>

      <div className="min-h-screen lg:pl-[260px]">
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between gap-3 border-b border-slate-200 bg-white/95 px-4 backdrop-blur-xl sm:px-7 lg:px-9">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation"
              className="rounded-xl border border-slate-200 p-2.5 text-slate-600 lg:hidden"
            >
              <Menu size={20} />
            </button>

            <div className="min-w-0">
              <h1 className="truncate text-sm font-extrabold sm:text-base">
                {title}
              </h1>
              <p className="mt-1 hidden text-xs text-slate-500 sm:block">
                Manage your work and bookings.
              </p>
            </div>
          </div>

          <button
            aria-label="Notifications"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("kaamsetu-notice", {
                detail: "Notifications will be connected later.",
              }))
            }
            className="relative rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:bg-blue-50"
          >
            <Bell size={19} />
          </button>
        </header>

        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
}