"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Tag, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

type Blog = {
  id: string; slug: string; title: string; author: string; category: string;
  summary: string; content: string; tags: string; readTime: string;
  featuredImage: string; publishDate: string | null; createdAt: string; isFeatured: boolean;
};

const CAT_COLORS: Record<string, { bg: string; text: string }> = {
  Cardiology:          { bg: "rgba(29,78,216,0.15)",  text: "#1d4ed8" },
  Gynecology:          { bg: "rgba(14,165,233,0.15)", text: "#0ea5e9" },
  "General Medicine":  { bg: "rgba(6,182,212,0.15)",  text: "#0891b2" },
  Orthopedics:         { bg: "rgba(3,105,161,0.15)",  text: "#0369a1" },
};

function formatDate(d: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [blog, setBlog]       = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/blogs/${slug}`)
      .then((r) => {
        if (r.status === 404) { setNotFound(true); setLoading(false); return null; }
        return r.json();
      })
      .then((data) => {
        if (data) setBlog(data);
        setLoading(false);
      })
      .catch(() => { setNotFound(true); setLoading(false); });
  }, [slug]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">

        {loading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
              <p className="text-gray-400 text-sm font-semibold">Loading article…</p>
            </div>
          </div>
        ) : notFound || !blog ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
            <div className="w-20 h-20 rounded-3xl bg-blue-50 flex items-center justify-center mb-6">
              <BookOpen size={36} className="text-blue-300" />
            </div>
            <h1 className="text-2xl font-black text-gray-900 mb-2">Article Not Found</h1>
            <p className="text-gray-500 mb-8">This article may have been moved or is no longer published.</p>
            <Link href="/blogs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-black text-sm text-white"
              style={{ background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)" }}>
              <ArrowLeft size={16} />
              Back to Blog
            </Link>
          </div>
        ) : (
          <>
            {/* ── Hero ── */}
            <div className="relative">
              {blog.featuredImage ? (
                <div className="relative h-[420px] sm:h-[500px] overflow-hidden">
                  <img
                    src={blog.featuredImage}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to bottom, rgba(6,12,40,0.3) 0%, rgba(6,12,40,0.75) 70%, rgba(6,12,40,0.95) 100%)" }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 px-4 pb-10 pt-6 max-w-4xl mx-auto">
                    <BackLink />
                    <CategoryBadge category={blog.category} />
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mt-4 mb-4 max-w-3xl">
                      {blog.title}
                    </h1>
                    <Meta blog={blog} dark />
                  </div>
                </div>
              ) : (
                <div
                  className="relative pt-24 pb-12 px-4"
                  style={{ background: "linear-gradient(135deg,#1e3a8a 0%,#1d4ed8 50%,#0369a1 100%)" }}
                >
                  <div className="max-w-4xl mx-auto">
                    <BackLink light />
                    <CategoryBadge category={blog.category} light />
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mt-4 mb-4 max-w-3xl">
                      {blog.title}
                    </h1>
                    <Meta blog={blog} dark />
                  </div>
                </div>
              )}
            </div>

            {/* ── Body ── */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

              {/* Summary callout */}
              {blog.summary && (
                <div
                  className="rounded-2xl p-6 mb-10 border-l-4 text-gray-700 text-lg leading-relaxed italic"
                  style={{ background: "#f0f6ff", borderLeftColor: "#1d4ed8" }}
                >
                  {blog.summary}
                </div>
              )}

              {/* Content */}
              {blog.content ? (
                <div
                  className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                  style={{
                    lineHeight: "1.9",
                    fontSize: "1.0625rem",
                  }}
                >
                  {blog.content.split("\n").map((para, i) =>
                    para.trim() ? (
                      <p key={i} className="mb-5">{para}</p>
                    ) : (
                      <div key={i} className="mb-3" />
                    )
                  )}
                </div>
              ) : (
                <p className="text-gray-400 italic">No content available for this article.</p>
              )}

              {/* Tags */}
              {blog.tags && (
                <div className="flex flex-wrap items-center gap-2 mt-12 pt-8 border-t border-gray-100">
                  <Tag size={14} className="text-gray-400" />
                  {blog.tags.split(",").map((tag) => tag.trim()).filter(Boolean).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-bold px-3 py-1.5 rounded-full"
                      style={{ background: "rgba(29,78,216,0.08)", color: "#1d4ed8" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Author card */}
              <div
                className="mt-12 rounded-3xl p-7 flex items-start gap-5 border"
                style={{ background: "#f8faff", borderColor: "rgba(29,78,216,0.1)" }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black text-white flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)" }}
                >
                  {blog.author.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Written by</div>
                  <div className="font-black text-gray-900 text-lg">{blog.author}</div>
                  {blog.category && (
                    <div className="text-sm text-gray-500 mt-0.5">{blog.category} Specialist · Jeevanasri Hospitals</div>
                  )}
                </div>
              </div>

              {/* Back + appointment CTA */}
              <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft size={15} />
                  Back to All Articles
                </Link>
                <button
                  onClick={() => router.push("/#appointment")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-black text-sm text-white transition-all hover:scale-105 hover:shadow-lg"
                  style={{ background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)" }}
                >
                  Book an Appointment →
                </button>
              </div>
            </div>
          </>
        )}
      </main>
      <Footer noCta />
      <FloatingButtons />
    </>
  );
}

function BackLink({ light }: { light?: boolean }) {
  return (
    <Link
      href="/blogs"
      className={`inline-flex items-center gap-2 text-sm font-semibold mb-6 transition-colors ${light ? "text-blue-200 hover:text-white" : "text-blue-300 hover:text-white"}`}
    >
      <ArrowLeft size={15} />
      All Articles
    </Link>
  );
}

function CategoryBadge({ category, light }: { category: string; light?: boolean }) {
  if (!category) return null;
  const style = CAT_COLORS[category];
  return (
    <span
      className="inline-block text-xs font-black px-3 py-1.5 rounded-full"
      style={light
        ? { background: "rgba(255,255,255,0.2)", color: "white" }
        : style
          ? { background: style.bg, color: style.text }
          : { background: "rgba(29,78,216,0.1)", color: "#1d4ed8" }}
    >
      {category}
    </span>
  );
}

function Meta({ blog, dark }: { blog: Blog; dark?: boolean }) {
  const textCls = dark ? "text-blue-200/70" : "text-gray-500";
  const date = formatDate(blog.publishDate ?? blog.createdAt);
  return (
    <div className={`flex flex-wrap items-center gap-4 text-xs font-semibold ${textCls}`}>
      <span className="flex items-center gap-1.5">
        <User size={12} />
        {blog.author}
      </span>
      {date && (
        <span className="flex items-center gap-1.5">
          <Calendar size={12} />
          {date}
        </span>
      )}
      {blog.readTime && (
        <span className="flex items-center gap-1.5">
          <Clock size={12} />
          {blog.readTime}
        </span>
      )}
    </div>
  );
}
