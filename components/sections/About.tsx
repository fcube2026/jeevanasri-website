"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, Target, Eye, TrendingUp } from "lucide-react";
import { STATS } from "@/lib/data";

function Counter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / (2000 / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span>{count.toLocaleString()}{suffix}</span>;
}

const STAT_COLORS = [
  { from: "#1e3a8a", to: "#2563eb" },
  { from: "#2563eb", to: "#0ea5e9" },
  { from: "#0ea5e9", to: "#38bdf8" },
  { from: "#0369a1", to: "#0ea5e9" },
];

const WHY = [
  "Patient-first approach in every decision",
  "Advanced diagnostic and treatment technology",
  "Board-certified specialists across all departments",
  "Compassionate staff trained for empathetic care",
  "Transparent billing and insurance support",
  "Strict hygiene and infection control protocols",
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-28 bg-white relative overflow-hidden">

      {/* Dot-pattern backdrop */}
      <div className="absolute inset-0 dot-pattern opacity-60 pointer-events-none" />

      {/* Soft blue orb top-right */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-[0.06] pointer-events-none"
        style={{ background: "radial-gradient(circle, #2563eb, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="section-chip mx-auto w-fit mb-5">
            <TrendingUp size={11} />
            About Us
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            Trusted Healthcare for{" "}
            <span className="gradient-text">Over 15 Years</span>
          </h2>
          <div className="heading-line mx-auto mb-5" />
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Jeevanasri Hospitals has been a pillar of excellence, combining modern medicine with genuine compassion to serve the community.
          </p>
        </motion.div>

        {/* ── Content grid ── */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">

          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Main image */}
            <div className="rounded-3xl overflow-hidden shadow-2xl relative">
              <img
                src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=700&h=500&fit=crop"
                alt="Hospital"
                className="w-full h-[460px] object-cover"
              />
              <div className="absolute inset-0 opacity-15"
                style={{ background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)" }} />
            </div>

            {/* Floating card — bottom right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute -bottom-7 -right-7 rounded-3xl p-6 text-white shadow-2xl overflow-hidden"
              style={{ background: "linear-gradient(135deg,#1e3a8a,#2563eb)" }}
            >
              <div className="shine-overlay rounded-3xl" />
              <div className="relative text-4xl font-black">15+</div>
              <div className="relative text-sm font-semibold opacity-85">Years of Care</div>
            </motion.div>

            {/* Floating card — top left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -top-6 -left-6 rounded-2xl p-4 text-white shadow-xl overflow-hidden"
              style={{ background: "linear-gradient(135deg,#0ea5e9,#38bdf8)" }}
            >
              <div className="shine-overlay rounded-2xl" />
              <div className="relative text-xl font-black">NABH</div>
              <div className="relative text-xs font-semibold opacity-85">Accredited</div>
            </motion.div>

            {/* Floating card — right middle */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute top-1/2 -translate-y-1/2 -right-10 hidden xl:block"
            >
              <div
                className="rounded-2xl p-4 shadow-xl border"
                style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(16px)", borderColor: "rgba(29,78,216,0.12)" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)" }}>
                    <CheckCircle2 size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-gray-900">50,000+</div>
                    <div className="text-xs text-gray-500">Happy Patients</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Founded with a vision to make quality healthcare accessible, Jeevanasri Hospitals has grown into one of the most trusted multi-specialty hospitals, combining advanced medical technology with a patient-first philosophy.
            </p>

            {/* Mission & Vision */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                {
                  icon: Target,
                  title: "Our Mission",
                  text: "Deliver compassionate, affordable, world-class healthcare that improves the quality of life for every patient.",
                  gradient: "from-blue-50 to-sky-50",
                  border: "border-blue-100",
                  iconGrad: "linear-gradient(135deg,#1e3a8a,#2563eb)",
                },
                {
                  icon: Eye,
                  title: "Our Vision",
                  text: "Be the most trusted healthcare institution in the region, known for clinical excellence and patient-centric care.",
                  gradient: "from-sky-50 to-blue-50",
                  border: "border-sky-100",
                  iconGrad: "linear-gradient(135deg,#0ea5e9,#38bdf8)",
                },
              ].map(({ icon: Icon, title, text, gradient, border, iconGrad }) => (
                <div key={title} className={`bg-gradient-to-br ${gradient} rounded-2xl p-5 border ${border} hover:shadow-md transition-shadow`}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 shadow-md"
                    style={{ background: iconGrad }}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <h3 className="font-black text-gray-800 mb-2">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>

            <h3 className="font-black text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-0.5 rounded-full" style={{ background: "linear-gradient(90deg,#1d4ed8,#0ea5e9)" }} />
              Why Choose Jeevanasri?
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {WHY.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-3 group"
                >
                  <CheckCircle2
                    size={16}
                    className="mt-0.5 flex-shrink-0 transition-transform group-hover:scale-110"
                    style={{ color: i % 2 === 0 ? "#2563eb" : "#0ea5e9" }}
                  />
                  <span className="text-gray-600 text-sm">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Stats row ── */}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative rounded-3xl p-8 text-center text-white shadow-xl overflow-hidden hover:-translate-y-1.5 transition-transform duration-300 cursor-default"
              style={{ background: `linear-gradient(135deg,${STAT_COLORS[i].from},${STAT_COLORS[i].to})` }}
            >
              <div className="shine-overlay rounded-3xl" />
              {/* Decorative ring */}
              <div
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-10"
                style={{ border: "20px solid white" }}
              />
              <div className="relative text-4xl font-black mb-1 tabular-nums">
                <Counter target={stat.value} suffix={stat.suffix} inView={inView} />
              </div>
              <div className="relative text-white/80 text-sm font-semibold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
