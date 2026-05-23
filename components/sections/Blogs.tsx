"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, ArrowUpRight, BookOpen, ArrowRight } from "lucide-react";
import { BLOGS } from "@/lib/data";

type BlogItem = { id: string | number; slug?: string; title: string; author: string; category: string; date: string; preview: string; image: string };

const CAT_COLORS: Record<string, { bg: string; text: string }> = {
  Cardiology:          { bg: "rgba(29,78,216,0.1)",  text: "#1d4ed8" },
  Gynecology:          { bg: "rgba(14,165,233,0.1)", text: "#0ea5e9" },
  "General Medicine":  { bg: "rgba(6,182,212,0.1)",  text: "#0891b2" },
  Orthopedics:         { bg: "rgba(3,105,161,0.1)",  text: "#0369a1" },
};

const PREVIEW_COUNT = 3;

export default function Blogs() {
  const [allBlogs, setAllBlogs] = useState<BlogItem[]>(BLOGS as BlogItem[]);
  const [active, setActive]     = useState("All");

  useEffect(() => {
    fetch("/api/blogs")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data) && data.length > 0) setAllBlogs(data); })
      .catch(() => {});
  }, []);

  const categories = ["All", ...Array.from(new Set(allBlogs.map((b) => b.category))).filter(Boolean)];

  const filtered = active === "All" ? allBlogs : allBlogs.filter((b) => b.category === active);
  const visible  = filtered.slice(0, PREVIEW_COUNT);
  const [featured, ...rest] = visible;

  return (
    <section id="blogs" className="py-28 bg-white relative overflow-hidden">
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-[0.05] pointer-events-none"
        style={{ background: "radial-gradient(circle,#2563eb,transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <div className="section-chip mx-auto w-fit mb-5">
            <BookOpen size={11} />
            Health Blog
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            Expert Health <span className="gradient-text">Insights</span>
          </h2>
          <div className="heading-line mx-auto mb-5" />
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Doctor-written articles to help you stay informed and make better health decisions.
          </p>
        </motion.div>

        {/* ── Category filters ── */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat: string) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
              style={
                active === cat
                  ? { background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)", color: "white", boxShadow: "0 4px 20px rgba(29,78,216,0.3)" }
                  : { background: "white", color: "#4b5563", border: "1px solid #e5e7eb" }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Blog cards ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {featured ? (
              <>
                {/* Featured article — wide */}
                <motion.article
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="gradient-border bg-white overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-400 mb-7 grid lg:grid-cols-5"
                  onClick={() => featured.slug && (window.location.href = `/blogs/${featured.slug}`)}
                  style={{ cursor: featured.slug ? "pointer" : "default" }}
                >
                  <div className="relative overflow-hidden lg:col-span-3 h-64 lg:h-auto min-h-[280px]">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                    />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      style={{ background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)" }} />
                    <span className="absolute top-4 left-4 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg"
                      style={{ background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)" }}>
                      Featured
                    </span>
                    <span className="absolute top-4 right-4 text-xs font-bold px-3 py-1.5 rounded-full"
                      style={{
                        background: "rgba(255,255,255,0.92)",
                        color: (CAT_COLORS[featured.category] ?? CAT_COLORS["Cardiology"]).text,
                        backdropFilter: "blur(4px)",
                      }}>
                      {featured.category}
                    </span>
                  </div>

                  <div className="p-8 lg:col-span-2 flex flex-col justify-center">
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                      <div className="flex items-center gap-1.5"><User size={12} /><span className="font-semibold">{featured.author}</span></div>
                      <span>·</span>
                      <div className="flex items-center gap-1.5"><Calendar size={12} />{featured.date}</div>
                    </div>
                    <h3 className="font-black text-gray-900 mb-3 text-xl leading-snug group-hover:text-blue-700 transition-colors">
                      {featured.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">{featured.preview}</p>
                    {featured.slug ? (
                      <Link href={`/blogs/${featured.slug}`}
                        className="inline-flex items-center gap-2 font-black text-sm" style={{ color: "#1d4ed8" }}>
                        Read Full Article
                        <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    ) : (
                      <div className="flex items-center gap-2 font-black text-sm text-gray-300">
                        Read Full Article
                        <ArrowUpRight size={16} />
                      </div>
                    )}
                  </div>
                </motion.article>

                {/* Rest of preview articles — grid */}
                {rest.length > 0 && (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rest.map((blog, i) => {
                      const catStyle = CAT_COLORS[blog.category] ?? { bg: "rgba(29,78,216,0.1)", text: "#1d4ed8" };
                      return (
                        <motion.article
                          key={blog.id}
                          initial={{ opacity: 0, y: 28 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.08, duration: 0.45 }}
                          className="gradient-border bg-white overflow-hidden group shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-400"
                          onClick={() => blog.slug && (window.location.href = `/blogs/${blog.slug}`)}
                          style={{ cursor: blog.slug ? "pointer" : "default" }}
                        >
                          <div className="relative overflow-hidden h-44">
                            <img src={blog.image} alt={blog.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                              style={{ background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)" }} />
                            <span className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full"
                              style={{ background: "rgba(255,255,255,0.92)", color: catStyle.text, backdropFilter: "blur(4px)" }}>
                              {blog.category}
                            </span>
                          </div>

                          <div className="p-5">
                            <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                              <div className="flex items-center gap-1"><User size={11} /><span className="truncate">{blog.author}</span></div>
                              <div className="flex items-center gap-1"><Calendar size={11} />{blog.date}</div>
                            </div>
                            <h3 className="font-black text-gray-900 mb-2 text-sm leading-snug line-clamp-2 group-hover:text-blue-700 transition-colors">
                              {blog.title}
                            </h3>
                            <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-3">{blog.preview}</p>
                            {blog.slug ? (
                              <Link href={`/blogs/${blog.slug}`}
                                className="inline-flex items-center gap-1 text-sm font-bold" style={{ color: "#0ea5e9" }}>
                                Read More
                                <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                              </Link>
                            ) : (
                              <div className="flex items-center gap-1 text-sm font-bold text-gray-300">
                                Read More <ArrowUpRight size={13} />
                              </div>
                            )}
                          </div>
                        </motion.article>
                      );
                    })}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 text-gray-400 font-semibold">No articles in this category yet.</div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── View All Articles link ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center gap-3 mt-12"
        >
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2.5 px-9 py-3.5 rounded-full font-black text-sm text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{ background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)", boxShadow: "0 6px 24px rgba(29,78,216,0.3)" }}
          >
            View All Articles
            <ArrowRight size={16} />
          </Link>
          <p className="text-gray-400 text-xs">
            Showing {visible.length} of {filtered.length} articles
          </p>
        </motion.div>

      </div>
    </section>
  );
}
