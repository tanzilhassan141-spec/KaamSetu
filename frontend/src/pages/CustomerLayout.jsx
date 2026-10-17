
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { motion } from "motion/react";
import {
  House,
  Search,
  CalendarDays,
  UserRound,
  Bell,
  MapPin,
  Menu,
  X,
} from "lucide-react";

const tabs = [
  { label: "Home", path: "/customer/home", icon: House },
  { label: "Search", path: "/customer/search", icon: Search },
  { label: "My Bookings", path: "/customer/bookings", icon: CalendarDays },
  { label: "My Profile", path: "/customer/profile", icon: UserRound },
];

export default function CustomerLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f9fd] pb-20 text-slate-900 lg:pb-0">
      {/* Customer header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <Link
            to="/customer/home"
            className="flex shrink-0 items-center gap-2.5"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-white">
              <House size={22} />
            </span>

            <span className="text-xl font-black tracking-tight">
              Kaam<span className="text-blue-700">Setu</span>
              <span className="text-orange-500">.</span>
            </span>
          </Link>

          <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 sm:flex">
            <MapPin size={18} className="text-blue-700" />
            <span className="text-xs font-semibold text-slate-600">
              Select your location
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              aria-label="Notifications"
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("kaamsetu-notice", {
                    detail: "Notifications will be added soon.",
                  })
                )
              }
              className="hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-blue-50 sm:flex"
            >
              <Bell size={19} />
            </button>

            <button
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 lg:hidden"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-slate-100 bg-white p-3 lg:hidden">
            {tabs.map((tab) => {
              const Icon = tab.icon;

              return (
                <NavLink
                  key={tab.path}
                  to={tab.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold ${
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-600 hover:bg-slate-50"
                    }`
                  }
                >
                  <Icon size={19} />
                  {tab.label}
                </NavLink>
              );
            })}
          </div>
        )}
      </header>

      {/* The selected customer page renders here */}
      <motion.div
        key={window.location.pathname}
        initial={{ opacity: 0, y: 7 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Outlet />
      </motion.div>

      {/* Persistent bottom navigation on mobile */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-3 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-lg items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <NavLink
                key={tab.path}
                to={tab.path}
                className={({ isActive }) =>
                  `flex min-w-0 flex-col items-center gap-1 rounded-xl px-3 py-1.5 transition ${
                    isActive
                      ? "text-blue-700"
                      : "text-slate-400 hover:text-blue-600"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon size={21} strokeWidth={isActive ? 2.5 : 1.8} />
                    <span className="whitespace-nowrap text-[10px] font-bold">
                      {tab.label}
                    </span>
                    {isActive && (
                      <span className="h-1 w-4 rounded-full bg-blue-700" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}