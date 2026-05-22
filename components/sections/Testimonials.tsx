"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const len = TESTIMONIALS.length;

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % len), 5500);
    return () => clearInterval(timer);
  }, [len]);

  const prev = () => setCurrent((c) => (c - 1 + len) % len);
  const next = () => setCurrent((c) => (c + 1) % len);

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "#f8faff" }}>
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full blur-3xl opacity-[0.07]"
        style={{ background: "radial-gradient(circle,#2563eb,transparent)" }} />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-[0.07]"
        style={{ background: "radial-gradient(circle,#e91e8c,transparent)" }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
            style={{ background: "rgba(37,99,235,0.08)", color: "#2563eb", border: "1px solid rgba(37,99,235,0.15)" }}>
            Patient Stories
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
            What Our <span className="gradient-text">Patients Say</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            Real experiences from real patients who trusted Jeevanasri with their health.
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.45 }}
              className="relative rounded-3xl p-10 text-center overflow-hidden border border-white shadow-xl"
              style={{ background: "linear-gradient(135deg,rgba(37,99,235,0.04),rgba(233,30,140,0.04))" }}
            >
              {/* Large quote mark */}
              <div className="absolute top-5 left-7 opacity-20">
                <Quote size={52} style={{ color: "#2563eb" }} />
              </div>

              {/* Avatar */}
              <div className="flex justify-center mb-5">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full opacity-70"
                    style={{ background: "linear-gradient(135deg,#2563eb,#e91e8c)" }} />
                  <img
                    src={TESTIMONIALS[current].image}
                    alt={TESTIMONIALS[current].name}
                    className="relative w-20 h-20 rounded-full object-cover border-3 border-white shadow-lg"
                    style={{ border: "3px solid white" }}
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white"
                    style={{ background: "linear-gradient(135deg,#06b6d4,#2563eb)" }} />
                </div>
              </div>

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-5">
                {Array.from({ length: TESTIMONIALS[current].rating }).map((_, i) => (
                  <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <p className="text-gray-700 text-lg leading-relaxed mb-6 italic max-w-2xl mx-auto">
                "{TESTIMONIALS[current].review}"
              </p>

              <div>
                <div className="font-black text-gray-900">{TESTIMONIALS[current].name}</div>
                <div className="text-sm font-semibold mt-0.5" style={{ color: "#e91e8c" }}>
                  {TESTIMONIALS[current].treatment}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-blue-300 hover:text-blue-600 transition-all shadow-sm hover:shadow-md"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? "24px" : "10px",
                    height: "10px",
                    background: i === current
                      ? "linear-gradient(135deg,#2563eb,#e91e8c)"
                      : "#d1d5db",
                  }}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-blue-300 hover:text-blue-600 transition-all shadow-sm hover:shadow-md"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
