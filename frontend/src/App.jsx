
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  AirVent,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Bell,
  CalendarDays,
  CarFront,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Droplets,
  Hammer,
  Heart,
  House,
  MapPin,
  Menu,
  MoreHorizontal,
  Paintbrush,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  UserRound,
  Wrench,
  Zap,
  X,
} from "lucide-react";

const categories = [
  { name: "Electrician", detail: "Wiring & repairs", icon: Zap, color: "bg-amber-50 text-amber-600" },
  { name: "Plumber", detail: "Pipes & taps", icon: Droplets, color: "bg-sky-50 text-sky-600" },
  { name: "AC Repair", detail: "Cooling & service", icon: AirVent, color: "bg-indigo-50 text-indigo-600" },
  { name: "Mechanic", detail: "Vehicle repairs", icon: CarFront, color: "bg-orange-50 text-orange-600" },
  { name: "Cleaning", detail: "A spotless home", icon: Sparkles, color: "bg-violet-50 text-violet-600" },
  { name: "Carpenter", detail: "Furniture & wood", icon: Hammer, color: "bg-yellow-50 text-yellow-700" },
  { name: "Painter", detail: "Walls & finishing", icon: Paintbrush, color: "bg-rose-50 text-rose-600" },
  { name: "More", detail: "Explore services", icon: MoreHorizontal, color: "bg-blue-50 text-blue-700" },
];

const providers = [
  {
    id: 1,
    name: "Ramesh Electricals",
    category: "Electrician",
    service: "Electrical repair",
    rating: "4.8",
    reviews: 128,
    price: 199,
    distance: "1.2 km",
    initials: "RE",
    color: "from-blue-500 to-indigo-600",
    jobs: "320+",
  },
  {
    id: 2,
    name: "Shakti Plumbing",
    category: "Plumber",
    service: "Tap & pipe repair",
    rating: "4.6",
    reviews: 96,
    price: 150,
    distance: "1.5 km",
    initials: "SP",
    color: "from-cyan-500 to-blue-600",
    jobs: "240+",
  },
  {
    id: 3,
    name: "CoolCare Services",
    category: "AC Repair",
    service: "AC servicing",
    rating: "4.9",
    reviews: 184,
    price: 399,
    distance: "2.1 km",
    initials: "CC",
    color: "from-violet-500 to-indigo-600",
    jobs: "450+",
  },
  {
    id: 4,
    name: "QuickFix Auto",
    category: "Mechanic",
    service: "Vehicle inspection",
    rating: "4.7",
    reviews: 74,
    price: 249,
    distance: "2.3 km",
    initials: "QA",
    color: "from-orange-400 to-red-500",
    jobs: "180+",
  },
  {
    id: 5,
    name: "FreshNest Cleaning",
    category: "Cleaning",
    service: "Home deep cleaning",
    rating: "4.8",
    reviews: 112,
    price: 299,
    distance: "1.8 km",
    initials: "FN",
    color: "from-teal-500 to-emerald-600",
    jobs: "280+",
  },
  {
    id: 6,
    name: "WoodCraft Studio",
    category: "Carpenter",
    service: "Furniture repair",
    rating: "4.7",
    reviews: 68,
    price: 249,
    distance: "3.0 km",
    initials: "WC",
    color: "from-amber-500 to-orange-600",
    jobs: "150+",
  },
];

const cities = ["Bhubaneswar, Odisha", "Cuttack, Odisha", "Puri, Odisha"];

function SectionTitle({ eyebrow, title, subtitle, action, onAction }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.17em] text-blue-700">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-sm leading-6 text-slate-500">{subtitle}</p>
        )}
      </div>
      {action && (
        <button
          onClick={onAction}
          className="flex w-fit items-center gap-2 text-sm font-bold text-blue-700 transition hover:gap-3"
        >
          {action} <ArrowRight size={17} />
        </button>
      )}
    </div>
  );
}

function App() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [location, setLocation] = useState(cities[0]);
  const [showLocations, setShowLocations] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [notice, setNotice] = useState("");

  const filteredProviders = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();

    return providers.filter((provider) => {
      const matchesCategory =
        selectedCategory === "All" || provider.category === selectedCategory;

      const matchesSearch =
        !searchTerm ||
        `${provider.name} ${provider.category} ${provider.service}`
          .toLowerCase()
          .includes(searchTerm);

      return matchesCategory && matchesSearch;
    });
  }, [query, selectedCategory]);

  const chooseCategory = (category) => {
    if (category === "More") {
      setNotice("More service categories will be added soon.");
      return;
    }

    navigate(`/customer/search?q=${encodeURIComponent(category)}`);
  };

  const goToSearch = () => {
    const searchTerm = query.trim();
    navigate(
      `/customer/search${searchTerm ? `?q=${encodeURIComponent(searchTerm)}` : ""}`
    );
  };

  const toggleFavorite = (id) => {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const placeholderAction = (feature) => {
    setNotice(`${feature} is the next feature we will build.`);
  };

  return (
    <div className="min-h-screen bg-[#f7f9fd] pb-20 text-slate-900 lg:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="flex shrink-0 items-center gap-2.5">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-700 text-white shadow-lg shadow-blue-200">
              <House size={25} strokeWidth={2.4} />
            </span>
            <span>
              <span className="block text-xl font-black tracking-tight">
                Kaam<span className="text-blue-700">Setu</span>
                <span className="text-orange-500">.</span>
              </span>
              <span className="hidden text-[10px] font-semibold tracking-wide text-slate-500 sm:block">
                Har Kaam, Sabke Kaam
              </span>
            </span>
          </Link>

          {/* Desktop location */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setShowLocations(!showLocations)}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-left transition hover:border-blue-200 hover:bg-blue-50/50"
            >
              <MapPin className="text-blue-700" size={20} />
              <span>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Your location
                </span>
                <span className="mt-0.5 block max-w-44 truncate text-sm font-bold text-slate-800">
                  {location}
                </span>
              </span>
              <ChevronDown size={16} className="text-slate-400" />
            </button>

            {showLocations && (
              <div className="absolute left-0 top-full z-50 mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                <p className="px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                  Choose your city
                </p>
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setLocation(city);
                      setShowLocations(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-3 text-left text-sm font-semibold transition hover:bg-blue-50"
                  >
                    <MapPin size={16} className="text-blue-700" />
                    {city}
                    {location === city && (
                      <CheckCircle2 size={16} className="ml-auto text-blue-700" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <nav className="hidden items-center gap-7 lg:flex">
            <Link to="/customer/home" className="text-sm font-bold text-blue-700">Home</Link>
            <Link to="/customer/search" className="text-sm font-semibold text-slate-600 transition hover:text-blue-700">Services</Link>
            <Link to="/customer/bookings" className="text-sm font-semibold text-slate-600 transition hover:text-blue-700">My bookings</Link>
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <button
              onClick={() => placeholderAction("Notifications")}
              aria-label="Notifications"
              className="relative hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-blue-50 sm:flex"
            >
              <Bell size={19} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-orange-500" />
            </button>
            <Link
              to="/login"
              className="hidden rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold transition hover:border-blue-200 hover:bg-blue-50 sm:inline-flex"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="rounded-xl bg-blue-700 px-3.5 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-800 sm:px-5"
            >
              Join us <span className="hidden sm:inline">↗</span>
            </Link>
            <button
              aria-label="Open menu"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 lg:hidden"
            >
              {showMobileMenu ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>

        {showMobileMenu && (
          <div className="space-y-1 border-t border-slate-100 bg-white px-5 py-3 lg:hidden">
            <Link onClick={() => setShowMobileMenu(false)} to="/customer/home" className="block rounded-xl px-3 py-3 text-sm font-bold hover:bg-blue-50">Home</Link>
            <Link onClick={() => setShowMobileMenu(false)} to="/customer/search" className="block rounded-xl px-3 py-3 text-sm font-bold hover:bg-blue-50">Services</Link>
            <Link onClick={() => setShowMobileMenu(false)} to="/customer/bookings" className="block rounded-xl px-3 py-3 text-sm font-bold hover:bg-blue-50">My bookings</Link>
            <Link onClick={() => setShowMobileMenu(false)} to="/customer/profile" className="block rounded-xl px-3 py-3 text-sm font-bold hover:bg-blue-50">My profile</Link>
            <Link onClick={() => setShowMobileMenu(false)} to="/login" className="block rounded-xl px-3 py-3 text-sm font-bold hover:bg-blue-50">Sign in</Link>
          </div>
        )}
      </header>

      <main>
        {/* Hero */}
        <section id="home" className="relative overflow-hidden bg-white">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-100/70 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-orange-100/50 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-16">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-2 text-xs font-bold text-blue-800 sm:text-sm">
                <Sparkles size={15} />
                LOCAL SERVICES, MADE SIMPLE
              </div>

              <h1 className="max-w-2xl text-4xl font-black leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
                What does your
                <br />
                home need <span className="text-blue-700">today?</span>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
                Find trusted electricians, plumbers, mechanics and more.
                Quality local help, just a few clicks away.
              </p>

              <div className="mt-8 flex max-w-2xl flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-xl shadow-blue-100/60 sm:flex-row sm:items-center">
                <div className="flex min-w-0 flex-1 items-center gap-3 px-2.5">
                  <Search size={21} className="shrink-0 text-blue-700" />
                  <input
                    value={query}
                    onChange={(event) => {
                      setQuery(event.target.value);
                      setSelectedCategory("All");
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") goToSearch();
                    }}
                    placeholder="Electrician, plumber, AC repair..."
                    aria-label="Search for a service"
                    className="w-full min-w-0 bg-transparent py-3 text-sm outline-none placeholder:text-slate-400"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      aria-label="Clear search"
                      className="text-slate-400 hover:text-slate-700"
                    >
                      <X size={17} />
                    </button>
                  )}
                </div>
                <button
                  onClick={goToSearch}
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-blue-800"
                >
                  Find services <ArrowRight size={17} />
                </button>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-xs font-semibold text-slate-500 sm:text-sm">
                <span className="flex items-center gap-2">
                  <ShieldCheck size={17} className="text-emerald-600" />
                  Verified profiles
                </span>
                <span className="flex items-center gap-2">
                  <BadgeCheck size={17} className="text-blue-700" />
                  Clear pricing
                </span>
                <span className="flex items-center gap-2">
                  <Clock3 size={17} className="text-blue-700" />
                  Easy booking
                </span>
              </div>
            </motion.div>

            {/* Hero visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="relative mx-auto w-full max-w-lg"
            >
              <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-950 p-6 text-white shadow-2xl shadow-blue-200 sm:p-8">
                <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full border-[35px] border-white/[0.06]" />
                <div className="absolute -bottom-24 -left-12 h-56 w-56 rounded-full border-[38px] border-white/[0.05]" />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-white/10 px-3 py-2 text-xs font-bold text-blue-100">
                      KAAMSETU PICKS
                    </span>
                    <Sparkles className="text-amber-300" size={22} />
                  </div>
                  <h2 className="mt-7 text-3xl font-black leading-tight sm:text-4xl">
                    Good help.
                    <br />
                    Right around you.
                  </h2>
                  <p className="mt-3 max-w-xs text-sm leading-6 text-blue-100">
                    Discover dependable professionals for your everyday needs.
                  </p>

                  <div className="mt-8 rounded-2xl bg-white p-4 text-slate-900 shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                        <Wrench size={28} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-extrabold">Local experts</h3>
                          <CheckCircle2 size={15} className="text-emerald-600" />
                        </div>
                        <p className="mt-1 text-xs text-slate-500">Compare services and starting prices</p>
                      </div>
                      <ArrowUpRight className="text-blue-700" />
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4 text-center">
                      <div>
                        <p className="text-lg font-black text-blue-700">Easy</p>
                        <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">Discovery</p>
                      </div>
                      <div>
                        <p className="text-lg font-black text-blue-700">Local</p>
                        <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">Professionals</p>
                      </div>
                      <div>
                        <p className="text-lg font-black text-blue-700">Clear</p>
                        <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">Prices</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-xs font-medium text-blue-100">
                    <MapPin size={15} />
                    <span>Choose your location to explore nearby services</span>
                  </div>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-3 top-24 hidden items-center gap-2 rounded-2xl border border-slate-100 bg-white p-3 text-slate-800 shadow-xl sm:flex"
              >
                <span className="rounded-xl bg-emerald-50 p-2 text-emerald-600">
                  <ShieldCheck size={20} />
                </span>
                <span>
                  <span className="block text-xs font-extrabold">Trust first</span>
                  <span className="mt-0.5 block text-[10px] text-slate-500">Compare providers</span>
                </span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section id="categories" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <SectionTitle
            eyebrow="Explore our services"
            title="What do you need help with?"
            subtitle="Choose a category to find the right professional."
            action="Clear filter"
            onAction={() => {
              setSelectedCategory("All");
              setQuery("");
            }}
          />

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {categories.map((category, index) => {
              const Icon = category.icon;
              const active = selectedCategory === category.name;

              return (
                <motion.button
                  key={category.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.045, duration: 0.35 }}
                  whileHover={{ y: -4 }}
                  onClick={() => chooseCategory(category.name)}
                  className={`group rounded-2xl border p-4 text-left transition sm:p-4 ${
                    active
                      ? "border-blue-600 bg-blue-50 shadow-md shadow-blue-100"
                      : "border-slate-200 bg-white hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/60"
                  }`}
                >
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${category.color}`}>
                    <Icon size={23} />
                  </span>
                  <span className="mt-4 block text-sm font-extrabold text-slate-800">
                    {category.name}
                  </span>
                  <span className="mt-1 block text-[11px] leading-4 text-slate-500">
                    {category.detail}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* Popular service providers */}
        <section id="popular-services" className="scroll-mt-28 border-y border-slate-200/70 bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle
              eyebrow="Meet your local experts"
              title={
                selectedCategory === "All"
                  ? "Popular service providers"
                  : `${selectedCategory} professionals`
              }
              subtitle="Sample profiles for the KaamSetu interface prototype."
              action="Show all"
              onAction={() => {
                setSelectedCategory("All");
                setQuery("");
              }}
            />

            <div className="mb-6 flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                  selectedCategory === "All"
                    ? "bg-blue-700 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-blue-50"
                }`}
              >
                All services
              </button>
              <button
                onClick={() => placeholderAction("Advanced provider filters")}
                className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 transition hover:bg-blue-50"
              >
                <SlidersHorizontal size={14} /> Filters
              </button>
              <span className="ml-auto text-xs text-slate-500">
                {filteredProviders.length} sample profiles
              </span>
            </div>

            {filteredProviders.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProviders.map((provider, index) => (
                  <motion.article
                    key={provider.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.4, delay: index * 0.045 }}
                    whileHover={{ y: -4 }}
                    className="group rounded-3xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-xl hover:shadow-blue-100/70 sm:p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${provider.color} text-white shadow-lg shadow-slate-200`}>
                        <span className="text-lg font-black">{provider.initials}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="truncate text-base font-extrabold text-slate-900">
                              {provider.name}
                            </h3>
                            <p className="mt-1 text-xs text-slate-500">
                              {provider.service}
                            </p>
                          </div>
                          <button
                            onClick={() => toggleFavorite(provider.id)}
                            aria-label={favorites.includes(provider.id) ? "Remove from favourites" : "Add to favourites"}
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition ${
                              favorites.includes(provider.id)
                                ? "border-rose-200 bg-rose-50 text-rose-500"
                                : "border-slate-200 text-slate-400 hover:border-rose-200 hover:text-rose-500"
                            }`}
                          >
                            <Heart size={17} fill={favorites.includes(provider.id) ? "currentColor" : "none"} />
                          </button>
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                          <span className="inline-flex items-center gap-1 font-extrabold text-slate-800">
                            <Star size={13} fill="#F59E0B" className="text-amber-500" />
                            {provider.rating}
                          </span>
                          <span className="text-slate-400">({provider.reviews} sample reviews)</span>
                          <span className="text-slate-300">•</span>
                          <span className="text-slate-500">{provider.distance}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                      <div>
                        <p className="text-[11px] font-medium text-slate-500">Starting price</p>
                        <p className="mt-1 text-xl font-black text-slate-900">
                          ₹{provider.price}
                          <span className="ml-1 text-xs font-medium text-slate-400">onwards</span>
                        </p>
                      </div>
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-700">
                        <BadgeCheck size={15} /> Demo profile
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} /> {provider.distance} away
                      </span>
                      <span>{provider.jobs} sample jobs</span>
                    </div>

                    <button
                      onClick={() => navigate(`/customer/search?q=${encodeURIComponent(provider.category)}`)}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3.5 text-sm font-bold text-white transition hover:bg-blue-800"
                    >
                      View & book <ArrowRight size={16} />
                    </button>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-5 py-12 text-center">
                <Search className="mx-auto text-slate-400" size={32} />
                <h3 className="mt-4 text-lg font-extrabold">No matching providers</h3>
                <p className="mt-2 text-sm text-slate-500">Try another search or select a different category.</p>
                <button
                  onClick={() => {
                    setQuery("");
                    setSelectedCategory("All");
                  }}
                  className="mt-5 rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white"
                >
                  Reset search
                </button>
              </div>
            )}
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <SectionTitle
            eyebrow="Simple and convenient"
            title="Book help in three easy steps"
            subtitle="A clear booking journey is the next part of the platform we will build."
          />

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { number: "01", icon: Search, title: "Find a service", detail: "Search for the help you need." },
              { number: "02", icon: ShieldCheck, title: "Choose a professional", detail: "Compare profiles and prices." },
              { number: "03", icon: CalendarDays, title: "Arrange a booking", detail: "Choose a time that suits you." },
            ].map((step) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  whileHover={{ y: -4 }}
                  className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black tracking-widest text-blue-700">{step.number}</span>
                    <span className="rounded-2xl bg-blue-50 p-3 text-blue-700">
                      <Icon size={22} />
                    </span>
                  </div>
                  <h3 className="mt-7 font-extrabold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{step.detail}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Provider CTA */}
        <section className="px-4 pb-14 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[28px] bg-gradient-to-r from-blue-700 to-indigo-800 p-7 text-white sm:p-10 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.17em] text-blue-200">
                For local professionals
              </p>
              <h2 className="mt-3 text-2xl font-black sm:text-3xl">
                Grow your work with KaamSetu.
              </h2>
              <p className="mt-3 text-sm leading-6 text-blue-100">
                Bring your skills to more customers in your neighbourhood.
              </p>
            </div>
            <Link
              to="/register"
              className="flex shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-white px-5 py-3.5 text-sm font-extrabold text-blue-800 transition hover:bg-blue-50 md:self-center"
            >
              Join as a provider <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-7 text-sm text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <Link to="/" className="text-lg font-black text-slate-900">
            Kaam<span className="text-blue-700">Setu</span><span className="text-orange-500">.</span>
          </Link>
          <p>Connecting people with local services.</p>
          <p className="text-xs">Demo data for project development.</p>
        </div>
      </footer>

      {/* Mobile bottom navigation */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-lg items-center justify-around">
          <Link to="/customer/home" className="flex flex-col items-center gap-1 px-3 py-1.5 text-blue-700">
            <House size={20} />
            <span className="text-[10px] font-extrabold">Home</span>
          </Link>
          <Link to="/customer/search" className="flex flex-col items-center gap-1 px-3 py-1.5 text-slate-500">
            <Search size={20} />
            <span className="text-[10px] font-semibold">Search</span>
          </Link>
          <Link to="/customer/bookings" className="flex flex-col items-center gap-1 px-3 py-1.5 text-slate-500">
            <CalendarDays size={20} />
            <span className="text-[10px] font-semibold">Bookings</span>
          </Link>
          <Link to="/customer/profile" className="flex flex-col items-center gap-1 px-3 py-1.5 text-slate-500">
            <UserRound size={20} />
            <span className="text-[10px] font-semibold">Profile</span>
          </Link>
        </div>
      </nav>

      {/* Prototype notice */}
      {notice && (
        <div
          role="status"
          className="fixed bottom-24 left-1/2 z-[60] flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl lg:bottom-6"
        >
          <span className="rounded-xl bg-blue-50 p-2 text-blue-700">
            <Sparkles size={18} />
          </span>
          <p className="flex-1 text-sm leading-6 text-slate-700">{notice}</p>
          <button onClick={() => setNotice("")} aria-label="Dismiss message" className="text-slate-400 hover:text-slate-800">
            <X size={18} />
          </button>
        </div>
      )}
    </div>
  );
}

export default App;