
import { useState } from "react";
import { motion } from "motion/react";
import {
  Search, Filter, MapPin, Clock3, Check, X,
  CalendarDays, BriefcaseBusiness, Wallet, TrendingUp,
  ArrowUpRight, Download, Star, UserRound, Phone, Mail,
  ShieldCheck, Save, BellRing, LockKeyhole, Globe,
  CircleDollarSign, CheckCircle2, Camera, Settings2
} from "lucide-react";

function PageHeading({ eyebrow, title, description, action }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-blue-700">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-tight">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
      </div>
      {action}
    </div>
  );
}

function DemoNotice() {
  return (
    <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-xs leading-5 text-blue-800">
      Preview mode: displayed records and amounts are sample data, not live bookings or earnings.
    </div>
  );
}

const initialRequests = [
  { id: "KS1024", customer: "Rahul Kumar", service: "Fan Installation", time: "Today · 11:00 AM", location: "Patia, Bhubaneswar", amount: 299, status: "Pending", initials: "RK" },
  { id: "KS1025", customer: "Priya Singh", service: "Switch Repair", time: "Today · 12:30 PM", location: "Saheed Nagar, Bhubaneswar", amount: 199, status: "Pending", initials: "PS" },
  { id: "KS1026", customer: "Amit Das", service: "Wiring Inspection", time: "Today · 3:00 PM", location: "Chandrasekharpur, Bhubaneswar", amount: 499, status: "Pending", initials: "AD" },
];

export function BookingRequests() {
  const [requests, setRequests] = useState(initialRequests);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const updateStatus = (id, status) => {
    setRequests((current) =>
      current.map((item) => item.id === id ? { ...item, status } : item)
    );
  };

  const visibleRequests = requests.filter((item) => {
    const matchesFilter = filter === "All" || item.status === filter;
    const matchesQuery = `${item.customer} ${item.service} ${item.id}`
      .toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <main className="mx-auto max-w-[1500px] px-4 py-7 sm:px-7 lg:px-9 lg:py-9">
      <PageHeading
        eyebrow="Manage incoming work"
        title="Booking Requests"
        description="Review customer requests and decide which jobs to take."
      />
      <DemoNotice />

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4">
          <Search size={19} className="text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search customer, service or booking ID"
            className="w-full py-3.5 text-sm outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={17} className="text-slate-500" />
          {["All", "Pending", "Accepted", "Declined"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-xl px-3 py-2.5 text-xs font-bold transition ${
                filter === item
                  ? "bg-blue-700 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-blue-50"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {visibleRequests.map((request, index) => (
          <motion.article
            key={request.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 font-black text-blue-700">
                {request.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-extrabold">{request.customer}</h3>
                  <span className="text-xs text-slate-400">#{request.id}</span>
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold ${
                    request.status === "Pending" ? "bg-amber-50 text-amber-700" :
                    request.status === "Accepted" ? "bg-emerald-50 text-emerald-700" :
                    "bg-red-50 text-red-700"
                  }`}>{request.status}</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{request.service}</p>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5"><Clock3 size={14} />{request.time}</span>
                  <span className="flex items-center gap-1.5"><MapPin size={14} />{request.location}</span>
                </div>
              </div>
              <div className="sm:text-right">
                <p className="text-xs text-slate-400">Estimated service amount</p>
                <p className="mt-1 text-2xl font-black">₹{request.amount}</p>
              </div>
            </div>

            {request.status === "Pending" && (
              <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4 sm:pl-[60px]">
                <button onClick={() => updateStatus(request.id, "Accepted")} className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-700">
                  <Check size={16} /> Accept request
                </button>
                <button onClick={() => updateStatus(request.id, "Declined")} className="flex items-center gap-2 rounded-xl border border-red-200 px-5 py-3 text-sm font-bold text-red-600 hover:bg-red-50">
                  <X size={16} /> Decline
                </button>
              </div>
            )}
          </motion.article>
        ))}

        {visibleRequests.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-sm text-slate-500">
            No matching booking requests.
          </div>
        )}
      </div>
    </main>
  );
}

const sampleJobs = [
  { id: "KS1019", customer: "Ananya Patel", service: "Light Installation", date: "Today · 9:30 AM", amount: 249, status: "Completed" },
  { id: "KS1024", customer: "Rahul Kumar", service: "Fan Installation", date: "Today · 11:00 AM", amount: 299, status: "Accepted" },
  { id: "KS1025", customer: "Priya Singh", service: "Switch Repair", date: "Today · 12:30 PM", amount: 199, status: "Accepted" },
  { id: "KS1008", customer: "Amit Das", service: "Wiring Inspection", date: "Yesterday · 3:00 PM", amount: 499, status: "Completed" },
];

export function MyJobs() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const jobs = sampleJobs.filter((job) =>
    (filter === "All" || job.status === filter) &&
    `${job.id} ${job.customer} ${job.service}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="mx-auto max-w-[1500px] px-4 py-7 sm:px-7 lg:px-9 lg:py-9">
      <PageHeading
        eyebrow="Your work schedule"
        title="My Jobs"
        description="Keep track of accepted bookings and completed work."
      />
      <DemoNotice />

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-3">
        {[
          { title: "All jobs", value: "12", icon: BriefcaseBusiness },
          { title: "In progress", value: "2", icon: Clock3 },
          { title: "Completed", value: "10", icon: CheckCircle2 },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5">
              <Icon className="text-blue-700" size={23} />
              <p className="mt-4 text-sm text-slate-500">{item.title}</p>
              <p className="mt-1 text-3xl font-black">{item.value}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search jobs..."
          className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
        />
        <div className="flex gap-2">
          {["All", "Accepted", "Completed"].map((item) => (
            <button key={item} onClick={() => setFilter(item)} className={`rounded-xl px-4 py-3 text-xs font-bold ${filter === item ? "bg-blue-700 text-white" : "border border-slate-200 bg-white text-slate-600"}`}>
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full min-w-[680px] text-left">
          <thead className="bg-slate-50 text-xs text-slate-500">
            <tr>
              <th className="px-5 py-4">Booking / Service</th>
              <th className="px-5 py-4">Customer</th>
              <th className="px-5 py-4">Schedule</th>
              <th className="px-5 py-4">Amount</th>
              <th className="px-5 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {jobs.map((job) => (
              <tr key={job.id}>
                <td className="px-5 py-4">
                  <p className="font-extrabold">{job.service}</p>
                  <p className="mt-1 text-xs text-slate-400">{job.id}</p>
                </td>
                <td className="px-5 py-4">{job.customer}</td>
                <td className="px-5 py-4 text-slate-500">{job.date}</td>
                <td className="px-5 py-4 font-extrabold">₹{job.amount}</td>
                <td className="px-5 py-4">
                  <span className={`rounded-full px-3 py-1.5 text-[10px] font-extrabold ${job.status === "Completed" ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"}`}>
                    {job.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {jobs.length === 0 && <p className="p-8 text-center text-sm text-slate-500">No jobs found.</p>}
      </div>
    </main>
  );
}

export function Earnings() {
  const [period, setPeriod] = useState("This month");

  const transactions = [
    { id: "TX2041", service: "Fan Installation", date: "10 Oct 2026", amount: 299, status: "Paid" },
    { id: "TX2038", service: "Switch Repair", date: "09 Oct 2026", amount: 199, status: "Paid" },
    { id: "TX2024", service: "Wiring Inspection", date: "07 Oct 2026", amount: 499, status: "Processing" },
    { id: "TX2017", service: "Light Installation", date: "05 Oct 2026", amount: 249, status: "Paid" },
  ];

  const bars = [35, 58, 43, 75, 53, 84, 64, 92, 61, 76, 49, 88];

  return (
    <main className="mx-auto max-w-[1500px] px-4 py-7 sm:px-7 lg:px-9 lg:py-9">
      <PageHeading
        eyebrow="Income overview"
        title="Earnings"
        description="Review your sample revenue and transaction history."
        action={
          <button onClick={() => window.print()} className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold hover:bg-slate-50">
            <Download size={17} /> Print report
          </button>
        }
      />
      <DemoNotice />

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-800 p-6 text-white shadow-lg shadow-blue-100">
          <Wallet size={24} />
          <p className="mt-5 text-sm text-blue-100">Total earnings · demo</p>
          <p className="mt-2 text-3xl font-black">₹18,450</p>
          <p className="mt-3 text-xs text-blue-100">Sample amount, not real payouts</p>
        </div>
        {[
          { label: "Pending payout", amount: "₹1,250", icon: Clock3 },
          { label: "Completed jobs", amount: "10", icon: CheckCircle2 },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-6">
              <Icon size={24} className="text-blue-700" />
              <p className="mt-5 text-sm text-slate-500">{item.label}</p>
              <p className="mt-2 text-3xl font-black">{item.amount}</p>
            </div>
          );
        })}
      </div>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-black">Earnings overview</h3>
            <p className="mt-1 text-xs text-slate-500">Illustrative monthly activity</p>
          </div>
          <select value={period} onChange={(e) => setPeriod(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold outline-none">
            <option>This month</option>
            <option>Last month</option>
            <option>Last 12 months</option>
          </select>
        </div>

        <div className="mt-8 flex h-52 items-end gap-2 border-b border-slate-200 pb-2 sm:gap-4">
          {bars.map((height, index) => (
            <motion.div
              key={`${period}-${index}`}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ delay: index * 0.03, duration: 0.35 }}
              title={`Sample period ${index + 1}`}
              className={`flex-1 rounded-t-md ${index === 7 ? "bg-blue-700" : "bg-blue-100 hover:bg-blue-300"}`}
            />
          ))}
        </div>
        <div className="mt-3 flex justify-between text-[10px] text-slate-400 sm:text-xs">
          <span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span>
        </div>
      </section>

      <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 p-5">
          <h3 className="text-lg font-black">Recent transactions</h3>
          <p className="mt-1 text-xs text-slate-500">Sample service payments.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-left">
            <thead className="bg-slate-50 text-xs text-slate-500">
              <tr>
                <th className="px-5 py-4">Transaction</th>
                <th className="px-5 py-4">Service</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {transactions.map((item) => (
                <tr key={item.id}>
                  <td className="px-5 py-4 text-xs text-slate-500">{item.id}</td>
                  <td className="px-5 py-4 font-semibold">{item.service}</td>
                  <td className="px-5 py-4 text-slate-500">{item.date}</td>
                  <td className="px-5 py-4 font-extrabold">₹{item.amount}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-3 py-1.5 text-[10px] font-extrabold ${item.status === "Paid" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export function ProviderProfile() {
  const [profile, setProfile] = useState({
    name: "Ramesh Kumar",
    business: "Ramesh Electrical Services",
    email: "ramesh@example.com",
    phone: "",
    city: "Bhubaneswar, Odisha",
    service: "Electrician",
    price: "199",
    bio: "Electrical installation, maintenance and repair services.",
  });
  const [saved, setSaved] = useState(false);

  const update = (event) => {
    setSaved(false);
    setProfile((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  };

  const fieldClass = "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50";

  return (
    <main className="mx-auto max-w-[1100px] px-4 py-7 sm:px-7 lg:px-9 lg:py-9">
      <PageHeading
        eyebrow="Your professional identity"
        title="My Profile"
        description="Maintain your business information and services."
      />
      <DemoNotice />

      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSaved(true);
        }}
        className="mt-6 space-y-6"
      >
        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-700 text-2xl font-black text-white">
              RK
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-black">Professional information</h3>
              <p className="mt-1 text-sm text-slate-500">Update your display and business details.</p>
            </div>
            <span className="flex items-center gap-2 self-start rounded-full bg-amber-50 px-3 py-2 text-xs font-bold text-amber-700">
              <ShieldCheck size={15} /> Demo verification status
            </span>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {[
              ["name", "Full name", "Your full name"],
              ["business", "Business name", "Your service business"],
              ["email", "Email address", "name@example.com"],
              ["phone", "Phone number", "Enter phone number"],
              ["city", "Service location", "City, state"],
              ["service", "Service category", "Your profession"],
              ["price", "Starting price (₹)", "199"],
            ].map(([name, label, placeholder]) => (
              <label key={name} className="block text-sm font-bold text-slate-700">
                {label}
                <input
                  name={name}
                  value={profile[name]}
                  onChange={update}
                  placeholder={placeholder}
                  className={fieldClass}
                />
              </label>
            ))}

            <label className="block text-sm font-bold text-slate-700 sm:col-span-2">
              About your services
              <textarea
                name="bio"
                value={profile.bio}
                onChange={update}
                rows={4}
                className={fieldClass}
              />
            </label>
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-3">
          {saved && <p className="text-sm font-semibold text-emerald-700">Preview form saved locally for this page session.</p>}
          <button type="submit" className="ml-auto flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-3.5 text-sm font-extrabold text-white hover:bg-blue-800">
            <Save size={17} /> Save profile preview
          </button>
        </div>
      </form>
    </main>
  );
}

export function ProviderSettings() {
  const [settings, setSettings] = useState({
    bookingAlerts: true,
    emailUpdates: true,
    publicProfile: true,
    onlineStatus: true,
  });

  const toggle = (key) => setSettings((old) => ({ ...old, [key]: !old[key] }));

  const switches = [
    { key: "bookingAlerts", title: "Booking notifications", description: "Show alerts for new customer requests.", icon: BellRing },
    { key: "emailUpdates", title: "Email updates", description: "Receive account and activity updates by email.", icon: Mail },
    { key: "publicProfile", title: "Public profile visibility", description: "Allow customers to find your professional profile.", icon: Globe },
    { key: "onlineStatus", title: "Available for work", description: "Display that you are currently open to requests.", icon: CheckCircle2 },
  ];

  return (
    <main className="mx-auto max-w-[1000px] px-4 py-7 sm:px-7 lg:px-9 lg:py-9">
      <PageHeading
        eyebrow="Preferences and account"
        title="Settings"
        description="Control your workspace preferences in this UI preview."
      />
      <DemoNotice />

      <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 p-5 sm:p-6">
          <h3 className="text-lg font-black">Preferences</h3>
          <p className="mt-1 text-sm text-slate-500">Switch these preview settings on or off.</p>
        </div>

        <div className="divide-y divide-slate-100">
          {switches.map((item) => {
            const Icon = item.icon;
            const enabled = settings[item.key];

            return (
              <div key={item.key} className="flex items-center gap-4 p-5 sm:p-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <Icon size={21} />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-extrabold">{item.title}</h4>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{item.description}</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={enabled}
                  aria-label={item.title}
                  onClick={() => toggle(item.key)}
                  className={`relative h-7 w-12 shrink-0 rounded-full transition ${enabled ? "bg-blue-700" : "bg-slate-300"}`}
                >
                  <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${enabled ? "left-6" : "left-1"}`} />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-amber-50 p-3 text-amber-700">
            <LockKeyhole size={22} />
          </div>
          <div>
            <h3 className="font-extrabold">Security & account access</h3>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Password changes, active sessions and account recovery will be connected when the security APIs are added.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}