"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { HOSPITAL_INFO } from "@/lib/data";

export default function Appointment() {
  const [form, setForm]         = useState({ name: "", mobile: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");

  const set = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "",
          subject: `New Appointment Request — ${form.name}`,
          from_name: "Jeevanasri Hospitals Website",
          name: form.name,
          email: form.email || "Not provided",
          phone: form.mobile,
          message: `
New appointment request received from the website.

Patient Name : ${form.name}
Mobile       : ${form.mobile}
Email        : ${form.email || "Not provided"}

Please call the patient to confirm their appointment slot.
          `.trim(),
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setError("Submission failed. Please try again or call us directly.");
      }
    } catch {
      setError("Network error. Please check your connection or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSubmitted(false);
    setError("");
    setForm({ name: "", mobile: "", email: "" });
  };

  const inputCls =
    "w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all placeholder:text-gray-400";

  return (
    <section id="appointment" className="py-24 bg-white relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-[0.05]"
        style={{ background: "radial-gradient(circle,#2563eb,transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
            style={{ background: "rgba(37,99,235,0.08)", color: "#2563eb", border: "1px solid rgba(37,99,235,0.15)" }}
          >
            Appointments
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900">
            Book Your <span className="gradient-text">Appointment</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
            Fill in your details and our team will call you back to confirm your slot.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10 items-start">

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <div
              className="relative rounded-3xl p-7 text-white overflow-hidden"
              style={{ background: "linear-gradient(135deg,#1d4ed8,#2563eb,#0891b2)" }}
            >
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-20"
                style={{ background: "radial-gradient(circle,#e91e8c,transparent)" }}
              />
              <h3 className="relative text-xl font-black mb-2">Quick Booking</h3>
              <p className="relative text-blue-100 text-sm mb-6 leading-relaxed">
                Prefer to talk directly? Call or WhatsApp us for instant booking.
              </p>
              <div className="relative space-y-3">
                <a
                  href={`tel:${HOSPITAL_INFO.phone}`}
                  className="flex items-center gap-3 bg-white/15 hover:bg-white/25 rounded-2xl p-4 transition-colors font-semibold text-sm"
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

            <div className="gradient-border bg-white rounded-3xl p-6 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-4">OPD Hours</h4>
              {HOSPITAL_INFO.hours.map((h) => (
                <div key={h.day} className="flex justify-between items-center py-2.5 border-b border-gray-50 last:border-0">
                  <span className="text-gray-500 text-sm">{h.day}</span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: h.day === "Emergency" ? "#e91e8c" : "#2563eb" }}
                  >
                    {h.time}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-2"
          >
            {submitted ? (
              /* ── Success state ── */
              <div
                className="rounded-3xl p-14 text-center border"
                style={{
                  background: "linear-gradient(135deg,rgba(37,99,235,0.04),rgba(233,30,140,0.04))",
                  borderColor: "rgba(37,99,235,0.15)",
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background: "linear-gradient(135deg,#2563eb,#e91e8c)" }}
                >
                  <CheckCircle2 size={40} className="text-white" />
                </motion.div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">Appointment Requested!</h3>
                <p className="text-gray-600 mb-2">
                  Thank you, <strong>{form.name}</strong>!
                </p>
                <p className="text-gray-500 text-sm mb-8">
                  We&apos;ve received your request. Our team will call{" "}
                  <strong className="text-gray-700">{form.mobile}</strong> within 30 minutes
                  to confirm your appointment slot.
                </p>
                <button
                  onClick={reset}
                  className="btn-shimmer text-white px-10 py-3.5 rounded-2xl font-bold hover:shadow-xl hover:scale-105 transition-all"
                >
                  Book Another
                </button>
              </div>
            ) : (
              /* ── Form ── */
              <form
                onSubmit={handleSubmit}
                className="gradient-border bg-white rounded-3xl p-10 shadow-sm"
              >
                <div className="space-y-5 mb-8">

                  {/* Name */}
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

                  {/* Mobile */}
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

                  {/* Email */}
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

                {/* Error banner */}
                {error && (
                  <div
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 mb-5 text-sm font-semibold"
                    style={{ background: "rgba(239,68,68,0.08)", color: "#dc2626", border: "1px solid rgba(239,68,68,0.2)" }}
                  >
                    <AlertCircle size={16} className="flex-shrink-0" />
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-shimmer text-white py-4 rounded-2xl font-black text-base hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:scale-100 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Sending Request…
                    </>
                  ) : (
                    "Request Appointment"
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
