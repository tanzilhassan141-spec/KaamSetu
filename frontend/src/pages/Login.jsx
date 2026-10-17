
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError(false);

    if (!email.trim() || !password) {
      setError(true);
      setMessage("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5001/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(true);
        setMessage(data.message || "Login failed. Please try again.");
        return;
      }

      sessionStorage.setItem("kaamsetu_token", data.token);
      sessionStorage.setItem("kaamsetu_user", JSON.stringify(data.user));

      setMessage(`Welcome back, ${data.user.name}! Login successful.`);
    } catch {
      setError(true);
      setMessage(
        "Unable to connect to the server. Please check your backend."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#090d12] px-4 py-8 text-white sm:px-8">
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-teal-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 22, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="relative grid w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-[#0d1218] shadow-2xl shadow-black/40 lg:min-h-[690px] lg:grid-cols-2"
      >
        {/* Left branding panel */}
        <section className="relative flex min-h-[300px] flex-col justify-between overflow-hidden bg-gradient-to-br from-[#101d20] via-[#091211] to-[#07100f] p-7 sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full border border-teal-400/10" />
          <div className="pointer-events-none absolute -right-10 top-20 h-44 w-44 rounded-full border border-teal-400/10" />

          <Link to="/" className="relative flex w-fit items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-300 to-emerald-500 text-xl font-black text-slate-950">
              K
            </span>
            <span className="text-xl font-extrabold tracking-tight">
              KaamSetu<span className="text-teal-400">.</span>
            </span>
          </Link>

          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative my-10 lg:my-0"
          >
            <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-teal-300">
              <Sparkles size={15} />
              Your neighbourhood, connected
            </p>

            <h1 className="text-4xl font-black leading-[1.06] tracking-[-0.05em] sm:text-5xl xl:text-6xl">
              LET&apos;S CONNECT
              <br />
              <span className="text-slate-100">WITH YOUR</span>
              <br />
              <span className="bg-gradient-to-r from-teal-300 via-emerald-300 to-slate-500 bg-clip-text text-transparent">
                LOCAL EXPERTS.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-sm leading-7 text-slate-400 sm:text-base">
              From everyday fixes to bigger jobs, find trusted local
              professionals and make life a little easier.
            </p>
          </motion.div>

          <div className="relative flex items-center gap-3 border-t border-white/10 pt-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-400/10 text-teal-300">
              <ShieldCheck size={22} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-200">
                Help you can feel good about
              </p>
              <p className="mt-1 text-xs text-slate-500">
                A simpler way to find local services
              </p>
            </div>
          </div>
        </section>

        {/* Right login panel */}
        <section className="flex items-center justify-center bg-[#0c1016] px-6 py-10 sm:px-10 lg:px-12">
          <div className="w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="mb-8 text-center"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-teal-300/20 bg-teal-300/10 text-teal-300">
                <LockKeyhole size={26} />
              </div>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Welcome Back
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Sign in to your account and get things done.
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              onSubmit={handleSubmit}
              className="rounded-3xl border border-white/10 bg-white/[0.025] p-5 shadow-xl shadow-black/10 sm:p-7"
            >
              <div className="mb-7 rounded-full border border-teal-400/20 bg-teal-400/[0.06] p-1">
                <div className="rounded-full border border-teal-400/70 px-4 py-2.5 text-center text-sm font-semibold text-teal-300">
                  <Mail className="mr-2 inline-block" size={16} />
                  Email account
                </div>
              </div>

              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Email address
              </label>

              <div className="group flex items-center gap-3 rounded-2xl border border-white/15 bg-black/20 px-4 transition focus-within:border-teal-400 focus-within:ring-4 focus-within:ring-teal-400/10">
                <Mail size={19} className="shrink-0 text-slate-500 transition group-focus-within:text-teal-300" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-slate-600"
                />
              </div>

              <div className="mb-2 mt-6 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-200"
                >
                  Password
                </label>
              </div>

              <div className="group flex items-center gap-3 rounded-2xl border border-white/15 bg-black/20 px-4 transition focus-within:border-teal-400 focus-within:ring-4 focus-within:ring-teal-400/10">
                <LockKeyhole size={19} className="shrink-0 text-slate-500 transition group-focus-within:text-teal-300" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="w-full min-w-0 bg-transparent py-4 text-sm text-white outline-none placeholder:text-slate-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="shrink-0 text-slate-500 transition hover:text-teal-300"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>

              <div className="mt-3 flex justify-end">
                <span className="cursor-not-allowed text-xs text-slate-500" title="Password recovery will be added later">
                  Forgot password?
                </span>
              </div>

              {message && (
                <div
                  role="status"
                  className={`mt-5 rounded-xl border p-3 text-sm leading-6 ${
                    error
                      ? "border-red-500/30 bg-red-500/10 text-red-300"
                      : "border-teal-400/30 bg-teal-400/10 text-teal-200"
                  }`}
                >
                  {message}
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                disabled={loading}
                type="submit"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-teal-400 to-emerald-400 px-5 py-4 text-sm font-extrabold text-slate-950 shadow-lg shadow-teal-500/10 transition hover:brightness-110 disabled:cursor-wait disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign In Now"}
                {!loading && <ArrowRight size={18} />}
              </motion.button>

              <p className="mt-6 text-center text-sm text-slate-400">
                New to KaamSetu?{" "}
                <Link
                  to="/register"
                  className="font-bold text-teal-300 transition hover:text-teal-200"
                >
                  Create an account
                </Link>
              </p>
            </motion.form>

            <p className="mt-7 text-center text-xs text-slate-600">
              © {new Date().getFullYear()} KaamSetu. Made for your neighbourhood.
            </p>
          </div>
        </section>
      </motion.div>
    </main>
  );
}