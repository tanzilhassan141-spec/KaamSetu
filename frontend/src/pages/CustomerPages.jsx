
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  Search, MapPin, Star, ArrowRight, Clock3, CalendarDays,
  CheckCircle2, Heart, ShieldCheck, Zap, Droplets, Wind,
  CarFront, Sparkles, Hammer, Paintbrush, House, UserRound,
  ChevronRight, Phone, Mail, Pencil, Plus, CalendarCheck,
  Settings, LogOut, X, BadgeCheck
} from "lucide-react";

const categories = [
  { name: "Electrician", icon: Zap, color: "bg-amber-50 text-amber-600" },
  { name: "Plumber", icon: Droplets, color: "bg-sky-50 text-sky-600" },
  { name: "AC Repair", icon: Wind, color: "bg-indigo-50 text-indigo-600" },
  { name: "Mechanic", icon: CarFront, color: "bg-orange-50 text-orange-600" },
  { name: "Cleaning", icon: Sparkles, color: "bg-violet-50 text-violet-600" },
  { name: "Carpenter", icon: Hammer, color: "bg-yellow-50 text-yellow-700" },
  { name: "Painting", icon: Paintbrush, color: "bg-rose-50 text-rose-600" },
  { name: "Home Repair", icon: House, color: "bg-emerald-50 text-emerald-600" },
];

const providers = [
  { id: 1, name: "Ramesh Electricals", category: "Electrician", service: "Electrical repair", rating: "4.8", reviews: 128, price: 199, distance: "1.2 km", initials: "RE", color: "from-blue-500 to-indigo-600" },
  { id: 2, name: "Shakti Plumbing", category: "Plumber", service: "Tap & pipe repair", rating: "4.6", reviews: 96, price: 150, distance: "1.5 km", initials: "SP", color: "from-cyan-500 to-blue-600" },
  { id: 3, name: "CoolCare Services", category: "AC Repair", service: "AC servicing", rating: "4.9", reviews: 184, price: 399, distance: "2.1 km", initials: "CC", color: "from-violet-500 to-indigo-600" },
  { id: 4, name: "QuickFix Auto", category: "Mechanic", service: "Vehicle inspection", rating: "4.7", reviews: 74, price: 249, distance: "2.3 km", initials: "QA", color: "from-orange-400 to-red-500" },
  { id: 5, name: "FreshNest Cleaning", category: "Cleaning", service: "Home deep cleaning", rating: "4.8", reviews: 112, price: 299, distance: "1.8 km", initials: "FN", color: "from-teal-500 to-emerald-600" },
  { id: 6, name: "WoodCraft Studio", category: "Carpenter", service: "Furniture repair", rating: "4.7", reviews: 68, price: 249, distance: "3.0 km", initials: "WC", color: "from-amber-500 to-orange-600" },
];

const sampleBookings = [
  { id: "KS1024", service: "Fan Installation", provider: "Ramesh Electricals", date: "12 Oct 2026", time: "11:00 AM", price: 299, status: "Confirmed", initials: "RE" },
  { id: "KS1025", service: "AC Servicing", provider: "CoolCare Services", date: "14 Oct 2026", time: "2:30 PM", price: 399, status: "Pending", initials: "CC" },
  { id: "KS1019", service: "Tap Repair", provider: "Shakti Plumbing", date: "07 Oct 2026", time: "10:00 AM", price: 150, status: "Completed", initials: "SP" },
];

function PageHeading({ eyebrow, title, description }) {
  return (
    <div>
      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-blue-700">{eyebrow}</p>
      <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">{title}</h1>
      <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}

function DemoNotice() {
  return (
    <p className="mt-5 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-xs leading-5 text-blue-800">
      Demo preview: provider details and booking records are sample data, not live customer records.
    </p>
  );
}

function ProviderCard({ provider, favorites, toggleFavorite, onBook }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-lg hover:shadow-blue-100/60"
    >
      <div className="flex items-start gap-3">
        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${provider.color} font-black text-white`}>
          {provider.initials}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-extrabold">{provider.name}</h3>
          <p className="mt-1 text-xs text-slate-500">{provider.service}</p>
          <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs">
            <Star size={13} fill="#F59E0B" className="text-amber-500" />
            <b>{provider.rating}</b>
            <span className="text-slate-400">({provider.reviews} sample reviews)</span>
          </div>
        </div>
        <button
          aria-label="Toggle favourite"
          onClick={() => toggleFavorite(provider.id)}
          className={`rounded-full border p-2 transition ${favorites.includes(provider.id) ? "border-rose-200 bg-rose-50 text-rose-500" : "border-slate-200 text-slate-400 hover:text-rose-500"}`}
        >
          <Heart size={17} fill={favorites.includes(provider.id) ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-50 p-3">
        <div>
          <p className="text-[11px] text-slate-500">Starting from</p>
          <p className="mt-1 text-xl font-black">₹{provider.price}</p>
        </div>
        <span className="flex items-center gap-1 text-xs font-bold text-emerald-700">
          <ShieldCheck size={15} /> Sample profile
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1"><MapPin size={14} /> {provider.distance}</span>
        <button onClick={() => onBook(provider)} className="flex items-center gap-1 rounded-lg bg-blue-700 px-4 py-2.5 font-bold text-white transition hover:bg-blue-800">
          View service <ArrowRight size={14} />
        </button>
      </div>
    </motion.article>
  );
}

export function CustomerHome() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites((previous) =>
      previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id]
    );
  };

  const search = (event) => {
    event.preventDefault();
    navigate(`/customer/search${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8 lg:py-10">
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-7 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-950 p-6 text-white sm:p-9 lg:grid-cols-[1.2fr_0.8fr] lg:p-12"
      >
        <div className="flex flex-col justify-center">
          <span className="flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-bold">
            <Sparkles size={15} className="text-amber-300" /> LOCAL SERVICES, MADE SIMPLE
          </span>
          <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl">
            What does your home need <span className="text-blue-200">today?</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-blue-100 sm:text-base">
            Find trusted local professionals for repairs, maintenance and everyday home services.
          </p>

          <form onSubmit={search} className="mt-7 flex flex-col gap-2 rounded-2xl bg-white p-2 sm:flex-row">
            <div className="flex flex-1 items-center gap-2 px-3">
              <Search size={20} className="shrink-0 text-blue-700" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Electrician, plumber, AC repair..."
                className="w-full min-w-0 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
            </div>
            <button className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-blue-800">
              Find services
            </button>
          </form>

          <div className="mt-5 flex flex-wrap gap-4 text-xs font-semibold text-blue-100">
            <span className="flex items-center gap-1.5"><ShieldCheck size={16} /> Trusted profiles</span>
            <span className="flex items-center gap-1.5"><BadgeCheck size={16} /> Clear prices</span>
            <span className="flex items-center gap-1.5"><Clock3 size={16} /> Easy booking</span>
          </div>
        </div>

        <div className="hidden items-center justify-center lg:flex">
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-full max-w-sm rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-blue-100">KaamSetu services</span>
              <House size={23} className="text-blue-200" />
            </div>
            <h2 className="mt-5 text-2xl font-black">Good help, right around you.</h2>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {categories.slice(0, 4).map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.name}
                    onClick={() => navigate(`/customer/search?q=${encodeURIComponent(category.name)}`)}
                    className="rounded-2xl bg-white p-3 text-left text-slate-900 transition hover:-translate-y-1"
                  >
                    <Icon size={22} className="text-blue-700" />
                    <p className="mt-3 text-xs font-extrabold">{category.name}</p>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </motion.section>

      <section className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <PageHeading eyebrow="Browse categories" title="What do you need help with?" description="Choose a service to explore matching professionals." />
          <Link to="/customer/search" className="hidden shrink-0 items-center gap-1 text-sm font-bold text-blue-700 sm:flex">
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                whileHover={{ y: -4 }}
                onClick={() => navigate(`/customer/search?q=${encodeURIComponent(category.name)}`)}
                className="rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-blue-200 hover:shadow-lg"
              >
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${category.color}`}>
                  <Icon size={23} />
                </span>
                <span className="mt-3 block text-sm font-extrabold">{category.name}</span>
                <span className="mt-1 block text-xs text-slate-500">Explore services</span>
              </motion.button>
            );
          })}
        </div>
      </section>

      <section className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <PageHeading eyebrow="Local professionals" title="Popular near you" description="Explore sample provider profiles and starting prices." />
          <Link to="/customer/search" className="hidden shrink-0 items-center gap-1 text-sm font-bold text-blue-700 sm:flex">
            Explore all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {providers.slice(0, 3).map((provider) => (
            <ProviderCard
              key={provider.id}
              provider={provider}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              onBook={() => navigate("/customer/search")}
            />
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-3xl bg-white p-6 sm:p-9">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-blue-700">For local professionals</p>
            <h2 className="mt-2 text-2xl font-black">Offer your services with KaamSetu.</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">Join the professional community and manage service requests.</p>
          </div>
          <Link to="/register" className="flex w-fit items-center gap-2 rounded-xl bg-blue-700 px-5 py-3.5 text-sm font-bold text-white hover:bg-blue-800">
            Join KaamSetu <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}

export function CustomerSearch() {
  const params = new URLSearchParams(window.location.search);
  const initialQuery = params.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState("All");
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const filteredProviders = providers.filter((provider) => {
    const matchesQuery = `${provider.name} ${provider.category} ${provider.service}`
      .toLowerCase().includes(query.trim().toLowerCase());
    const matchesCategory = category === "All" || provider.category === category;
    return matchesQuery && matchesCategory;
  });

  const toggleFavorite = (id) => {
    setFavorites((previous) =>
      previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id]
    );
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHeading eyebrow="Discover local services" title="Search services" description="Find the right kind of help for your home or vehicle." />

      <form onSubmit={(event) => event.preventDefault()} className="mt-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 sm:flex-row">
        <div className="flex flex-1 items-center gap-3 px-2">
          <Search size={20} className="text-blue-700" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try plumber, electrician, AC..." className="w-full py-3 text-sm outline-none" />
          {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search"><X size={17} className="text-slate-400" /></button>}
        </div>
        <button className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white">Search</button>
      </form>

      <div className="mt-6 flex flex-wrap gap-2">
        {["All", ...categories.map((item) => item.name)].map((item) => (
          <button key={item} onClick={() => setCategory(item)} className={`rounded-full px-4 py-2.5 text-xs font-bold transition ${category === item ? "bg-blue-700 text-white" : "border border-slate-200 bg-white text-slate-600 hover:bg-blue-50"}`}>
            {item}
          </button>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        <h2 className="text-xl font-black">Available provider profiles</h2>
        <span className="text-xs font-semibold text-slate-500">{filteredProviders.length} sample results</span>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filteredProviders.map((provider) => (
          <ProviderCard key={provider.id} provider={provider} favorites={favorites} toggleFavorite={toggleFavorite} onBook={() => navigate("/customer/bookings")} />
        ))}
      </div>

      {filteredProviders.length === 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <Search size={32} className="mx-auto text-slate-400" />
          <p className="mt-4 font-bold">No matching services found</p>
          <p className="mt-2 text-sm text-slate-500">Try another keyword or category.</p>
        </div>
      )}
      <DemoNotice />
    </main>
  );
}

export function CustomerBookings() {
  const [filter, setFilter] = useState("All");
  const [notice, setNotice] = useState("");

  const bookingList = sampleBookings.filter((booking) =>
    filter === "All" || booking.status === filter
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHeading eyebrow="Your service history" title="My Bookings" description="View and manage your service booking activity." />
      <DemoNotice />

      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          { label: "All bookings", value: sampleBookings.length },
          { label: "Upcoming", value: sampleBookings.filter((item) => item.status !== "Completed").length },
          { label: "Completed", value: sampleBookings.filter((item) => item.status === "Completed").length },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
            <p className="text-xs text-slate-500">{item.label}</p>
            <p className="mt-2 text-2xl font-black">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-7 flex flex-wrap gap-2">
        {["All", "Confirmed", "Pending", "Completed"].map((item) => (
          <button key={item} onClick={() => setFilter(item)} className={`rounded-full px-4 py-2.5 text-xs font-bold ${filter === item ? "bg-blue-700 text-white" : "border border-slate-200 bg-white text-slate-600"}`}>
            {item}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-4">
        {bookingList.map((booking) => (
          <motion.article key={booking.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 font-black text-blue-700">{booking.initials}</div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-extrabold">{booking.service}</h3>
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold ${booking.status === "Completed" ? "bg-emerald-50 text-emerald-700" : booking.status === "Confirmed" ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"}`}>{booking.status}</span>
                </div>
                <p className="mt-1 text-sm text-slate-500">{booking.provider}</p>
                <p className="mt-3 flex items-center gap-2 text-xs text-slate-500"><CalendarDays size={15} /> {booking.date} · {booking.time}</p>
                <p className="mt-2 text-xs text-slate-400">Booking ID: {booking.id}</p>
              </div>
              <p className="shrink-0 text-lg font-black">₹{booking.price}</p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
              {booking.status === "Completed" ? (
                <button onClick={() => setNotice("Reviews will be saved when the review API is added.")} className="flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-xs font-bold text-white"><Star size={15} /> Leave a review</button>
              ) : (
                <button onClick={() => setNotice("Live booking details and cancellation will be added with the booking backend.")} className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700"><CalendarCheck size={15} /> Booking details</button>
              )}
            </div>
          </motion.article>
        ))}
      </div>

      {bookingList.length === 0 && <p className="mt-6 rounded-2xl bg-white p-10 text-center text-sm text-slate-500">No bookings in this category.</p>}

      {notice && (
        <div role="status" className="mt-5 flex items-center justify-between gap-3 rounded-xl bg-blue-50 p-4 text-sm text-blue-800">
          {notice}
          <button onClick={() => setNotice("")} aria-label="Dismiss"><X size={17} /></button>
        </div>
      )}
    </main>
  );
}

export function CustomerProfile() {
  const [profile, setProfile] = useState({ name: "", email: "", phone: "", address: "" });
  const [saved, setSaved] = useState(false);

  const update = (event) => {
    setSaved(false);
    setProfile((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  };

  const fieldClass = "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50";

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHeading eyebrow="Your account" title="My Profile" description="Manage your contact information and saved address." />
      <DemoNotice />

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-700"><UserRound size={29} /></div>
          <div>
            <h2 className="text-lg font-black">Personal information</h2>
            <p className="mt-1 text-sm text-slate-500">Your profile details for bookings.</p>
          </div>
        </div>

        <form onSubmit={(event) => { event.preventDefault(); setSaved(true); }} className="mt-6 grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-bold">Full name
            <input name="name" value={profile.name} onChange={update} placeholder="Enter your name" required className={fieldClass} />
          </label>
          <label className="text-sm font-bold">Email address
            <span className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 px-4">
              <Mail size={17} className="text-slate-400" />
              <input type="email" name="email" value={profile.email} onChange={update} placeholder="you@example.com" required className="w-full py-3 text-sm outline-none" />
            </span>
          </label>
          <label className="text-sm font-bold">Phone number
            <span className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 px-4">
              <Phone size={17} className="text-slate-400" />
              <input name="phone" value={profile.phone} onChange={update} placeholder="Enter phone number" className="w-full py-3 text-sm outline-none" />
            </span>
          </label>
          <label className="text-sm font-bold">Saved address
            <span className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 px-4">
              <MapPin size={17} className="text-slate-400" />
              <input name="address" value={profile.address} onChange={update} placeholder="Area, city and PIN code" className="w-full py-3 text-sm outline-none" />
            </span>
          </label>

          <div className="flex flex-wrap items-center justify-between gap-3 sm:col-span-2">
            {saved && <p className="text-sm font-semibold text-emerald-700">Preview form saved for this page session.</p>}
            <button className="ml-auto flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white hover:bg-blue-800"><Pencil size={16} /> Save profile preview</button>
          </div>
        </form>
      </section>

      <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <h2 className="font-black">Account preferences</h2>
        {[
          { icon: MapPin, title: "Saved addresses", description: "Keep frequently used service addresses handy." },
          { icon: Settings, title: "Notifications & security", description: "Account security options will be connected later." },
          { icon: LogOut, title: "Sign out", description: "Logout will be connected to token handling." },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button key={item.title} type="button" onClick={() => alert(`${item.title} will be implemented in a later step.`)} className="flex w-full items-center gap-3 border-b border-slate-100 py-4 text-left last:border-0">
              <span className="rounded-xl bg-slate-50 p-2.5 text-blue-700"><Icon size={19} /></span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold">{item.title}</span>
                <span className="mt-1 block text-xs text-slate-500">{item.description}</span>
              </span>
              <ChevronRight size={17} className="text-slate-400" />
            </button>
          );
        })}
      </section>
    </main>
  );
}