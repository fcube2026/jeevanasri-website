"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, Bone, Brain, Baby, Stethoscope, Microscope,
  Ear, Sparkles, Activity, FlaskConical, Ambulance, Scissors, ArrowUpRight,
} from "lucide-react";
import { SERVICES } from "@/lib/data";

type ServiceItem = { icon: string; title: string; description: string };

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Heart, Bone, Brain, Baby, Stethoscope, Microscope,
  Ear, Sparkles, Activity, FlaskConical, Ambulance, Scissors,
};

const ICON_STYLES = [
  { from: "#1e3a8a", to: "#2563eb" },
  { from: "#2563eb", to: "#0ea5e9" },
  { from: "#0ea5e9", to: "#38bdf8" },
  { from: "#0369a1", to: "#0ea5e9" },
  { from: "#1d4ed8", to: "#06b6d4" },
  { from: "#0ea5e9", to: "#0369a1" },
  { from: "#06b6d4", to: "#2563eb" },
  { from: "#38bdf8", to: "#0ea5e9" },
  { from: "#1d4ed8", to: "#06b6d4" },
  { from: "#06b6d4", to: "#1d4ed8" },
  { from: "#0ea5e9", to: "#0284c7" },
  { from: "#2563eb", to: "#0ea5e9" },
];

const CATEGORIES = ["All", "Surgery", "Diagnostics", "Specialist Care", "Emergency"];
const SERVICE_CATS: Record<string, string> = {
  Cardiology: "Specialist Care", Orthopedics: "Surgery", Neurology: "Specialist Care",
  Pediatrics: "Specialist Care", "General Medicine": "Specialist Care", Gynecology: "Specialist Care",
  ENT: "Specialist Care", Dermatology: "Specialist Care", Physiotherapy: "Specialist Care",
  Diagnostics: "Diagnostics", "Emergency Care": "Emergency", Surgery: "Surgery",
};

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [services, setServices] = useState<ServiceItem[]>(SERVICES);

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data) && data.length > 0) setServices(data); })
      .catch(() => {});
  }, []);

  const filtered = activeCategory === "All"
    ? services
    : services.filter((s) => SERVICE_CATS[s.title] === activeCategory);

  return (
    <section id="services" className="py-28 relative overflow-hidden" style={{ background: "linear-gradient(180deg,#f0f6ff 0%,#ffffff 60%)" }}>

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50 pointer-events-none" />

      {/* Orbs */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.05] pointer-events-none"
        style={{ background: "radial-gradient(circle, #0ea5e9, transparent)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <div className="section-chip mx-auto w-fit mb-5">
            <Stethoscope size={11} />
            What We Offer
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            Our <span className="gradient-text">Medical Services</span>
          </h2>
          <div className="heading-line mx-auto mb-5" />
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Comprehensive healthcare across 12+ specializations — all under one roof.
          </p>
        </motion.div>

        {/* ── Category tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-250"
              style={
                activeCategory === cat
                  ? {
                      background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)",
                      color: "white",
                      boxShadow: "0 4px 20px rgba(29,78,216,0.28)",
                    }
                  : {
                      background: "white",
                      color: "#4b5563",
                      border: "1px solid #e5e7eb",
                    }
              }
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* ── Service cards ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {filtered.map((service, i) => {
              const Icon = ICON_MAP[service.icon] || null;
              const style = ICON_STYLES[i % ICON_STYLES.length];
              const num = String(i + 1).padStart(2, "0");
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.45 }}
                  className="gradient-border group bg-white p-6 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-400 cursor-pointer relative overflow-hidden"
                >
                  {/* Card number watermark */}
                  <div
                    className="absolute top-4 right-4 text-4xl font-black opacity-[0.04] leading-none select-none"
                    style={{ color: style.from }}
                  >
                    {num}
                  </div>

                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg,${style.from},${style.to})` }}
                  >
                    <div className="shine-overlay rounded-2xl" />
                    {Icon
                      ? <Icon size={24} className="text-white relative" />
                      : <span className="text-2xl relative">{service.icon}</span>
                    }
                  </div>

                  <h3 className="font-black text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-2">{service.description}</p>

                  <div
                    className="flex items-center gap-1 text-sm font-bold transition-all duration-200"
                    style={{ color: style.from }}
                  >
                    Learn More
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </div>

                  {/* Bottom accent bar */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg,${style.from},${style.to})` }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-14"
        >
          <div
            className="inline-flex items-center gap-4 rounded-2xl px-8 py-5 shadow-xl"
            style={{ background: "linear-gradient(135deg,#f0f6ff,#e8f2ff)", border: "1px solid rgba(29,78,216,0.12)" }}
          >
            <div className="text-left">
              <div className="font-black text-gray-900 text-sm">Need a consultation?</div>
              <div className="text-gray-500 text-xs">Our specialists are available Mon–Sat</div>
            </div>
            <button
              onClick={() => document.getElementById("appointment")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-shimmer text-white px-6 py-2.5 rounded-xl font-black text-sm hover:scale-105 transition-transform shadow-lg whitespace-nowrap"
            >
              Book Now →
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
