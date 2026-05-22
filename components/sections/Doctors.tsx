"use client";
import { motion } from "framer-motion";
import { Clock, Award, Star } from "lucide-react";
import { DOCTORS } from "@/lib/data";

export default function Doctors() {
  return (
    <section id="doctors" className="py-24 relative overflow-hidden" style={{ background: "#f8faff" }}>
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-6"
        style={{ background: "radial-gradient(circle, #2563eb, transparent)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
            style={{ background: "rgba(233,30,140,0.08)", color: "#e91e8c", border: "1px solid rgba(233,30,140,0.15)" }}>
            Our Team
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900">
            Meet Our <span className="gradient-text">Expert Doctors</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
            Board-certified specialists bringing decades of expertise and genuine care to every patient.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {DOCTORS.map((doc, i) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="gradient-border bg-white overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-60">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 transition-opacity duration-300"
                  style={{ background: "linear-gradient(to top, rgba(10,15,46,0.85) 0%, transparent 55%)" }} />

                {/* Specialty badge */}
                <div className="absolute top-4 left-4">
                  <span className="text-white text-xs font-bold px-3 py-1.5 rounded-full"
                    style={{ background: "linear-gradient(135deg,#2563eb,#e91e8c)" }}>
                    {doc.specialization}
                  </span>
                </div>

                {/* Rating */}
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-2.5 py-1">
                  <Star size={11} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-xs font-bold">4.9</span>
                </div>

                {/* Bottom info on image */}
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-lg font-black text-white">{doc.name}</h3>
                  <p className="text-cyan-300 text-xs font-semibold">{doc.qualification}</p>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{doc.bio}</p>

                <div className="flex items-center gap-4 mb-5">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Award size={13} style={{ color: "#2563eb" }} />
                    <span className="font-semibold text-gray-700">{doc.experience}</span>
                  </div>
                  <div className="w-px h-4 bg-gray-200" />
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Clock size={13} style={{ color: "#e91e8c" }} />
                    <span className="truncate">{doc.availability}</span>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
