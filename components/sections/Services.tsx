"use client";
import { motion } from "framer-motion";
import {
  Heart, Bone, Brain, Baby, Stethoscope, Microscope,
  Ear, Sparkles, Activity, FlaskConical, Ambulance, Scissors, ArrowUpRight,
} from "lucide-react";
import { SERVICES } from "@/lib/data";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Heart, Bone, Brain, Baby, Stethoscope, Microscope,
  Ear, Sparkles, Activity, FlaskConical, Ambulance, Scissors,
};

/* Alternating between blue→cyan and blue→pink based on logo palette */
const ICON_STYLES = [
  { from: "#2563eb", to: "#06b6d4" },
  { from: "#1d4ed8", to: "#3b82f6" },
  { from: "#e91e8c", to: "#f472b6" },
  { from: "#06b6d4", to: "#0ea5e9" },
  { from: "#2563eb", to: "#06b6d4" },
  { from: "#e91e8c", to: "#c026d3" },
  { from: "#06b6d4", to: "#2563eb" },
  { from: "#f472b6", to: "#e91e8c" },
  { from: "#1d4ed8", to: "#06b6d4" },
  { from: "#06b6d4", to: "#e91e8c" },
  { from: "#e91e8c", to: "#f43f5e" },
  { from: "#2563eb", to: "#e91e8c" },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-[0.04]"
        style={{ background: "radial-gradient(circle, #e91e8c, transparent)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
            style={{ background: "rgba(6,182,212,0.08)", color: "#0891b2", border: "1px solid rgba(6,182,212,0.2)" }}>
            What We Offer
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900">
            Our <span className="gradient-text">Medical Services</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
            Comprehensive healthcare across 12+ specializations — all under one roof.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {SERVICES.map((service, i) => {
            const Icon = ICON_MAP[service.icon] || Heart;
            const style = ICON_STYLES[i % ICON_STYLES.length];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="gradient-border group bg-white p-6 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-400 cursor-pointer"
              >
                {/* Icon box */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                  style={{ background: `linear-gradient(135deg,${style.from},${style.to})` }}
                >
                  <Icon size={24} className="text-white" />
                </div>

                <h3 className="font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{service.description}</p>

                <div className="flex items-center gap-1 text-sm font-semibold transition-all duration-200"
                  style={{ color: style.from }}>
                  Learn More
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
