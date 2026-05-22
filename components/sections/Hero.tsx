"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, ChevronLeft, ChevronRight, Shield, Clock, Zap, Star } from "lucide-react";
import { HOSPITAL_INFO } from "@/lib/data";

const SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1600&h=900&fit=crop&q=80",
    badge: "Welcome to Jeevanasri Hospitals",
    heading: "Expert Care for\nEvery Life",
    sub: "Trust Your Health with Our Expert Specialists at Jeevanasri Multispeciality Hospital",
    overlayFrom: "#0d2d6b",
    overlayTo: "#1a4fbd",
  },
  {
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1600&h=900&fit=crop&q=80",
    badge: "Advanced Medical Care",
    heading: "Compassionate Care,\nAdvanced Treatment",
    sub: "40+ Expert Doctors · 12 Specializations · NABH Accredited · 24/7 Emergency",
    overlayFrom: "#6b0d4b",
    overlayTo: "#c01475",
  },
  {
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1600&h=900&fit=crop&q=80",
    badge: "State-of-the-Art Facilities",
    heading: "Modern Equipment,\nBetter Outcomes",
    sub: "Equipped with the latest diagnostic and surgical technology for the best patient outcomes.",
    overlayFrom: "#0d4f6b",
    overlayTo: "#0891b2",
  },
  {
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1600&h=900&fit=crop&q=80",
    badge: "Emergency & Critical Care",
    heading: "24/7 Emergency Care\nWhen You Need It Most",
    sub: "Round-the-clock emergency services with fully equipped trauma unit and ICU support.",
    overlayFrom: "#6b0d0d",
    overlayTo: "#dc2626",
  },
];

const STATS = [
  { icon: Shield, label: "Expert Doctors", value: "40+" },
  { icon: Clock,  label: "24/7 Support",   value: "Always" },
  { icon: Zap,    label: "Specializations", value: "12+" },
  { icon: Star,   label: "Patients Served", value: "50K+" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const len = SLIDES.length;

  const next = () => setCurrent((c) => (c + 1) % len);
  const prev = () => setCurrent((c) => (c - 1 + len) % len);

  // Auto-advance every 4 seconds — simple, reliable
  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const slide = SLIDES[current];

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden"
      style={{ height: "100vh", minHeight: "600px" }}
    >
      {/* ── Background image (cross-fade) ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Coloured overlay: strong on left, fades to transparent on right ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`overlay-${current}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
          className="absolute inset-0"
          style={{
            background: `linear-gradient(100deg, ${slide.overlayFrom}f0 0%, ${slide.overlayTo}cc 38%, ${slide.overlayTo}55 60%, transparent 82%)`,
          }}
        />
      </AnimatePresence>

      {/* ── Dark vignette at bottom for stat cards ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 35%)" }}
      />

      {/* ── CONTENT ── */}
      <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 flex flex-col justify-between py-10">

        {/* Main text block */}
        <div className="flex flex-col justify-center flex-1 max-w-2xl pt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${current}`}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="w-6 h-0.5 rounded bg-white/70" />
                <span className="text-white/90 text-sm font-semibold tracking-wide">
                  {slide.badge}
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-5 whitespace-pre-line drop-shadow-md">
                {slide.heading}
              </h1>

              {/* Sub-text */}
              <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
                {slide.sub}
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href={`tel:${HOSPITAL_INFO.phone}`}
                  className="flex items-center gap-3 bg-white text-blue-800 px-8 py-3.5 rounded-full font-black text-sm hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  <Phone size={17} />
                  Book Appointment
                </a>
                <a
                  href={`https://wa.me/${HOSPITAL_INFO.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-green-500 hover:bg-green-400 text-white px-8 py-3.5 rounded-full font-black text-sm transition-all duration-300 hover:scale-105 shadow-xl"
                >
                  <MessageCircle size={17} />
                  WhatsApp Us
                </a>
                <button
                  onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                  className="flex items-center gap-3 bg-white/15 backdrop-blur-sm border border-white/40 text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-white/25 transition-all duration-300"
                >
                  Discover More
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom row: stat cards + navigation */}
        <div className="flex flex-col sm:flex-row items-end sm:items-center justify-between gap-6 pb-2">

          {/* Stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full sm:w-auto">
            {STATS.map(({ icon: Icon, label, value }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 min-w-[130px]"
              >
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Icon size={17} className="text-white" />
                </div>
                <div>
                  <div className="text-white font-black text-base leading-none">{value}</div>
                  <div className="text-white/65 text-xs mt-0.5">{label}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Slide controls */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Prev */}
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft size={19} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="rounded-full transition-all duration-400"
                  style={{
                    width:  i === current ? "28px" : "8px",
                    height: "8px",
                    background: i === current ? "white" : "rgba(255,255,255,0.45)",
                  }}
                />
              ))}
            </div>

            {/* Next */}
            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all"
              aria-label="Next slide"
            >
              <ChevronRight size={19} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Slide counter (top-right) ── */}
      <div className="absolute top-6 right-8 text-white/60 text-sm font-bold tabular-nums select-none">
        <span className="text-white text-lg font-black">{String(current + 1).padStart(2, "0")}</span>
        {" / "}
        {String(len).padStart(2, "0")}
      </div>
    </section>
  );
}
