"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Phone, MessageCircle, ChevronDown,
  Heart, Bone, Brain, Baby, Stethoscope, Ear,
  CalendarCheck,
} from "lucide-react";
import { HOSPITAL_INFO } from "@/lib/data";

const SERVICES_MENU = [
  { icon: Heart,      label: "Cardiology",       color: "#e91e8c" },
  { icon: Bone,       label: "Orthopedics",       color: "#2563eb" },
  { icon: Brain,      label: "Neurology",         color: "#7c3aed" },
  { icon: Baby,       label: "Pediatrics",        color: "#06b6d4" },
  { icon: Stethoscope,label: "General Medicine",  color: "#059669" },
  { icon: Ear,        label: "ENT",               color: "#d97706" },
];

const NAV_LINKS = [
  { label: "Home",     href: "#home"      },
  { label: "About Us", href: "#about"     },
  { label: "Doctors",  href: "#doctors"   },
  { label: "Services", href: "#services", hasDropdown: true },
  { label: "Blogs",    href: "#blogs"     },
  { label: "Contact",  href: "#contact"   },
];

export default function Navbar() {
  const [activeSection, setActiveSection]   = useState("home");
  const [scrolled,      setScrolled]        = useState(false);
  const [scrollPct,     setScrollPct]       = useState(0);
  const [menuOpen,      setMenuOpen]        = useState(false);
  const [servicesOpen,  setServicesOpen]    = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  /* ── scroll tracking ── */
  useEffect(() => {
    const onScroll = () => {
      const winH  = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(winH > 0 ? (window.scrollY / winH) * 100 : 0);
      setScrolled(window.scrollY > 40);

      const ids = NAV_LINKS.map((l) => l.href.replace("#", ""));
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── close dropdown on outside click ── */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node))
        setServicesOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    setServicesOpen(false);
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ══════════════════════════════════════════
          MAIN NAVBAR
      ══════════════════════════════════════════ */}
      <nav
        className="sticky top-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(255,255,255,0.97)"
            : "rgba(255,255,255,0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: scrolled
            ? "0 4px 40px rgba(37,99,235,0.10), 0 1px 0 rgba(37,99,235,0.06)"
            : "none",
        }}
      >
        {/* Scroll-progress bar */}
        <div className="h-0.5 w-full bg-gray-100 absolute bottom-0 left-0">
          <motion.div
            className="h-full origin-left"
            style={{
              width: `${scrollPct}%`,
              background: "linear-gradient(90deg,#2563eb,#06b6d4,#e91e8c)",
            }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[68px]">

            {/* ── Logo ── */}
            <button
              onClick={() => scrollTo("#home")}
              className="flex items-center gap-3 group flex-shrink-0"
            >
              <div className="relative">
                <div
                  className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-sm"
                  style={{ background: "linear-gradient(135deg,#2563eb,#e91e8c)" }}
                />
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white shadow-md border border-gray-100 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src="/logo.jpeg"
                    alt="Jeevanasri Hospitals"
                    className="w-full h-full object-contain p-0.5"
                  />
                </div>
              </div>
              <div className="text-left hidden sm:block">
                <div
                  className="font-black text-[17px] leading-tight tracking-tight"
                  style={{
                    background: "linear-gradient(135deg,#1d4ed8 0%,#0891b2 50%,#e91e8c 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Jeevanasri
                </div>
                <div className="text-[9px] font-black tracking-[0.2em] text-gray-400 uppercase">
                  Hospitals · NABH Accredited
                </div>
              </div>
            </button>

            {/* ── Desktop links ── */}
            <div className="hidden lg:flex items-center gap-0.5">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");

                if (link.hasDropdown) {
                  return (
                    <div key={link.href} className="relative" ref={dropRef}>
                      <button
                        onClick={() => setServicesOpen((o) => !o)}
                        className={`flex items-center gap-1 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                          isActive || servicesOpen
                            ? "text-blue-700 bg-blue-50"
                            : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                        }`}
                      >
                        {link.label}
                        <motion.div
                          animate={{ rotate: servicesOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown size={13} />
                        </motion.div>
                        {isActive && (
                          <span
                            className="absolute bottom-1 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full"
                            style={{ background: "linear-gradient(90deg,#2563eb,#e91e8c)" }}
                          />
                        )}
                      </button>

                      {/* Services mega-dropdown */}
                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.97 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 rounded-2xl overflow-hidden border border-gray-100 shadow-2xl z-50"
                            style={{ background: "rgba(255,255,255,0.98)", backdropFilter: "blur(20px)" }}
                          >
                            <div className="p-3">
                              <p className="text-[10px] font-black text-gray-400 tracking-widest uppercase px-2 mb-2">
                                Our Specializations
                              </p>
                              <div className="grid grid-cols-2 gap-1">
                                {SERVICES_MENU.map(({ icon: Icon, label, color }) => (
                                  <button
                                    key={label}
                                    onClick={() => scrollTo("#services")}
                                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left group/item"
                                  >
                                    <div
                                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform"
                                      style={{ background: `${color}15` }}
                                    >
                                      <Icon size={15} style={{ color }} />
                                    </div>
                                    <span className="text-xs font-semibold text-gray-700">{label}</span>
                                  </button>
                                ))}
                              </div>
                              <div className="mt-2 pt-2 border-t border-gray-100 px-2">
                                <button
                                  onClick={() => scrollTo("#services")}
                                  className="w-full text-center text-xs font-bold py-2 rounded-xl transition-colors"
                                  style={{ color: "#2563eb" }}
                                >
                                  View all 12 services →
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className={`relative px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                      isActive
                        ? "text-blue-700 bg-blue-50"
                        : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full"
                        style={{ background: "linear-gradient(90deg,#2563eb,#e91e8c)" }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* ── Desktop CTAs ── */}
            <div className="hidden lg:flex items-center gap-2">
              <a
                href={`tel:${HOSPITAL_INFO.phone}`}
                className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-blue-700 px-3 py-2 rounded-xl hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Phone size={13} className="text-blue-600" />
                </div>
                <span className="text-xs">{HOSPITAL_INFO.phone}</span>
              </a>

              <a
                href={`https://wa.me/${HOSPITAL_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-green-200"
                style={{ background: "linear-gradient(135deg,#16a34a,#22c55e)" }}
              >
                <MessageCircle size={15} />
                WhatsApp
              </a>

              <button
                onClick={() => scrollTo("#appointment")}
                className="flex items-center gap-2 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-200 btn-shimmer"
              >
                <CalendarCheck size={15} />
                Book Appointment
              </button>
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden relative w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
              style={{ background: menuOpen ? "rgba(37,99,235,0.08)" : "transparent" }}
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.div key="x"
                    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <X size={22} className="text-blue-700" />
                  </motion.div>
                ) : (
                  <motion.div key="menu"
                    initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <Menu size={22} className="text-gray-700" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden border-t border-gray-100"
              style={{ background: "rgba(255,255,255,0.98)", backdropFilter: "blur(20px)" }}
            >
              <div className="px-4 py-4 space-y-1">
                {NAV_LINKS.map((link, i) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <motion.button
                      key={link.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => scrollTo(link.href)}
                      className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                      style={
                        isActive
                          ? { background: "linear-gradient(135deg,rgba(37,99,235,0.08),rgba(6,182,212,0.06))", color: "#1d4ed8", border: "1px solid rgba(37,99,235,0.12)" }
                          : { color: "#374151" }
                      }
                    >
                      <span className="flex items-center gap-3">
                        {isActive && (
                          <span className="w-1.5 h-5 rounded-full" style={{ background: "linear-gradient(180deg,#2563eb,#e91e8c)" }} />
                        )}
                        {link.label}
                      </span>
                      {isActive && <span className="text-xs text-blue-400">●</span>}
                    </motion.button>
                  );
                })}

                {/* Mobile CTAs */}
                <div className="pt-3 grid grid-cols-2 gap-2 border-t border-gray-100">
                  <a
                    href={`tel:${HOSPITAL_INFO.phone}`}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold border border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors"
                  >
                    <Phone size={14} /> Call Now
                  </a>
                  <button
                    onClick={() => scrollTo("#appointment")}
                    className="btn-shimmer text-white py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
                  >
                    <CalendarCheck size={14} /> Book Now
                  </button>
                </div>

                <a
                  href={`https://wa.me/${HOSPITAL_INFO.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white transition-all"
                  style={{ background: "linear-gradient(135deg,#16a34a,#22c55e)" }}
                >
                  <MessageCircle size={14} /> Chat on WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
