"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle, CheckCircle2, Loader2, AlertCircle, CalendarCheck, Clock } from "lucide-react";
import { HOSPITAL_INFO } from "@/lib/data";

export default function Appointment() {
  const [form, setForm]           = useState({ name: "", mobile: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, mobile: form.mobile, email: form.email }),
      });
      const data = await res.json();
      if (data.success) setSubmitted(true);
      else setError("Submission failed. Please try again or call us directly.");
    } catch {
      setError("Network error. Please check your connection or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setSubmitted(false); setError(""); setForm({ name: "", mobile: "", email: "" }); };

  const inputCls =
    "w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all placeholder:text-gray-400 hover:border-blue-200";

  return (
    <section id="appointment" className="py-28 bg-white relative overflow-hidden">
      {/* Decorations */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-[0.05] pointer-events-none"
        style={{ background: "radial-gradient(circle,#2563eb,transparent)" }}
      />
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="section-chip mx-auto w-fit mb-5">
            <CalendarCheck size={11} />
            Appointments
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            Book Your <span className="gradient-text">Appointment</span>
          </h2>
          <div className="heading-line mx-auto mb-5" />
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Fill in your details and our team will call you back to confirm your slot.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10 items-start">

          {/* ── Sidebar ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            {/* Quick booking card */}
            <div
              className="relative rounded-3xl p-7 text-white overflow-hidden shadow-2xl"
              style={{ background: "linear-gradient(135deg,#1e3a8a,#1d4ed8,#0369a1)" }}
            >
              <div className="shine-overlay rounded-3xl" />
              {/* Decorative ring */}
              <div
                className="absolute -top-8 -right-8 w-32 h-32 rounded-full border-[24px] border-white/10"
              />
              <div className="relative">
                <h3 className="text-xl font-black mb-2">Quick Booking</h3>
                <p className="text-blue-100/80 text-sm mb-6 leading-relaxed">
                  Prefer to talk directly? Call or WhatsApp us for instant booking.
                </p>
                <div className="space-y-3">
                  <a
                    href={`tel:${HOSPITAL_INFO.phone}`}
                    className="flex items-center gap-3 bg-white/15 hover:bg-white/25 rounded-2xl p-4 transition-colors font-semibold text-sm border border-white/10"
                  >
                    <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Phone size={16} />
                    </div>
                    {HOSPITAL_INFO.phone}
                  </a>
                  <a
                    href={`https://wa.me/${HOSPITAL_INFO.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-green-500 hover:bg-green-400 rounded-2xl p-4 transition-colors font-semibold text-sm"
                  >
                    <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                      <MessageCircle size={16} />
                    </div>
                    WhatsApp Booking
                  </a>
                </div>
              </div>
            </div>

            {/* OPD hours */}
            <div
              className="bg-white rounded-3xl p-6 shadow-sm border"
              style={{ borderColor: "rgba(29,78,216,0.08)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center relative overflow-hidden"
                  style={{ background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)" }}
                >
                  <Clock size={15} className="text-white relative" />
                </div>
                <h4 className="font-black text-gray-900">OPD Hours</h4>
              </div>
              {HOSPITAL_INFO.hours.map((h) => (
                <div key={h.day} className="flex justify-between items-center py-2.5 border-b border-gray-50 last:border-0">
                  <span className="text-gray-500 text-sm">{h.day}</span>
                  <span
                    className="text-sm font-black"
                    style={{ color: h.day === "Emergency" ? "#0ea5e9" : "#1d4ed8" }}
                  >
                    {h.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Trust indicator */}
            <div
              className="rounded-3xl p-5 text-center"
              style={{ background: "linear-gradient(135deg,#f0f6ff,#e8f2ff)", border: "1px solid rgba(29,78,216,0.1)" }}
            >
              <div className="text-3xl font-black gradient-num mb-1">30 min</div>
              <div className="text-gray-600 text-sm font-semibold">Average callback time</div>
              <div className="text-gray-400 text-xs mt-1">Mon – Sat · 8 AM – 9 PM</div>
            </div>
          </motion.div>

          {/* ── Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-2"
          >
            {submitted ? (
              <div
                className="rounded-3xl p-14 text-center border"
                style={{
                  background: "linear-gradient(135deg,rgba(29,78,216,0.03),rgba(14,165,233,0.03))",
                  borderColor: "rgba(29,78,216,0.12)",
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 relative overflow-hidden shadow-2xl"
                  style={{ background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)" }}
                >
                  <div className="shine-overlay rounded-full" />
                  <CheckCircle2 size={40} className="text-white relative" />
                </motion.div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">Appointment Requested!</h3>
                <p className="text-gray-600 mb-2">
                  Thank you, <strong>{form.name}</strong>!
                </p>
                <p className="text-gray-500 text-sm mb-8">
                  We&apos;ve received your request. Our team will call{" "}
                  <strong className="text-gray-700">{form.mobile}</strong> within 30 minutes.
                </p>
                <button
                  onClick={reset}
                  className="btn-shimmer text-white px-10 py-3.5 rounded-2xl font-black hover:shadow-xl hover:scale-105 transition-all"
                >
                  Book Another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl p-10 shadow-md border"
                style={{ borderColor: "rgba(29,78,216,0.08)" }}
              >
                {/* Form header */}
                <div className="mb-8">
                  <h3 className="text-xl font-black text-gray-900 mb-1">Patient Details</h3>
                  <p className="text-gray-400 text-sm">Fill in the form below and we'll be in touch shortly.</p>
                </div>

                <div className="space-y-5 mb-8">
                  <div>
                    <label className="block text-xs font-black text-gray-500 mb-2 uppercase tracking-widest">
                      Patient Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="Enter your full name"
                      className={inputCls}
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-gray-500 mb-2 uppercase tracking-widest">
                      Mobile Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      required
                      type="tel"
                      pattern="[0-9+\s\-]{7,15}"
                      value={form.mobile}
                      onChange={(e) => set("mobile", e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      className={inputCls}
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-gray-500 mb-2 uppercase tracking-widest">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="you@example.com (optional)"
                      className={inputCls}
                      disabled={loading}
                    />
                  </div>
                </div>

                {error && (
                  <div
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 mb-5 text-sm font-semibold"
                    style={{ background: "rgba(239,68,68,0.07)", color: "#dc2626", border: "1px solid rgba(239,68,68,0.18)" }}
                  >
                    <AlertCircle size={16} className="flex-shrink-0" />
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-shimmer text-white py-4 rounded-2xl font-black text-base hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:scale-100 disabled:cursor-not-allowed relative overflow-hidden"
                >
                  <span className="shine-overlay rounded-2xl" />
                  {loading ? (
                    <>
                      <Loader2 size={20} className="animate-spin relative" />
                      <span className="relative">Sending Request…</span>
                    </>
                  ) : (
                    <>
                      <CalendarCheck size={20} className="relative" />
                      <span className="relative">Request Appointment</span>
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-gray-400 mt-4">
                  Our team will call you back within 30 minutes to confirm your slot.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
