"use client";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle, Navigation, Clock } from "lucide-react";
import { HOSPITAL_INFO } from "@/lib/data";

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden" style={{ background: "#f8faff" }}>
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-[0.06]"
        style={{ background: "radial-gradient(circle,#e91e8c,transparent)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
            style={{ background: "rgba(233,30,140,0.08)", color: "#e91e8c", border: "1px solid rgba(233,30,140,0.15)" }}
          >
            Find Us
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900">
            Contact &amp; <span className="gradient-text">Location</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-lg">
            We&apos;re here to help. Reach out through any channel convenient for you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-10">

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {[
              { icon: MapPin,  label: "Address", value: HOSPITAL_INFO.address,  grad: ["#2563eb","#06b6d4"], href: undefined },
              { icon: Phone,   label: "Phone",   value: HOSPITAL_INFO.phone,    grad: ["#06b6d4","#0ea5e9"], href: `tel:${HOSPITAL_INFO.phone}` },
              { icon: Mail,    label: "Email",   value: HOSPITAL_INFO.email,    grad: ["#e91e8c","#f472b6"], href: `mailto:${HOSPITAL_INFO.email}` },
            ].map(({ icon: Icon, label, value, grad, href }) => (
              <div key={label} className="gradient-border bg-white rounded-2xl p-5 shadow-sm flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `linear-gradient(135deg,${grad[0]},${grad[1]})` }}>
                  <Icon size={18} className="text-white" />
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

            {/* Hours */}
            <div className="gradient-border bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#2563eb,#e91e8c)" }}>
                  <Clock size={18} className="text-white" />
                </div>
                <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Opening Hours</span>
              </div>
              {HOSPITAL_INFO.hours.map((h) => (
                <div key={h.day} className="flex justify-between py-2.5 border-b border-gray-50 last:border-0">
                  <span className="text-gray-500 text-sm">{h.day}</span>
                  <span className="text-sm font-bold"
                    style={{ color: h.day === "Emergency" ? "#e91e8c" : "#2563eb" }}>
                    {h.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick action buttons */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Phone,       label: "Call",       href: `tel:${HOSPITAL_INFO.phone}`,                                       grad: ["#2563eb","#06b6d4"] },
                { icon: MessageCircle, label: "WhatsApp", href: `https://wa.me/${HOSPITAL_INFO.whatsapp}`, target: "_blank",          grad: ["#16a34a","#22c55e"] },
                { icon: Navigation,  label: "Directions", href: `https://maps.google.com/?q=${encodeURIComponent(HOSPITAL_INFO.address)}`, target: "_blank", grad: ["#e91e8c","#f472b6"] },
              ].map(({ icon: Icon, label, href, target, grad }) => (
                <a key={label} href={href} target={target} rel={target ? "noopener noreferrer" : undefined}
                  className="flex flex-col items-center gap-2 rounded-2xl p-4 text-white text-center transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: `linear-gradient(135deg,${grad[0]},${grad[1]})` }}>
                  <Icon size={18} />
                  <span className="text-xs font-bold">{label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 rounded-3xl overflow-hidden shadow-xl border border-white min-h-[420px]"
            style={{ outline: "1.5px solid rgba(37,99,235,0.12)" }}
          >
            <iframe
              title="Hospital Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.266!2d78.48673!3d17.38505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "420px", display: "block" }}
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
