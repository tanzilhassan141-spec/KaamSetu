
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowRight,
  BadgeCheck,
  Eye,
  EyeOff,
  House,
  LockKeyhole,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const updateField = (event) => {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setSuccess(false);

    if (form.password.length < 6) {
      setMessage("Password must contain at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5001/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name.trim(),
            email: form.email.trim().toLowerCase(),
            phone: form.phone.trim(),
            password: form.password,
            role: form.role,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Registration failed. Please try again.");
        return;
      }

      setSuccess(true);
      setMessage("Your KaamSetu account has been created successfully.");

      setForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "user",
      });
    } catch {
      setMessage(
        "Unable to connect to the server. Please try again after checking the backend."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full min-w-0 bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-slate-500";

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#091016] px-4 py-8 text-white sm:px-6">
      <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-teal-400/10 blur-[110px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55 }}
        className="relative grid w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-[#0d131a] shadow-2xl lg:grid-cols-2"
      >
        {/* Left branding panel */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[#102622] via-[#0b1717] to-[#091016] p-10 lg:flex xl:p-14">
          <div className="absolute -right-20 top-24 h-64 w-64 rounded-full border border-teal-300/10" />
          <div className="absolute -right-8 top-36 h-40 w-40 rounded-full border border-teal-300/10" />

          <Link to="/" className="relative flex w-fit items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-300 to-emerald-500 text-xl font-black text-slate-950">
              <House size={23} />
            </span>
            <span className="text-xl font-black">
              KaamSetu<span className="text-teal-300">.</span>
            </span>
          </Link>

          <div className="relative my-12">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-300">
              Your skills. Your neighbourhood.
            </p>

            <h1 className="mt-6 text-5xl font-black leading-[1.08] tracking-tight xl:text-6xl">
              LET&apos;S BUILD
              <br />
              <span className="text-white">SOMETHING</span>
              <br />
              <span className="bg-gradient-to-r from-teal-300 to-emerald-500 bg-clip-text text-transparent">
                BETTER.
              </span>
            </h1>

            <p className="mt-6 max-w-sm leading-7 text-slate-400">
              Connect with trusted local professionals or grow your work
              by reaching more customers through KaamSetu.
            </p>
          </div>

          <div className="relative flex items-center gap-3 border-t border-white/10 pt-5">
            <BadgeCheck size={25} className="text-teal-300" />
            <div>
              <p className="text-sm font-bold">A community built on trust</p>
              <p className="mt-1 text-xs text-slate-500">
                One account, new possibilities.
              </p>
            </div>
          </div>
        </section>

        {/* Registration form */}
        <section className="flex items-center justify-center px-5 py-9 sm:px-10 lg:px-12">
          <div className="w-full max-w-md">
            <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-teal-300 transition hover:text-teal-200 lg:hidden">
              <House size={18} /> KaamSetu
            </Link>

            <div className="mb-7 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-teal-300/20 bg-teal-300/10 text-teal-300">
                <UserRound size={27} />
              </div>

              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                Create Account
              </h2>

              <p className="mt-3 text-sm text-slate-400">
                Join KaamSetu and get started today.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-white/10 bg-white/[0.025] p-5 sm:p-7"
            >
              <div className="mb-5">
                <p className="mb-3 text-sm font-semibold text-slate-200">
                  I want to join as
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "user", title: "Customer", detail: "Book local services" },
                    { value: "provider", title: "Professional", detail: "Offer your services" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        setForm((previous) => ({
                          ...previous,
                          role: option.value,
                        }))
                      }
                      className={`rounded-2xl border p-3 text-left transition ${
                        form.role === option.value
                          ? "border-teal-300 bg-teal-300/[0.08] ring-2 ring-teal-300/10"
                          : "border-white/10 bg-black/10 hover:border-white/20"
                      }`}
                    >
                      <span className={`block text-sm font-extrabold ${
                        form.role === option.value ? "text-teal-300" : "text-white"
                      }`}>
                        {option.title}
                      </span>
                      <span className="mt-1 block text-[11px] leading-4 text-slate-400">
                        {option.detail}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <label htmlFor="register-name" className="mb-2 block text-sm font-medium text-slate-200">
                Full name
              </label>
              <div className="mb-4 flex items-center gap-3 rounded-xl border border-white/15 bg-black/20 px-3.5 transition focus-within:border-teal-300">
                <UserRound size={18} className="shrink-0 text-slate-500" />
                <input
                  id="register-name"
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={updateField}
                  placeholder="Enter your full name"
                  required
                  maxLength={80}
                  className={inputClass}
                />
              </div>

              <label htmlFor="register-email" className="mb-2 block text-sm font-medium text-slate-200">
                Email address
              </label>
              <div className="mb-4 flex items-center gap-3 rounded-xl border border-white/15 bg-black/20 px-3.5 transition focus-within:border-teal-300">
                <Mail size={18} className="shrink-0 text-slate-500" />
                <input
                  id="register-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={updateField}
                  placeholder="you@example.com"
                  required
                  className={inputClass}
                />
              </div>

              <label htmlFor="register-phone" className="mb-2 block text-sm font-medium text-slate-200">
                Phone number
              </label>
              <div className="mb-4 flex items-center gap-3 rounded-xl border border-white/15 bg-black/20 px-3.5 transition focus-within:border-teal-300">
                <Phone size={18} className="shrink-0 text-slate-500" />
                <input
                  id="register-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={updateField}
                  placeholder="Enter your phone number"
                  required
                  maxLength={20}
                  className={inputClass}
                />
              </div>

              <label htmlFor="register-password" className="mb-2 block text-sm font-medium text-slate-200">
                Password
              </label>
              <div className="mb-4 flex items-center gap-3 rounded-xl border border-white/15 bg-black/20 px-3.5 transition focus-within:border-teal-300">
                <LockKeyhole size={18} className="shrink-0 text-slate-500" />
                <input
                  id="register-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={form.password}
                  onChange={updateField}
                  placeholder="At least 6 characters"
                  minLength={6}
                  required
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="shrink-0 text-slate-500 hover:text-teal-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <label htmlFor="register-confirm" className="mb-2 block text-sm font-medium text-slate-200">
                Confirm password
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-black/20 px-3.5 transition focus-within:border-teal-300">
                <LockKeyhole size={18} className="shrink-0 text-slate-500" />
                <input
                  id="register-confirm"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={form.confirmPassword}
                  onChange={updateField}
                  placeholder="Enter password again"
                  required
                  className={inputClass}
                />
              </div>

              {message && (
                <div
                  role="status"
                  className={`mt-4 rounded-xl border p-3 text-sm leading-6 ${
                    success
                      ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                      : "border-red-400/30 bg-red-400/10 text-red-200"
                  }`}
                >
                  {message}
                  {success && (
                    <div className="mt-2">
                      <Link to="/login" className="font-bold text-teal-300 underline underline-offset-4">
                        Continue to sign in
                      </Link>
                    </div>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 px-5 py-4 text-sm font-extrabold text-slate-950 transition hover:brightness-110 disabled:cursor-wait disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Create Account"}
                {!loading && <ArrowRight size={18} />}
              </button>

              <p className="mt-6 text-center text-sm text-slate-400">
                Already have an account?{" "}
                <Link to="/login" className="font-bold text-teal-300 hover:text-teal-200">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </section>
      </motion.div>
    </main>
  );
}