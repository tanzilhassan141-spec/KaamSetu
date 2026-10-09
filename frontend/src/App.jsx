
import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  Droplets,
  House,
  MapPin,
  Menu,
  Paintbrush,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Wind,
  Wrench,
  X,
  Zap,
} from "lucide-react";

const services = [
  {
    name: "Plumbing",
    detail: "Leaks, taps & repairs",
    price: "₹199",
    icon: Droplets,
    color: "bg-cyan-50 text-cyan-700",
  },
  {
    name: "Electrical",
    detail: "Switches, wiring & fixes",
    price: "₹199",
    icon: Zap,
    color: "bg-amber-50 text-amber-700",
  },
  {
    name: "AC service",
    detail: "Cooling, cleaning & repair",
    price: "₹399",
    icon: Wind,
    color: "bg-sky-50 text-sky-700",
  },
  {
    name: "Home cleaning",
    detail: "A fresh, spotless home",
    price: "₹299",
    icon: Sparkles,
    color: "bg-violet-50 text-violet-700",
  },
  {
    name: "Painting",
    detail: "Give your walls new life",
    price: "₹499",
    icon: Paintbrush,
    color: "bg-rose-50 text-rose-700",
  },
  {
    name: "Home repairs",
    detail: "Small fixes, done right",
    price: "₹249",
    icon: Wrench,
    color: "bg-emerald-50 text-emerald-700",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function App() {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const filteredServices = services.filter((service) =>
    `${service.name} ${service.detail}`
      .toLowerCase()
      .includes(query.trim().toLowerCase())
  );

  const exploreServices = () => {
    document.getElementById("services")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] text-slate-900">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#home" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lime-400 text-xl font-black text-slate-950 shadow-lg shadow-lime-200/60">
              K
            </span>
            <span>
              <span className="block text-xl font-black tracking-tight">
                KaamSetu<span className="text-lime-600">.</span>
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Help is closer
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            <a href="#services" className="text-sm font-semibold text-slate-600 transition hover:text-lime-700">
              Explore services
            </a>
            <a href="#how-it-works" className="text-sm font-semibold text-slate-600 transition hover:text-lime-700">
              How it works
            </a>
            <a href="#become-pro" className="text-sm font-semibold text-slate-600 transition hover:text-lime-700">
              Become a pro
            </a>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => setNotice("Login screen integration is our next step.")}
              className="rounded-full px-4 py-2.5 text-sm font-bold transition hover:bg-slate-100"
            >
              Sign in
            </button>
            <button
              onClick={() => setNotice("Registration screen integration is coming next.")}
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-lime-500 hover:text-slate-950"
            >
              Get started <span className="ml-1">↗</span>
            </button>
          </div>

          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-xl border border-slate-200 p-2 md:hidden"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </nav>

        {menuOpen && (
          <div className="space-y-1 border-t border-slate-100 bg-white px-5 py-4 md:hidden">
            {[
              ["Explore services", "#services"],
              ["How it works", "#how-it-works"],
              ["Become a pro", "#become-pro"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl px-3 py-3 font-semibold hover:bg-lime-50"
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="relative isolate overflow-hidden bg-[#101a2b] text-white">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[440px] w-[440px] rounded-full bg-lime-400/10 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-teal-400/10 blur-[90px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={reveal}
            transition={{ duration: 0.65, staggerChildren: 0.12 }}
          >
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm text-slate-200">
              <span className="h-2 w-2 rounded-full bg-lime-400 shadow-[0_0_12px_#a3e635]" />
              Your neighbourhood, your trusted experts
            </div>

            <h1 className="max-w-2xl text-5xl font-black leading-[1.04] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Great help.
              <br />
              <span className="text-lime-400">Right at home.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-slate-300 sm:text-lg">
              From a leaking tap to a cooler summer. Discover trusted local
              professionals who make everyday problems feel easy.
            </p>

            <div className="mt-8 flex flex-wrap gap-5 text-sm font-medium text-slate-300">
              <span className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-lime-400" />
                Verified professionals
              </span>
              <span className="flex items-center gap-2">
                <BadgeCheck size={18} className="text-lime-400" />
                Transparent pricing
              </span>
            </div>

            {/* Search */}
            <div className="mt-10 rounded-2xl bg-white p-2.5 shadow-2xl shadow-black/20 sm:flex sm:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-3 px-3 py-3">
                <Search size={21} className="shrink-0 text-slate-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") exploreServices();
                  }}
                  placeholder="What do you need help with?"
                  aria-label="Search services"
                  className="w-full min-w-0 bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
              <button
                onClick={exploreServices}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-lime-400 px-6 py-4 font-extrabold text-slate-950 transition hover:bg-lime-300 sm:w-auto"
              >
                Find a pro <ArrowRight size={18} />
              </button>
            </div>

            <p className="mt-4 text-xs text-slate-400">
              Try searching for plumbing, electrical, cleaning or AC service.
            </p>
          </motion.div>

          {/* Animated booking card illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, x: 24 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto w-full max-w-[470px]"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative overflow-hidden rounded-[30px] border border-white/15 bg-white/[0.07] p-5 shadow-2xl backdrop-blur-xl sm:p-7"
            >
              <div className="absolute -right-10 -top-14 h-40 w-40 rounded-full bg-lime-400/10 blur-2xl" />

              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-300">Your next booking</p>
                  <h2 className="mt-1 text-2xl font-extrabold">Sorted in minutes.</h2>
                </div>
                <div className="rounded-2xl bg-lime-400 p-3 text-slate-950">
                  <CalendarCheck size={25} />
                </div>
              </div>

              <div className="relative mt-7 rounded-2xl bg-white p-4 text-slate-900">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                    <Wrench size={32} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Home service
                    </p>
                    <h3 className="mt-1 text-lg font-extrabold">Expert plumber</h3>
                    <div className="mt-2 flex items-center gap-1 text-sm">
                      <Star size={15} fill="#eab308" className="text-yellow-500" />
                      <strong>4.9</strong>
                      <span className="text-slate-400">(120+ reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="my-5 flex items-center gap-3 border-y border-dashed border-slate-200 py-4 text-sm text-slate-500">
                  <span className="flex items-center gap-2">
                    <Clock3 size={16} /> Flexible timing
                  </span>
                  <span className="h-1 w-1 rounded-full bg-slate-300" />
                  <span className="flex items-center gap-2">
                    <ShieldCheck size={16} /> Verified profile
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">Starting from</p>
                    <p className="text-2xl font-black">₹199</p>
                  </div>
                  <span className="rounded-full bg-lime-100 px-4 py-2 text-xs font-extrabold text-lime-800">
                    Book with confidence
                  </span>
                </div>
              </div>

              <div className="relative mt-5 grid grid-cols-3 gap-2 text-center">
                {[
                  ["10k+", "Happy users"],
                  ["500+", "Local pros"],
                  ["4.9/5", "Avg. rating"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-xl bg-white/[0.06] px-2 py-4">
                    <p className="text-xl font-black text-lime-400">{value}</p>
                    <p className="mt-1 text-[10px] text-slate-300 sm:text-xs">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 7, 0], rotate: [0, 1, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -left-5 top-20 hidden items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3.5 text-slate-900 shadow-xl sm:flex"
            >
              <div className="rounded-xl bg-lime-100 p-2.5 text-lime-800">
                <CheckCircle2 size={21} />
              </div>
              <div>
                <p className="text-sm font-extrabold">Quality checked</p>
                <p className="text-xs text-slate-500">Trust starts here</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity }}
              className="absolute -bottom-5 -right-2 hidden items-center gap-2 rounded-2xl bg-lime-400 px-4 py-3 font-bold text-slate-950 shadow-xl sm:flex"
            >
              <Sparkles size={19} />
              <span className="text-sm">Your time matters.</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-5 py-6 text-sm font-semibold text-slate-500 sm:justify-between lg:px-8">
          <span className="flex items-center gap-2"><ShieldCheck size={18} className="text-lime-700" /> Verified profiles</span>
          <span className="flex items-center gap-2"><CheckCircle2 size={18} className="text-lime-700" /> Clear pricing</span>
          <span className="flex items-center gap-2"><Clock3 size={18} className="text-lime-700" /> Convenient bookings</span>
          <span className="flex items-center gap-2"><House size={18} className="text-lime-700" /> Local expertise</span>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={reveal}
          transition={{ duration: 0.55 }}
          className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-lime-700">
              Help for every home
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
              What can we fix <span className="text-slate-400">today?</span>
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-slate-500">
              Find the right professional for the little things and the big jobs.
            </p>
          </div>
          <span className="text-sm font-semibold text-slate-400">
            {filteredServices.length} services shown
          </span>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.name}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                whileHover={{ y: -6 }}
                className="group rounded-3xl border border-slate-200/80 bg-white p-6 transition-shadow hover:shadow-xl hover:shadow-slate-200/60 sm:p-7"
              >
                <div className="flex items-start justify-between">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${service.color}`}>
                    <Icon size={27} />
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="text-slate-300 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-lime-700"
                  />
                </div>

                <h3 className="mt-6 text-xl font-extrabold">{service.name}</h3>
                <p className="mt-2 text-sm text-slate-500">{service.detail}</p>

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                  <div>
                    <p className="text-xs text-slate-400">Starting at</p>
                    <p className="mt-1 text-lg font-black">{service.price}</p>
                  </div>
                  <button
                    onClick={() => setNotice(`${service.name} booking will be connected to the backend next.`)}
                    className="rounded-full bg-slate-100 px-4 py-2.5 text-sm font-bold transition hover:bg-lime-400"
                  >
                    Explore
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <Search className="mx-auto text-slate-400" size={32} />
            <h3 className="mt-4 text-xl font-bold">No matching services</h3>
            <p className="mt-2 text-slate-500">Try a different service name.</p>
            <button
              onClick={() => setQuery("")}
              className="mt-5 rounded-full bg-slate-900 px-5 py-3 font-bold text-white"
            >
              Show all services
            </button>
          </div>
        )}
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-lime-700">
              Simple by design
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
              Three steps. One less worry.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Find your service",
                text: "Search for the help you need and explore service options.",
                icon: Search,
              },
              {
                number: "02",
                title: "Choose your pro",
                text: "Compare profiles, reviews and pricing before deciding.",
                icon: BadgeCheck,
              },
              {
                number: "03",
                title: "Get it done",
                text: "Arrange a convenient time and get on with your day.",
                icon: CalendarCheck,
              },
            ].map((step) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45 }}
                  className="rounded-3xl bg-[#f6f8f4] p-7 sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black tracking-widest text-lime-800">{step.number}</span>
                    <span className="rounded-2xl bg-white p-3 text-lime-800 shadow-sm">
                      <Icon size={23} />
                    </span>
                  </div>
                  <h3 className="mt-9 text-xl font-extrabold">{step.title}</h3>
                  <p className="mt-3 leading-7 text-slate-500">{step.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Become a pro */}
      <section id="become-pro" className="px-5 py-20 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-lime-400 px-7 py-12 sm:px-12 sm:py-16 lg:px-16">
          <div className="absolute -right-10 -top-20 h-72 w-72 rounded-full border-[45px] border-black/[0.04]" />
          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-lime-950/70">
                Built for local talent
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
                Your skills deserve more customers.
              </h2>
              <p className="mt-4 max-w-xl leading-7 text-slate-800/80">
                Join the KaamSetu community and help more people in your neighbourhood.
              </p>
            </div>
            <button
              onClick={() => setNotice("Provider registration will be connected next.")}
              className="inline-flex shrink-0 items-center justify-center gap-3 self-start rounded-full bg-slate-950 px-7 py-4 font-extrabold text-white transition hover:bg-slate-800 md:self-center"
            >
              Join as a professional <ArrowRight size={19} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#101a2b] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <a href="#home" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400 font-black text-slate-950">
              K
            </span>
            <span className="text-xl font-black">
              KaamSetu<span className="text-lime-400">.</span>
            </span>
          </a>
          <p className="text-sm text-slate-400">
            Making everyday services feel effortless.
          </p>
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} KaamSetu. Built with care.
          </p>
        </div>
      </footer>

      {/* Small interaction notice */}
      {notice && (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 z-[60] flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-start gap-3 rounded-2xl bg-slate-950 px-5 py-4 text-white shadow-2xl"
        >
          <div className="mt-0.5 text-lime-400"><Sparkles size={20} /></div>
          <p className="flex-1 text-sm leading-6">{notice}</p>
          <button onClick={() => setNotice("")} aria-label="Dismiss notice">
            <X size={18} className="text-slate-400 hover:text-white" />
          </button>
        </div>
      )}

      <div className="fixed bottom-0 left-0 h-1 w-full origin-left bg-lime-400" />
      <div className="sr-only">
        <MapPin />
      </div>
    </div>
  );
}

export default App;