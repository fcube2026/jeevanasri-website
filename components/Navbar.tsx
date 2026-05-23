"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Phone, MessageCircle, ChevronDown,
  Heart, Bone, Brain, Baby, Stethoscope, Ear,
  CalendarCheck, Activity, FlaskConical,
  AlertCircle, UserRound, LogOut,
} from "lucide-react";
import { HOSPITAL_INFO } from "@/lib/data";

const SERVICES_MENU = [
  { icon: Heart,        label: "Cardiology",      color: "#1d4ed8" },
  { icon: Bone,         label: "Orthopedics",      color: "#0ea5e9" },
  { icon: Brain,        label: "Neurology",        color: "#7c3aed" },
  { icon: Baby,         label: "Pediatrics",       color: "#06b6d4" },
  { icon: Stethoscope,  label: "General Medicine", color: "#059669" },
  { icon: Ear,          label: "ENT",              color: "#d97706" },
  { icon: Activity,     label: "Physiotherapy",    color: "#0891b2" },
  { icon: FlaskConical, label: "Diagnostics",      color: "#6366f1" },
];

const NAV_LINKS = [
  { label: "Home",     href: "#home"      },
  { label: "About",    href: "#about"     },
  { label: "Doctors",  href: "#doctors"   },
  { label: "Services", href: "#services", hasDropdown: true },
  { label: "Blogs",    href: "#blogs"     },
  { label: "Contact",  href: "#contact"   },
];

export default function Navbar() {
  const router   = useRouter();
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled,      setScrolled]      = useState(false);
  const [scrollPct,     setScrollPct]     = useState(0);
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [servicesOpen,  setServicesOpen]  = useState(false);
  const [user,          setUser]          = useState<{ name: string; email: string } | null>(null);
  const [userMenuOpen,  setUserMenuOpen]  = useState(false);
  const dropRef     = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/user/me")
      .then((r) => r.json())
      .then((d) => setUser(d.user ?? null))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node))
        setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const logout = async () => {
    await fetch("/api/user/logout", { method: "POST" });
    setUser(null);
    setUserMenuOpen(false);
  };

  // Highlight the correct nav link based on current page
  useEffect(() => {
    if (pathname.startsWith("/blogs")) {
      setActiveSection("blogs");
      return;
    }
    if (pathname.startsWith("/auth")) {
      setActiveSection("");
      return;
    }
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      if (pathname !== "/") return;
      const winH = document.documentElement.scrollHeight - window.innerHeight;
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
  }, [pathname]);

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
    if (pathname !== "/") {
      router.push(`/${href}`);
    } else {
      document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ══ Announcement bar ══ */}
      <div
        className="relative z-50 overflow-hidden"
        style={{ background: "linear-gradient(90deg,#1e3a8a,#1d4ed8,#0369a1)" }}
      >
        {/* Scrolling ticker content */}
        <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5">
          <div className="flex items-center gap-2 text-white/90 text-xs font-semibold">
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              Emergency 24/7
            </span>
            <span className="hidden sm:flex items-center gap-2 text-white/50">
              <span>|</span>
              <a href={`tel:${HOSPITAL_INFO.phone}`} className="text-white hover:text-blue-200 transition-colors">
                {HOSPITAL_INFO.phone}
              </a>
              <span>|</span>
              <span className="text-white/80">NABH Accredited Hospital</span>
              <span>|</span>
              <span className="text-white/80">40+ Expert Specialists</span>
              <span>|</span>
              <span className="text-white/80">Aswaraopeta, Telangana</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a
              href={HOSPITAL_INFO.social.facebook}
              className="text-white/60 hover:text-white transition-colors text-xs font-semibold"
            >
              Facebook
            </a>
            <span className="text-white/30">·</span>
            <a
              href={HOSPITAL_INFO.social.instagram}
              className="text-white/60 hover:text-white transition-colors text-xs font-semibold"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* ══ Main navbar ══ */}
      <nav
        className="sticky top-0 z-40 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.94)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow: scrolled
            ? "0 4px 40px rgba(29,78,216,0.10), 0 1px 0 rgba(29,78,216,0.06)"
            : "0 1px 0 rgba(0,0,0,0.04)",
        }}
      >
        {/* Scroll-progress bar */}
        <div className="h-0.5 w-full bg-gray-100/80 absolute bottom-0 left-0">
          <motion.div
            className="h-full origin-left"
            style={{
              width: `${scrollPct}%`,
              background: "linear-gradient(90deg,#1e3a8a,#2563eb,#0ea5e9)",
            }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[68px]">

            {/* ── Logo ── */}
            <button onClick={() => scrollTo("#home")} className="flex items-center gap-3 group flex-shrink-0">
              <div className="relative">
                <div
                  className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-sm"
                  style={{ background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)" }}
                />
                <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-white shadow-md border border-gray-100 group-hover:scale-105 transition-transform duration-300">
                  <img src="/logo.jpeg" alt="Jeevanasri" className="w-full h-full object-contain p-0.5" />
                </div>
              </div>
              <div className="hidden sm:block text-left">
                <div
                  className="font-black text-[16px] leading-tight tracking-tight"
                  style={{
                    background: "linear-gradient(135deg,#1e3a8a 0%,#1d4ed8 50%,#0ea5e9 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Jeevanasri
                </div>
                <div className="text-[9px] font-black tracking-[0.22em] text-gray-400 uppercase">
                  Hospitals · NABH
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
                            : "text-gray-600 hover:text-blue-600 hover:bg-gray-50/80"
                        }`}
                      >
                        {link.label}
                        <motion.div animate={{ rotate: servicesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                          <ChevronDown size={13} />
                        </motion.div>
                        {isActive && (
                          <span
                            className="absolute bottom-1 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full"
                            style={{ background: "linear-gradient(90deg,#1d4ed8,#0ea5e9)" }}
                          />
                        )}
                      </button>

                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.97 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 rounded-2xl overflow-hidden border border-gray-100/80 shadow-2xl z-50"
                            style={{ background: "rgba(255,255,255,0.98)", backdropFilter: "blur(24px)" }}
                          >
                            {/* Dropdown header */}
                            <div className="px-4 pt-4 pb-2 border-b border-gray-50">
                              <p className="text-[10px] font-black text-gray-400 tracking-widest uppercase">
                                Our Specializations
                              </p>
                            </div>
                            <div className="p-3 grid grid-cols-2 gap-1">
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
                                    <Icon size={14} style={{ color }} />
                                  </div>
                                  <span className="text-xs font-semibold text-gray-700">{label}</span>
                                </button>
                              ))}
                            </div>
                            <div className="px-4 py-3 border-t border-gray-50 bg-gradient-to-r from-blue-50/50 to-sky-50/50">
                              <button
                                onClick={() => scrollTo("#services")}
                                className="w-full text-center text-xs font-black py-1.5 rounded-lg transition-all hover:bg-white"
                                style={{ color: "#1d4ed8" }}
                              >
                                View all 12 services →
                              </button>
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
                        : "text-gray-600 hover:text-blue-600 hover:bg-gray-50/80"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full"
                        style={{ background: "linear-gradient(90deg,#1d4ed8,#0ea5e9)" }}
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
                className="relative flex items-center gap-2 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-200 btn-shimmer overflow-hidden"
              >
                <span className="shine-overlay rounded-xl" />
                <CalendarCheck size={15} />
                Book Appointment
              </button>

              {/* User auth */}
              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen((v) => !v)}
                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all"
                  >
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white flex-shrink-0"
                      style={{ background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)" }}>
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-xs font-black text-gray-700 max-w-[80px] truncate">{user.name.split(" ")[0]}</span>
                    <ChevronDown size={12} className="text-gray-400" />
                  </button>
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-52 rounded-2xl overflow-hidden border border-gray-100 shadow-xl z-50 bg-white"
                      >
                        <div className="px-4 py-3 border-b border-gray-50">
                          <div className="font-black text-gray-900 text-sm truncate">{user.name}</div>
                          <div className="text-xs text-gray-400 truncate">{user.email}</div>
                        </div>
                        <button
                          onClick={logout}
                          className="flex items-center gap-2.5 w-full px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <LogOut size={14} />
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  onClick={() => router.push("/auth")}
                  className="flex items-center gap-2 text-sm font-black text-blue-700 px-4 py-2.5 rounded-xl border border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all whitespace-nowrap"
                >
                  <UserRound size={14} />
                  Sign In
                </button>
              )}
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden relative w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
              style={{ background: menuOpen ? "rgba(29,78,216,0.08)" : "transparent" }}
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
              style={{ background: "rgba(255,255,255,0.99)", backdropFilter: "blur(24px)" }}
            >
              <div className="px-4 py-4 space-y-1">
                {/* Emergency strip */}
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl mb-2"
                  style={{ background: "linear-gradient(135deg,rgba(29,78,216,0.06),rgba(14,165,233,0.06))", border: "1px solid rgba(29,78,216,0.1)" }}>
                  <AlertCircle size={13} className="text-blue-600 flex-shrink-0" />
                  <span className="text-xs font-bold text-blue-700">Emergency: {HOSPITAL_INFO.phone}</span>
                </div>

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
                          ? { background: "linear-gradient(135deg,rgba(29,78,216,0.08),rgba(14,165,233,0.06))", color: "#1d4ed8", border: "1px solid rgba(29,78,216,0.12)" }
                          : { color: "#374151" }
                      }
                    >
                      <span className="flex items-center gap-3">
                        {isActive && (
                          <span className="w-1.5 h-5 rounded-full" style={{ background: "linear-gradient(180deg,#1d4ed8,#0ea5e9)" }} />
                        )}
                        {link.label}
                      </span>
                      {isActive && <span className="text-xs text-blue-400">●</span>}
                    </motion.button>
                  );
                })}

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

                {user ? (
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white"
                        style={{ background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)" }}>
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-bold text-gray-700">{user.name.split(" ")[0]}</span>
                    </div>
                    <button onClick={logout} className="text-xs text-red-500 font-bold flex items-center gap-1">
                      <LogOut size={12} /> Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { setMenuOpen(false); router.push("/auth"); }}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-black text-blue-700 border border-blue-200 hover:bg-blue-50 transition-colors"
                  >
                    <UserRound size={14} /> Sign In / Register
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
