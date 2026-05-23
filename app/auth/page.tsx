"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Eye, EyeOff, Loader2, Mail, Lock, User, Phone,
  ArrowLeft, ShieldCheck, Stethoscope, Heart,
} from "lucide-react";

type Tab = "login" | "signup";

export default function AuthPage() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<Tab>((searchParams.get("tab") as Tab) ?? "login");

  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [showPw, setShowPw]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const switchTab = (t: Tab) => {
    setTab(t);
    setError("");
    setSuccess("");
    setForm({ name: "", email: "", password: "", phone: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const endpoint = tab === "login" ? "/api/user/login" : "/api/user/register";
    const body     = tab === "login"
      ? { email: form.email, password: form.password }
      : { name: form.name, email: form.email, password: form.password, phone: form.phone };

    const res  = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setSuccess(tab === "login"
        ? `Welcome back, ${data.name}!`
        : `Account created! Welcome, ${data.name}!`
      );
      setTimeout(() => router.push("/"), 1200);
    } else {
      setError(data.error ?? "Something went wrong.");
    }
  };

  const inputCls =
    "w-full pl-11 pr-4 py-3.5 rounded-xl text-sm text-gray-800 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent focus:bg-white transition-all placeholder:text-gray-400";

  return (
    <div className="min-h-screen flex" style={{ background: "#f0f6ff" }}>

      {/* ── Left panel (decorative) — hidden on mobile ── */}
      <div
        className="hidden lg:flex flex-col justify-between w-[46%] p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(155deg,#1e3a8a 0%,#1d4ed8 50%,#0369a1 100%)" }}
      >
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-20"
          style={{ background: "radial-gradient(circle,#38bdf8,transparent)" }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-15"
          style={{ background: "radial-gradient(circle,#0ea5e9,transparent)" }} />

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 relative">
          <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center">
            <Stethoscope size={18} className="text-white" />
          </div>
          <div>
            <div className="font-black text-white text-base">Jeevanasri</div>
            <div className="text-[9px] font-black tracking-widest text-blue-200">HOSPITALS · NABH</div>
          </div>
        </Link>

        {/* Centre content */}
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black tracking-wider text-sky-300 mb-6"
            style={{ background: "rgba(14,165,233,0.15)", border: "1px solid rgba(14,165,233,0.25)" }}>
            Patient Portal
          </div>
          <h2 className="text-4xl font-black text-white leading-tight mb-4">
            Your health,<br />
            <span style={{ color: "#38bdf8" }}>simplified.</span>
          </h2>
          <p className="text-blue-200/80 text-base leading-relaxed mb-8">
            Create an account to track your appointments, access medical information, and connect with our specialists.
          </p>

          {/* Feature chips */}
          {[
            { icon: Heart,       text: "Book & track appointments" },
            { icon: ShieldCheck, text: "Secure & private health records" },
            { icon: Stethoscope, text: "Connect with 40+ specialists" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <Icon size={14} className="text-sky-300" />
              </div>
              <span className="text-blue-100/90 text-sm font-semibold">{text}</span>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-blue-300/50 text-xs relative">
          Signing in is optional. You can browse and contact us without an account.
        </p>
      </div>

      {/* ── Right panel (form) ── */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-10">

        {/* Back link */}
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-blue-600 font-semibold mb-8 transition-colors self-start">
          <ArrowLeft size={15} />
          Back to home
        </Link>

        <div className="w-full max-w-md mx-auto">

          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)" }}>
              <Stethoscope size={18} className="text-white" />
            </div>
            <div>
              <div className="font-black text-gray-900">Jeevanasri Hospitals</div>
              <div className="text-xs text-gray-400">Patient Portal</div>
            </div>
          </div>

          <h1 className="text-2xl font-black text-gray-900 mb-1">
            {tab === "login" ? "Welcome back" : "Create account"}
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            {tab === "login"
              ? "Sign in to access your patient portal."
              : "It's free and only takes a minute. No spam, ever."}
          </p>

          {/* Tabs */}
          <div className="flex rounded-2xl p-1 mb-7" style={{ background: "#e8f0fe" }}>
            {(["login", "signup"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => switchTab(t)}
                className="flex-1 py-2.5 rounded-xl text-sm font-black transition-all duration-200"
                style={
                  tab === t
                    ? { background: "white", color: "#1d4ed8", boxShadow: "0 2px 8px rgba(29,78,216,0.12)" }
                    : { color: "#6b7280" }
                }
              >
                {t === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name — signup only */}
            {tab === "signup" && (
              <div className="relative">
                <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  required
                  type="text"
                  placeholder="Full name"
                  value={form.name}
                  onChange={set("name")}
                  disabled={loading}
                  className={inputCls}
                />
              </div>
            )}

            {/* Email */}
            <div className="relative">
              <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                required
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={set("email")}
                disabled={loading}
                className={inputCls}
              />
            </div>

            {/* Phone — signup only */}
            {tab === "signup" && (
              <div className="relative">
                <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  placeholder="Mobile number (optional)"
                  value={form.phone}
                  onChange={set("phone")}
                  disabled={loading}
                  className={inputCls}
                />
              </div>
            )}

            {/* Password */}
            <div className="relative">
              <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                required
                type={showPw ? "text" : "password"}
                placeholder={tab === "signup" ? "Create password (min 6 chars)" : "Password"}
                value={form.password}
                onChange={set("password")}
                disabled={loading}
                className={`${inputCls} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 font-semibold">
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3 font-semibold">
                {success}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-black text-sm text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:opacity-60 disabled:scale-100 flex items-center justify-center gap-2.5 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)", boxShadow: "0 6px 24px rgba(29,78,216,0.3)" }}
            >
              {loading ? (
                <><Loader2 size={18} className="animate-spin" /> Please wait…</>
              ) : tab === "login" ? (
                "Sign In"
              ) : (
                "Create My Account"
              )}
            </button>
          </form>

          {/* Optional note */}
          <p className="text-center text-xs text-gray-400 mt-5 leading-relaxed">
            {tab === "login"
              ? <>No account yet?{" "}
                  <button onClick={() => switchTab("signup")} className="text-blue-600 font-bold hover:underline">
                    Create one free
                  </button>
                </>
              : <>Already have an account?{" "}
                  <button onClick={() => switchTab("login")} className="text-blue-600 font-bold hover:underline">
                    Sign in
                  </button>
                </>
            }
          </p>
          <p className="text-center text-xs text-gray-300 mt-3">
            Registration is completely optional. You can use our website without an account.
          </p>
        </div>
      </div>
    </div>
  );
}
