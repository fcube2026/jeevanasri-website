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
  ["#2563eb", "#06b6d4"],
  ["#06b6d4", "#0ea5e9"],
  ["#e91e8c", "#f472b6"],
  ["#2563eb", "#e91e8c"],
  ["#06b6d4", "#2563eb"],
  ["#e91e8c", "#c026d3"],
  ["#1d4ed8", "#06b6d4"],
  ["#f472b6", "#e91e8c"],
];

export default function WhyUs() {
  return (
    <section className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg,#060d2a 0%,#0a1535 40%,#14072b 70%,#060d2a 100%)" }}>

      {/* Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle,#2563eb,transparent)" }} />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle,#e91e8c,transparent)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-[80px] opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle,#06b6d4,transparent)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
            style={{ background: "rgba(233,30,140,0.12)", color: "#f9a8d4", border: "1px solid rgba(233,30,140,0.2)" }}>
            Why Us
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            Why Patients Choose{" "}
            <span className="gradient-text">Jeevanasri</span>
          </h2>
          <p className="mt-4 text-blue-200/60 max-w-2xl mx-auto text-lg">
            We go beyond treatment — we provide a healthcare experience that heals, reassures, and empowers.
          </p>
        </motion.div>

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
                className="group relative rounded-3xl p-7 border transition-all duration-400 hover:-translate-y-1.5 cursor-default overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderColor: "rgba(255,255,255,0.08)",
                }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: `linear-gradient(135deg,${c1}10,${c2}08)` }} />

                <div
                  className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-xl"
                  style={{ background: `linear-gradient(135deg,${c1},${c2})` }}
                >
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="relative text-white font-bold mb-2">{item.title}</h3>
                <p className="relative text-blue-200/60 text-sm leading-relaxed">{item.description}</p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: `linear-gradient(90deg,${c1},${c2})` }} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
