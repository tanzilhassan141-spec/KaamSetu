
import { motion } from "motion/react";
import {
  CalendarDays,
  ClipboardList,
  Wallet,
  Star,
  Clock3,
  MapPin,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

const stats = [
  { title: "Today's jobs", value: "4", detail: "Sample job count", icon: CalendarDays, color: "bg-blue-50 text-blue-700" },
  { title: "New requests", value: "3", detail: "Sample requests", icon: ClipboardList, color: "bg-violet-50 text-violet-700" },
  { title: "Monthly earnings", value: "₹3,450", detail: "Demo amount", icon: Wallet, color: "bg-emerald-50 text-emerald-700" },
  { title: "Average rating", value: "4.8", detail: "Sample rating", icon: Star, color: "bg-amber-50 text-amber-700" },
];

const jobs = [
  { id: "KS1024", customer: "Rahul Kumar", service: "Fan Installation", time: "11:00 AM", location: "Patia, Bhubaneswar", price: 299 },
  { id: "KS1025", customer: "Priya Singh", service: "Switch Repair", time: "12:30 PM", location: "Saheed Nagar, Bhubaneswar", price: 199 },
  { id: "KS1026", customer: "Amit Das", service: "Wiring Inspection", time: "3:00 PM", location: "Chandrasekharpur", price: 499 },
];

export default function ProviderDashboard() {
  return (
    <main className="mx-auto max-w-[1500px] px-4 py-7 sm:px-7 lg:px-9 lg:py-9">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-blue-700">
            Your workspace
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
            Good morning, Professional 👋
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Here's your activity overview. Make today a great workday.
          </p>
        </div>

        <span className="flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-4 py-2.5 text-xs font-extrabold text-emerald-700">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Demo availability: Online
        </span>
      </motion.div>

      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4">
        <ShieldCheck size={20} className="mt-0.5 shrink-0 text-blue-700" />
        <div>
          <p className="text-sm font-extrabold text-blue-900">Dashboard preview</p>
          <p className="mt-1 text-xs leading-5 text-blue-800/80">
            Numbers and booking details below are sample data, not live customer records.
          </p>
        </div>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.article
              key={stat.title}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
            >
              <div className="flex items-start justify-between">
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.color}`}>
                  <Icon size={21} />
                </span>
                <ArrowUpRight size={17} className="text-slate-300" />
              </div>
              <p className="mt-5 text-xs font-semibold text-slate-500 sm:text-sm">{stat.title}</p>
              <p className="mt-1 text-2xl font-black sm:text-3xl">{stat.value}</p>
              <p className="mt-2 text-[11px] text-slate-400">{stat.detail}</p>
            </motion.article>
          );
        })}
      </div>

      <div className="mt-8 grid items-start gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 p-5">
            <div>
              <h3 className="text-lg font-black">Recent booking requests</h3>
              <p className="mt-1 text-xs text-slate-500">A quick overview of sample requests.</p>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-extrabold text-blue-700">
              {jobs.length} demo
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {jobs.map((job) => (
              <article key={job.id} className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-extrabold">{job.customer}</h4>
                    <p className="mt-1 text-sm text-slate-600">{job.service}</p>
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock3 size={14} /> Today, {job.time}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin size={14} /> {job.location}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-base font-black">₹{job.price}</p>
                    <p className="mt-1 text-[10px] text-slate-400">{job.id}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <h3 className="text-lg font-black">Today&apos;s schedule</h3>
          <p className="mt-1 text-xs text-slate-500">Sample work schedule</p>

          <div className="mt-5 space-y-4">
            {jobs.map((job, index) => (
              <div key={job.id} className="flex gap-3">
                <div className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${index === 0 ? "bg-emerald-500" : "bg-blue-600"}`} />
                <div className="flex-1 border-b border-slate-100 pb-4">
                  <p className="text-xs font-bold text-slate-500">{job.time}</p>
                  <p className="mt-1 text-sm font-extrabold">{job.service}</p>
                  <p className="mt-1 text-xs text-slate-500">{job.customer}</p>
                  {index === 0 && (
                    <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-extrabold text-emerald-700">
                      <CheckCircle2 size={12} /> Demo completed
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}