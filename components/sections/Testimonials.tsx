"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, MessageSquare } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";

type TestimonialItem = { id: string | number; name: string; review: string; rating: number; treatment?: string; image?: string };

export default function Testimonials() {
  const [items, setItems] = useState<TestimonialItem[]>(TESTIMONIALS);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data) && data.length > 0) { setItems(data); setCurrent(0); } })
      .catch(() => {});
  }, []);

  const len = items.length;

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % len), 5500);
    return () => clearInterval(timer);
  }, [len]);

  const prev = () => setCurrent((c) => (c - 1 + len) % len);
  const next = () => setCurrent((c) => (c + 1) % len);

  const t = items[current];

  return (
    <section
      className="py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg,#f0f6ff 0%,#e8f2ff 100%)" }}
    >
      {/* Decorative orbs */}
      <div
        className="absolute top-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-[0.08] pointer-events-none"
        style={{ background: "radial-gradient(circle,#2563eb,transparent)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-[0.08] pointer-events-none"
        style={{ background: "radial-gradient(circle,#0ea5e9,transparent)" }}
      />
      {/* Dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-chip mx-auto w-fit mb-5">
            <MessageSquare size={11} />
            Patient Stories
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            What Our <span className="gradient-text">Patients Say</span>
          </h2>
          <div className="heading-line mx-auto mb-5" />
          <p className="text-gray-500 max-w-xl mx-auto">
            Real experiences from real patients who trusted Jeevanasri with their health.
          </p>
        </motion.div>

        {/* ── Two-panel layout ── */}
        <div className="grid lg:grid-cols-5 gap-8 items-stretch">

          {/* Left panel — stats + all testimonial thumbs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {/* Rating summary card */}
            <div
              className="rounded-3xl p-7 text-white relative overflow-hidden"
              style={{ background: "linear-gradient(135deg,#1e3a8a,#1d4ed8,#0369a1)" }}
            >
              <div className="shine-overlay rounded-3xl" />
              <div className="relative">
                <div className="text-6xl font-black leading-none mb-1">4.9</div>
                <div className="flex gap-1 mb-2">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <div className="text-blue-200/80 text-sm font-semibold">Average Patient Rating</div>
                <div className="text-blue-200/55 text-xs mt-1">Based on 2,400+ reviews</div>
              </div>

              {/* Progress bars */}
              <div className="relative mt-5 space-y-2">
                {[
                  { stars: 5, pct: 87 },
                  { stars: 4, pct: 10 },
                  { stars: 3, pct: 2 },
                  { stars: 2, pct: 1 },
                ].map(({ stars, pct }) => (
                  <div key={stars} className="flex items-center gap-2">
                    <span className="text-blue-200/70 text-xs w-4">{stars}</span>
                    <Star size={10} className="text-yellow-400 fill-yellow-400 flex-shrink-0" />
                    <div className="flex-1 h-1.5 rounded-full bg-white/15 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${pct}%`, background: "rgba(255,255,255,0.6)" }}
                      />
                    </div>
                    <span className="text-blue-200/60 text-xs w-7 text-right">{pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial thumbnails */}
            <div className="grid grid-cols-2 gap-3">
              {items.map((t2, i) => (
                <button
                  key={t2.id}
                  onClick={() => setCurrent(i)}
                  className="relative rounded-2xl p-3 text-left transition-all duration-300 border"
                  style={
                    i === current
                      ? { background: "white", borderColor: "rgba(29,78,216,0.25)", boxShadow: "0 4px 20px rgba(29,78,216,0.12)" }
                      : { background: "rgba(255,255,255,0.6)", borderColor: "transparent" }
                  }
                >
                  <div className="flex items-center gap-2 mb-1">
                    {t2.image ? (
                      <img src={t2.image} alt={t2.name} className="w-7 h-7 rounded-full object-cover" />
                    ) : (
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black text-white flex-shrink-0"
                        style={{ background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)" }}>
                        {t2.name.charAt(0)}
                      </div>
                    )}
                    <div className="text-xs font-black text-gray-800 truncate">{t2.name.split(" ")[0]}</div>
                  </div>
                  <div className="text-[10px] font-semibold text-gray-500 truncate">{t2.treatment}</div>
                  {i === current && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl"
                      style={{ background: "linear-gradient(90deg,#1d4ed8,#0ea5e9)" }}
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right panel — testimonial card */}
          <div className="lg:col-span-3 flex flex-col">
            <div className="relative flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ duration: 0.45 }}
                  className="bg-white rounded-3xl p-10 shadow-xl border h-full flex flex-col"
                  style={{ borderColor: "rgba(29,78,216,0.08)" }}
                >
                  {/* Large decorative quote */}
                  <div className="mb-6">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                      style={{ background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)" }}
                    >
                      <Quote size={22} className="text-white" />
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>

                  {/* Review text */}
                  <p className="text-gray-700 text-lg leading-relaxed mb-8 italic flex-1">
                    "{t.review}"
                  </p>

                  {/* Patient info */}
                  <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                    <div className="relative">
                      <div
                        className="absolute -inset-1 rounded-full"
                        style={{ background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)", opacity: 0.6 }}
                      />
                      {t.image ? (
                        <img src={t.image} alt={t.name}
                          className="relative w-14 h-14 rounded-full object-cover border-2 border-white" />
                      ) : (
                        <div className="relative w-14 h-14 rounded-full border-2 border-white flex items-center justify-center text-lg font-black text-white"
                          style={{ background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)" }}>
                          {t.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-black text-gray-900 text-base">{t.name}</div>
                      <div className="text-sm font-semibold" style={{ color: "#0ea5e9" }}>
                        {t.treatment}
                      </div>
                    </div>

                    {/* Navigation — right side */}
                    <div className="ml-auto flex items-center gap-2">
                      <button
                        onClick={prev}
                        className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-all"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        onClick={next}
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-all hover:scale-105"
                        style={{ background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)" }}
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-5">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? "24px" : "8px",
                    height: "8px",
                    background: i === current
                      ? "linear-gradient(135deg,#1d4ed8,#0ea5e9)"
                      : "#d1d5db",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
