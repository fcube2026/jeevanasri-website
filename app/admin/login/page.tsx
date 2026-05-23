"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, ShieldCheck, Lock, Mail } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      setError(data.error ?? "Login failed.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "linear-gradient(135deg,#060d24 0%,#0a1535 50%,#060d24 100%)" }}
    >
      {/* Background orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle,#1d4ed8,transparent)" }} />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle,#0ea5e9,transparent)" }} />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative w-full max-w-md px-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-2xl relative overflow-hidden"
            style={{ background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)" }}
          >
            <div className="absolute inset-0 opacity-30"
              style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.3),transparent)" }} />
            <ShieldCheck size={28} className="text-white relative" />
          </div>
          <h1 className="text-2xl font-black text-white mb-1">Admin Portal</h1>
          <p className="text-gray-400 text-sm">Jeevanasri Hospitals CMS</p>
        </div>

        {/* Card */}
        <div
          className="rounded-3xl p-8 shadow-2xl border"
          style={{
            background: "rgba(255,255,255,0.04)",
            borderColor: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
          }}
        >
          <h2 className="text-lg font-black text-white mb-6">Sign in to Dashboard</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@jeevanasri.com"
                  disabled={loading}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm text-white bg-transparent border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-600 disabled:opacity-50"
                  style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type={showPw ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  className="w-full pl-11 pr-11 py-3.5 rounded-xl text-sm text-white bg-transparent border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-600 disabled:opacity-50"
                  style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 font-semibold">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-black text-sm text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl disabled:opacity-60 disabled:scale-100 flex items-center justify-center gap-2.5 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)", boxShadow: "0 6px 24px rgba(29,78,216,0.4)" }}
            >
              <div className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity"
                style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.3),transparent)" }} />
              {loading ? (
                <><Loader2 size={18} className="animate-spin" /> Signing in…</>
              ) : (
                <>Sign In to Dashboard</>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          Authorized personnel only · Jeevanasri Hospitals
        </p>
      </div>
    </div>
  );
}
