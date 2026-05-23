"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, ArrowUpRight, BookOpen, ArrowLeft, Search } from "lucide-react";
import { BLOGS } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

type BlogItem = { id: string | number; slug?: string; title: string; author: string; category: string; date: string; preview: string; image: string };

const CAT_COLORS: Record<string, { bg: string; text: string }> = {
  Cardiology:         { bg: "rgba(29,78,216,0.1)",  text: "#1d4ed8" },
  Gynecology:         { bg: "rgba(14,165,233,0.1)", text: "#0ea5e9" },
  "General Medicine": { bg: "rgba(6,182,212,0.1)",  text: "#0891b2" },
  Orthopedics:        { bg: "rgba(3,105,161,0.1)",  text: "#0369a1" },
};

export default function BlogsPage() {
  const [allBlogs, setAllBlogs] = useState<BlogItem[]>(BLOGS as BlogItem[]);
  const [active, setActive]     = useState("All");
  const [search, setSearch]     = useState("");

  useEffect(() => {
    fetch("/api/blogs")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data) && data.length > 0) setAllBlogs(data); })
      .catch(() => {});
  }, []);

  const categories = ["All", ...Array.from(new Set(allBlogs.map((b) => b.category))).filter(Boolean)];

  const filtered = allBlogs.filter((b) => {
    const matchCat = active === "All" || b.category === active;
    const matchSearch =
      search === "" ||
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const [featured, ...rest] = filtered;

  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero banner ── */}
        <section
          className="relative pt-24 pb-10 overflow-hidden"
          style={{ background: "linear-gradient(135deg,#1e3a8a 0%,#1d4ed8 50%,#0369a1 100%)" }}
        >
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{ background: "radial-gradient(circle,#0ea5e9,transparent)" }} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-blue-200 hover:text-white text-sm font-semibold mb-8 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}
              >
                <BookOpen size={18} className="text-white" />
              </div>
              <span className="text-blue-200 font-black text-sm tracking-widest uppercase">Health Blog</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
              Expert Health <span style={{ color: "#38bdf8" }}>Insights</span>
            </h1>
            <p className="text-blue-200/80 text-lg max-w-2xl">
              Doctor-written articles to help you stay informed and make better health decisions.
            </p>

            {/* Search bar */}
            <div className="mt-8 max-w-lg relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles, authors, or topics…"
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-sm font-semibold text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder:text-gray-400 shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* ── Articles ── */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Category filters */}
            <div className="flex flex-wrap gap-3 mb-10">
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
              <span className="ml-auto self-center text-sm text-gray-400 font-semibold">
                {filtered.length} article{filtered.length !== 1 ? "s" : ""}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active + search}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {filtered.length === 0 ? (
                  <div className="text-center py-24 text-gray-400 font-semibold">
                    No articles found. Try a different search or category.
                  </div>
                ) : (
                  <>
                    {/* Featured */}
                    {featured && (
                      <motion.article
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="gradient-border bg-white overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-400 mb-8 grid lg:grid-cols-5"
                        onClick={() => featured.slug && (window.location.href = `/blogs/${featured.slug}`)}
                        style={{ cursor: featured.slug ? "pointer" : "default" }}
                      >
                        <div className="relative overflow-hidden lg:col-span-3 h-64 lg:h-auto min-h-[300px]">
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
                          <h2 className="font-black text-gray-900 mb-3 text-xl leading-snug group-hover:text-blue-700 transition-colors">
                            {featured.title}
                          </h2>
                          <p className="text-gray-500 text-sm leading-relaxed mb-6">{featured.preview}</p>
                          {featured.slug ? (
                            <Link href={`/blogs/${featured.slug}`}
                              className="inline-flex items-center gap-2 font-black text-sm" style={{ color: "#1d4ed8" }}>
                              Read Full Article
                              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Link>
                          ) : (
                            <div className="flex items-center gap-2 font-black text-sm text-gray-300">
                              Read Full Article <ArrowUpRight size={16} />
                            </div>
                          )}
                        </div>
                      </motion.article>
                    )}

                    {/* Grid */}
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
                              <div className="relative overflow-hidden h-48">
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
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </main>
      <Footer noCta />
      <FloatingButtons />
    </>
  );
}
