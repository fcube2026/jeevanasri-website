"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, Target, Eye } from "lucide-react";
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
  { from: "#2563eb", to: "#06b6d4" },
  { from: "#06b6d4", to: "#0ea5e9" },
  { from: "#e91e8c", to: "#f472b6" },
  { from: "#2563eb", to: "#e91e8c" },
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
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-5"
        style={{ background: "radial-gradient(circle, #e91e8c, transparent)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
            style={{ background: "linear-gradient(135deg,rgba(37,99,235,0.08),rgba(233,30,140,0.08))", color: "#2563eb", border: "1px solid rgba(37,99,235,0.15)" }}>
            About Us
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900">
            Trusted Healthcare for{" "}
            <span className="gradient-text">Over 15 Years</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Jeevanasri Hospitals has been a pillar of excellence, combining modern medicine with genuine compassion.
          </p>
        </motion.div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl relative">
              <img
                src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=700&h=500&fit=crop"
                alt="Hospital"
                className="w-full h-[440px] object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 opacity-20"
                style={{ background: "linear-gradient(135deg,#2563eb,#e91e8c)" }} />
            </div>

            {/* Floating badges */}
            <div className="absolute -bottom-6 -right-6 rounded-3xl p-6 text-white shadow-2xl"
              style={{ background: "linear-gradient(135deg,#2563eb,#06b6d4)" }}>
              <div className="text-3xl font-black">15+</div>
              <div className="text-sm font-medium opacity-90">Years of Care</div>
            </div>
            <div className="absolute -top-5 -left-5 rounded-2xl p-4 text-white shadow-xl"
              style={{ background: "linear-gradient(135deg,#e91e8c,#f472b6)" }}>
              <div className="text-xl font-black">NABH</div>
              <div className="text-xs font-medium opacity-90">Accredited</div>
            </div>
          </motion.div>

          {/* Text */}
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
                  text: "To deliver compassionate, affordable, world-class healthcare that improves the quality of life for every patient.",
                  bg: "from-blue-50 to-cyan-50",
                  border: "border-blue-100",
                  iconColor: "#2563eb",
                },
                {
                  icon: Eye,
                  title: "Our Vision",
                  text: "To be the most trusted healthcare institution in the region, known for clinical excellence and patient-centric care.",
                  bg: "from-pink-50 to-rose-50",
                  border: "border-pink-100",
                  iconColor: "#e91e8c",
                },
              ].map(({ icon: Icon, title, text, bg, border, iconColor }) => (
                <div key={title} className={`bg-gradient-to-br ${bg} rounded-2xl p-5 border ${border}`}>
                  <Icon size={26} style={{ color: iconColor }} className="mb-3" />
                  <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>

            <h3 className="font-bold text-gray-900 mb-4">Why Choose Jeevanasri?</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {WHY.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 size={17} className="mt-0.5 flex-shrink-0" style={{ color: i % 2 === 0 ? "#2563eb" : "#e91e8c" }} />
                  <span className="text-gray-600 text-sm">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative rounded-3xl p-7 text-center text-white shadow-xl overflow-hidden hover:-translate-y-1 transition-transform duration-300"
              style={{ background: `linear-gradient(135deg,${STAT_COLORS[i].from},${STAT_COLORS[i].to})` }}
            >
              {/* Shine */}
              <div className="absolute inset-0 opacity-20"
                style={{ background: "radial-gradient(circle at 30% 30%, white, transparent 60%)" }} />
              <div className="relative text-4xl font-black mb-1">
                <Counter target={stat.value} suffix={stat.suffix} inView={inView} />
              </div>
              <div className="relative text-white/80 text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
