"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, User, ArrowUpRight } from "lucide-react";
import { BLOGS } from "@/lib/data";

const CATEGORIES = ["All", "Cardiology", "Gynecology", "General Medicine", "Orthopedics"];

const CAT_COLORS: Record<string, { bg: string; text: string }> = {
  Cardiology: { bg: "rgba(37,99,235,0.1)", text: "#2563eb" },
  Gynecology: { bg: "rgba(233,30,140,0.1)", text: "#e91e8c" },
  "General Medicine": { bg: "rgba(6,182,212,0.1)", text: "#0891b2" },
  Orthopedics: { bg: "rgba(37,99,235,0.08)", text: "#1d4ed8" },
};

export default function Blogs() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? BLOGS : BLOGS.filter((b) => b.category === active);

  return (
    <section id="blogs" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-[0.04]"
        style={{ background: "radial-gradient(circle,#2563eb,transparent)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
            style={{ background: "rgba(6,182,212,0.08)", color: "#0891b2", border: "1px solid rgba(6,182,212,0.2)" }}>
            Health Blog
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900">
            Expert Health <span className="gradient-text">Insights</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
            Doctor-written articles to help you stay informed and make better health decisions.
          </p>
        </motion.div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
              style={
                active === cat
                  ? { background: "linear-gradient(135deg,#2563eb,#e91e8c)", color: "white", boxShadow: "0 4px 15px rgba(37,99,235,0.3)" }
                  : { background: "white", color: "#4b5563", border: "1px solid #e5e7eb" }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((blog, i) => {
            const catStyle = CAT_COLORS[blog.category] || { bg: "rgba(37,99,235,0.1)", text: "#2563eb" };
            return (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09, duration: 0.5 }}
                className="gradient-border bg-white overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-400 cursor-pointer"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-44">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    style={{ background: "linear-gradient(135deg,#2563eb,#e91e8c)" }} />
                  <span
                    className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full"
                    style={{ background: "rgba(255,255,255,0.92)", color: catStyle.text, backdropFilter: "blur(4px)" }}
                  >
                    {blog.category}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <User size={11} />
                      <span className="truncate">{blog.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={11} />
                      {blog.date}
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-sm leading-snug line-clamp-2 group-hover:text-blue-700 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-3">{blog.preview}</p>
                  <div className="flex items-center gap-1 text-sm font-bold transition-all duration-200"
                    style={{ color: "#e91e8c" }}>
                    Read More
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
