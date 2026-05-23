"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, ChevronLeft, ChevronRight, Shield, Clock, Zap, Star, Award } from "lucide-react";
import { HOSPITAL_INFO } from "@/lib/data";

const SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1600&h=900&fit=crop&q=80",
    badge: "Welcome to Jeevanasri Hospitals",
    heading: "Expert Care for\nEvery Life",
    sub: "Trust Your Health with Our Expert Specialists at Jeevanasri Multispeciality Hospital",
    overlayFrom: "#0d2d6b",
    overlayTo: "#1a4fbd",
    tag: "NABH Accredited",
  },
  {
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1600&h=900&fit=crop&q=80",
    badge: "Advanced Medical Care",
    heading: "Compassionate Care,\nAdvanced Treatment",
    sub: "40+ Expert Doctors · 12 Specializations · NABH Accredited · 24/7 Emergency",
    overlayFrom: "#0c1d4d",
    overlayTo: "#1a4fa0",
    tag: "40+ Specialists",
  },
  {
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1600&h=900&fit=crop&q=80",
    badge: "State-of-the-Art Facilities",
    heading: "Modern Equipment,\nBetter Outcomes",
    sub: "Equipped with the latest diagnostic and surgical technology for the best patient outcomes.",
    overlayFrom: "#0d4f6b",
    overlayTo: "#0891b2",
    tag: "Advanced Diagnostics",
  },
  {
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1600&h=900&fit=crop&q=80",
    badge: "Emergency & Critical Care",
    heading: "24/7 Emergency Care\nWhen You Need It Most",
    sub: "Round-the-clock emergency services with fully equipped trauma unit and ICU support.",
    overlayFrom: "#6b0d0d",
    overlayTo: "#dc2626",
    tag: "24/7 Emergency",
  },
];

const STATS = [
  { icon: Shield, label: "Expert Doctors",  value: "40+",   color: "#1d4ed8" },
  { icon: Clock,  label: "24/7 Support",    value: "Always", color: "#0ea5e9" },
  { icon: Zap,    label: "Specializations", value: "12+",   color: "#06b6d4" },
  { icon: Star,   label: "Patients Served", value: "50K+",  color: "#0891b2" },
];

const ACCREDITATIONS = [
  { label: "NABH", sub: "Accredited" },
  { label: "ISO",  sub: "9001:2015" },
  { label: "JCI",  sub: "Compliant" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const len = SLIDES.length;

  const next = () => setCurrent((c) => (c + 1) % len);
  const prev = () => setCurrent((c) => (c - 1 + len) % len);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), 4500);
    return () => clearInterval(t);
  }, []);

  const slide = SLIDES[current];

  return (
    <section id="home" className="relative w-full overflow-hidden" style={{ height: "100vh", minHeight: "640px" }}>

      {/* ── Background images ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img src={slide.image} alt="" className="w-full h-full object-cover object-center" />
        </motion.div>
      </AnimatePresence>

      {/* ── Colour overlay ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`overlay-${current}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0 }}
          className="absolute inset-0"
          style={{
            background: `linear-gradient(110deg, ${slide.overlayFrom}f2 0%, ${slide.overlayTo}cc 40%, ${slide.overlayTo}55 65%, transparent 85%)`,
          }}
        />
      </AnimatePresence>

      {/* ── Dark bottom vignette for stat cards ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 38%)" }}
      />

      {/* ── Subtle top fade ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 20%)" }}
      />

      {/* ── CONTENT ── */}
      <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 flex flex-col justify-between py-10">

        {/* Accreditation badges — top right area */}
        <div className="flex justify-end pt-2">
          <div className="flex gap-2">
            {ACCREDITATIONS.map((acc) => (
              <div
                key={acc.label}
                className="hidden sm:flex flex-col items-center px-3 py-1.5 rounded-xl text-white"
                style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)" }}
              >
                <span className="text-xs font-black leading-none">{acc.label}</span>
                <span className="text-[9px] font-semibold opacity-75 mt-0.5">{acc.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main text */}
        <div className="flex flex-col justify-center flex-1 max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${current}`}
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              {/* Slide tag pill */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 mb-5"
              >
                <div
                  className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide text-white"
                  style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.25)" }}
                >
                  <Award size={11} className="opacity-80" />
                  {slide.badge}
                </div>
              </motion.div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-[3.6rem] font-black text-white leading-[1.08] mb-5 whitespace-pre-line drop-shadow-lg">
                {slide.heading}
              </h1>

              {/* Decorative line */}
              <div className="w-16 h-1 rounded-full mb-5" style={{ background: "rgba(255,255,255,0.5)" }} />

              {/* Sub-text */}
              <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
                {slide.sub}
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={`tel:${HOSPITAL_INFO.phone}`}
                  className="relative flex items-center gap-2.5 bg-white text-blue-800 px-7 py-3.5 rounded-full font-black text-sm hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-2xl overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 opacity-0 hover:opacity-100 transition-opacity" />
                  <Phone size={16} />
                  Book Appointment
                </a>
                <a
                  href={`https://wa.me/${HOSPITAL_INFO.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 bg-green-500 hover:bg-green-400 text-white px-7 py-3.5 rounded-full font-black text-sm transition-all duration-300 hover:scale-105 shadow-2xl"
                >
                  <MessageCircle size={16} />
                  WhatsApp Us
                </a>
                <button
                  onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                  className="flex items-center gap-2.5 bg-white/12 backdrop-blur-sm border border-white/35 text-white px-7 py-3.5 rounded-full font-bold text-sm hover:bg-white/22 transition-all duration-300"
                >
                  Discover More
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-end sm:items-center justify-between gap-6 pb-2">

          {/* Stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full sm:w-auto">
            {STATS.map(({ icon: Icon, label, value, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 min-w-[130px]"
                style={{
                  background: "rgba(255,255,255,0.10)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.18)",
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}30`, border: `1px solid ${color}50` }}
                >
                  <Icon size={17} className="text-white" />
                </div>
                <div>
                  <div className="text-white font-black text-base leading-none">{value}</div>
                  <div className="text-white/60 text-xs mt-0.5">{label}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Slide controls */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white/12 backdrop-blur-sm border border-white/25 flex items-center justify-center text-white hover:bg-white/28 transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft size={19} />
            </button>
            <div className="flex items-center gap-2">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="rounded-full transition-all duration-400"
                  style={{
                    width: i === current ? "28px" : "8px",
                    height: "8px",
                    background: i === current ? "white" : "rgba(255,255,255,0.4)",
                  }}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-white/12 backdrop-blur-sm border border-white/25 flex items-center justify-center text-white hover:bg-white/28 transition-all"
              aria-label="Next slide"
            >
              <ChevronRight size={19} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Slide counter ── */}
      <div className="absolute top-[76px] right-8 text-white/55 text-sm font-bold tabular-nums select-none">
        <span className="text-white text-lg font-black">{String(current + 1).padStart(2, "0")}</span>
        {" / "}
        {String(len).padStart(2, "0")}
      </div>

      {/* ── Wave bottom divider ── */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: "80px" }}
      >
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0 80 L0 40 Q360 0 720 40 Q1080 80 1440 40 L1440 80 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
