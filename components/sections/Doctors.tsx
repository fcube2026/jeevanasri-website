"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Award, Star, Users } from "lucide-react";
import { DOCTORS } from "@/lib/data";

type Doctor = { id: string | number; name: string; specialization: string; experience?: string; qualification?: string; availability?: string; bio?: string; image?: string };

const SPECIALTY_COLORS: Record<string, string> = {
  "Cardiologist":                "#1d4ed8",
  "Gynecologist & Obstetrician": "#0ea5e9",
  "Orthopedic Surgeon":          "#0369a1",
  "Pediatrician":                "#06b6d4",
  "Neurologist":                 "#7c3aed",
  "Dermatologist":               "#0891b2",
};

export default function Doctors() {
  const [docs, setDocs] = useState<Doctor[]>(DOCTORS);

  useEffect(() => {
    fetch("/api/doctors")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data) && data.length > 0) setDocs(data); })
      .catch(() => {});
  }, []);

  return (
    <section id="doctors" className="py-28 relative overflow-hidden" style={{ background: "#f0f6ff" }}>

      {/* Dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-50 pointer-events-none" />

      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-[0.07] pointer-events-none"
        style={{ background: "radial-gradient(circle, #2563eb, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-chip mx-auto w-fit mb-5">
            <Users size={11} />
            Our Team
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            Meet Our <span className="gradient-text">Expert Doctors</span>
          </h2>
          <div className="heading-line mx-auto mb-5" />
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Board-certified specialists bringing decades of expertise and genuine care to every patient.
          </p>
        </motion.div>

        {/* ── Doctor cards ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {docs.map((doc, i) => {
            const specColor = SPECIALTY_COLORS[doc.specialization] || "#1d4ed8";
            return (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="gradient-border bg-white overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-500 card-lift"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-64">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{ background: "linear-gradient(to top, rgba(8,12,42,0.92) 0%, rgba(8,12,42,0.4) 45%, transparent 65%)" }}
                  />

                  {/* Specialty badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className="text-white text-[11px] font-black px-3 py-1.5 rounded-full shadow-lg"
                      style={{ background: `linear-gradient(135deg,${specColor},${specColor}cc)` }}
                    >
                      {doc.specialization}
                    </span>
                  </div>

                  {/* Rating badge */}
                  <div
                    className="absolute top-4 right-4 flex items-center gap-1 rounded-full px-2.5 py-1 shadow-lg"
                    style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.25)" }}
                  >
                    <Star size={11} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-xs font-black">4.9</span>
                  </div>

                  {/* Name + qualification on image */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-black text-white leading-tight mb-0.5">{doc.name}</h3>
                    <p className="text-sky-300 text-xs font-bold">{doc.qualification}</p>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-2">{doc.bio}</p>

                  {/* Meta row */}
                  <div
                    className="flex items-center gap-4 mb-5 py-3 px-4 rounded-xl"
                    style={{ background: "#f8faff", border: "1px solid rgba(29,78,216,0.07)" }}
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)" }}
                      >
                        <Award size={11} className="text-white" />
                      </div>
                      <span className="font-black text-gray-800">{doc.experience}</span>
                    </div>
                    <div className="w-px h-6 bg-gray-200" />
                    <div className="flex items-center gap-2 text-xs text-gray-500 min-w-0">
                      <div
                        className="w-6 h-6 rounded-lg flex-shrink-0 flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg,#0ea5e9,#38bdf8)" }}
                      >
                        <Clock size={11} className="text-white" />
                      </div>
                      <span className="truncate font-medium">{doc.availability}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => document.getElementById("appointment")?.scrollIntoView({ behavior: "smooth" })}
                    className="w-full py-3 rounded-xl text-sm font-black text-white transition-all hover:scale-[1.02] hover:shadow-lg overflow-hidden relative"
                    style={{ background: `linear-gradient(135deg,${specColor},${specColor}bb)` }}
                  >
                    <span className="shine-overlay rounded-xl" />
                    Book Appointment
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
