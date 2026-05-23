"use client";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle, Navigation, Clock, MapPinned } from "lucide-react";
import { HOSPITAL_INFO } from "@/lib/data";

export default function Contact() {
  return (
    <section id="contact" className="py-28 relative overflow-hidden" style={{ background: "#f0f6ff" }}>
      {/* Decorations */}
      <div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-[0.07] pointer-events-none"
        style={{ background: "radial-gradient(circle,#0ea5e9,transparent)" }}
      />
      <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />

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
            <MapPinned size={11} />
            Find Us
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            Contact &amp; <span className="gradient-text">Location</span>
          </h2>
          <div className="heading-line mx-auto mb-5" />
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            We&apos;re here to help. Reach out through any channel convenient for you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-10">

          {/* ── Info panel ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Contact cards */}
            {[
              { icon: MapPin,  label: "Address", value: HOSPITAL_INFO.address,  grad: ["#1e3a8a","#2563eb"], href: undefined },
              { icon: Phone,   label: "Phone",   value: HOSPITAL_INFO.phone,    grad: ["#2563eb","#0ea5e9"], href: `tel:${HOSPITAL_INFO.phone}` },
              { icon: Mail,    label: "Email",   value: HOSPITAL_INFO.email,    grad: ["#0ea5e9","#38bdf8"], href: `mailto:${HOSPITAL_INFO.email}` },
            ].map(({ icon: Icon, label, value, grad, href }) => (
              <div
                key={label}
                className="bg-white rounded-2xl p-5 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow border"
                style={{ borderColor: "rgba(29,78,216,0.07)" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg,${grad[0]},${grad[1]})` }}
                >
                  <div className="shine-overlay rounded-xl" />
                  <Icon size={18} className="text-white relative" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</div>
                  {href ? (
                    <a href={href} className="text-gray-800 font-semibold text-sm hover:text-blue-600 transition-colors break-all">
                      {value}
                    </a>
                  ) : (
                    <p className="text-gray-800 font-semibold text-sm">{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Hours card */}
            <div
              className="bg-white rounded-2xl p-5 shadow-sm border"
              style={{ borderColor: "rgba(29,78,216,0.07)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md relative overflow-hidden"
                  style={{ background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)" }}
                >
                  <div className="shine-overlay rounded-xl" />
                  <Clock size={18} className="text-white relative" />
                </div>
                <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Opening Hours</span>
              </div>
              {HOSPITAL_INFO.hours.map((h) => (
                <div key={h.day} className="flex justify-between py-2.5 border-b border-gray-50 last:border-0">
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

            {/* Quick action buttons */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Phone,         label: "Call",       href: `tel:${HOSPITAL_INFO.phone}`,                                                      grad: ["#1d4ed8","#0ea5e9"],  target: undefined },
                { icon: MessageCircle, label: "WhatsApp",   href: `https://wa.me/${HOSPITAL_INFO.whatsapp}`,                                          grad: ["#16a34a","#22c55e"],  target: "_blank" },
                { icon: Navigation,    label: "Directions", href: `https://maps.google.com/?q=${encodeURIComponent(HOSPITAL_INFO.address)}`,           grad: ["#0369a1","#0ea5e9"],  target: "_blank" },
              ].map(({ icon: Icon, label, href, target, grad }) => (
                <a
                  key={label}
                  href={href}
                  target={target}
                  rel={target ? "noopener noreferrer" : undefined}
                  className="flex flex-col items-center gap-2 rounded-2xl p-4 text-white text-center transition-all hover:-translate-y-1 hover:shadow-xl relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg,${grad[0]},${grad[1]})` }}
                >
                  <div className="shine-overlay rounded-2xl" />
                  <Icon size={18} className="relative" />
                  <span className="text-xs font-bold relative">{label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Map ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 rounded-3xl overflow-hidden shadow-xl border min-h-[480px]"
            style={{ border: "1.5px solid rgba(29,78,216,0.12)" }}
          >
            <iframe
              title="Hospital Location"
              src={HOSPITAL_INFO.mapEmbed}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "480px", display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
