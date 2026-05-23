"use client";
import { motion } from "framer-motion";
import {
  UserCheck, Cpu, ShieldCheck, Clock, IndianRupee, Heart, Zap, Award,
} from "lucide-react";
import { WHY_US } from "@/lib/data";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  UserCheck, Cpu, ShieldCheck, Clock, IndianRupee, Heart, Zap, Award,
};

const ICON_GRADS = [
  ["#1e3a8a", "#2563eb"],
  ["#2563eb", "#0ea5e9"],
  ["#0ea5e9", "#38bdf8"],
  ["#0369a1", "#0ea5e9"],
  ["#06b6d4", "#2563eb"],
  ["#0ea5e9", "#0369a1"],
  ["#1d4ed8", "#06b6d4"],
  ["#38bdf8", "#0ea5e9"],
];

export default function WhyUs() {
  return (
    <section
      className="py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg,#050d24 0%,#0a1535 35%,#071228 65%,#050d24 100%)" }}
    >
      {/* ── Animated orbs ── */}
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: "radial-gradient(circle,#1d4ed8,transparent)", opacity: 0.18 }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle,#0ea5e9,transparent)", opacity: 0.14 }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle,#06b6d4,transparent)", opacity: 0.10 }}
      />

      {/* ── Subtle grid overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase mb-5"
            style={{
              background: "rgba(14,165,233,0.12)",
              color: "#7dd3fc",
              border: "1px solid rgba(14,165,233,0.2)",
            }}
          >
            <Award size={11} />
            Why Choose Us
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Why Patients Choose{" "}
            <span className="gradient-text">Jeevanasri</span>
          </h2>
          <div className="heading-line mx-auto mb-5" />
          <p className="text-blue-200/55 max-w-2xl mx-auto text-lg">
            We go beyond treatment — we provide a healthcare experience that heals, reassures, and empowers.
          </p>
        </motion.div>

        {/* ── Cards grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHY_US.map((item, i) => {
            const Icon = ICON_MAP[item.icon] || Heart;
            const [c1, c2] = ICON_GRADS[i % ICON_GRADS.length];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="group relative rounded-3xl p-7 border transition-all duration-400 hover:-translate-y-2 cursor-default overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderColor: "rgba(255,255,255,0.07)",
                }}
              >
                {/* Hover glow background */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: `linear-gradient(135deg,${c1}12,${c2}08)` }}
                />

                {/* Hover gradient border */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{
                    padding: "1px",
                    background: `linear-gradient(135deg,${c1}50,${c2}30)`,
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />

                {/* Number watermark */}
                <div
                  className="absolute top-4 right-5 text-5xl font-black opacity-[0.04] leading-none select-none"
                  style={{ color: c1 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Icon */}
                <div
                  className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-xl overflow-hidden"
                  style={{ background: `linear-gradient(135deg,${c1},${c2})` }}
                >
                  <div className="shine-overlay rounded-2xl" />
                  <Icon size={24} className="text-white relative" />
                </div>

                <h3 className="relative text-white font-black mb-2 text-base">{item.title}</h3>
                <p className="relative text-blue-200/55 text-sm leading-relaxed">{item.description}</p>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: `linear-gradient(90deg,${c1},${c2})` }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* ── Trust strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 rounded-3xl p-8 grid sm:grid-cols-3 gap-6 text-center"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {[
            { value: "50,000+", label: "Patients Treated", color: "#38bdf8" },
            { value: "98%",     label: "Patient Satisfaction", color: "#0ea5e9" },
            { value: "15+",     label: "Years of Excellence", color: "#60a5fa" },
          ].map((t) => (
            <div key={t.label} className="flex flex-col items-center">
              <div className="text-3xl font-black mb-1" style={{ color: t.color }}>{t.value}</div>
              <div className="text-blue-200/55 text-sm font-semibold">{t.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
