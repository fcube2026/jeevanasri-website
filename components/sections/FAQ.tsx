"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { FAQ } from "@/lib/data";

export default function FAQSection() {
  const [faqs, setFaqs] = useState<{ q: string; a: string }[]>(FAQ);
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    fetch("/api/faq")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data) && data.length > 0) setFaqs(data); })
      .catch(() => {});
  }, []);

  return (
    <section
      className="py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg,#f0f6ff 0%,#ffffff 100%)" }}
    >
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-[0.06] pointer-events-none"
        style={{ background: "radial-gradient(circle,#2563eb,transparent)" }}
      />
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="section-chip mx-auto w-fit mb-5">
            <HelpCircle size={11} />
            FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <div className="heading-line mx-auto" />
        </motion.div>

        {/* ── FAQ items ── */}
        <div className="space-y-3">
          {faqs.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="rounded-2xl overflow-hidden shadow-sm transition-shadow hover:shadow-md"
              style={{
                background: "white",
                border: open === i ? "1.5px solid rgba(29,78,216,0.2)" : "1.5px solid #f1f5f9",
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-gray-50/70 transition-colors"
              >
                {/* Number badge */}
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-black text-white transition-all duration-300"
                  style={{
                    background: open === i
                      ? "linear-gradient(135deg,#1d4ed8,#0ea5e9)"
                      : "linear-gradient(135deg,#e2e8f0,#cbd5e1)",
                    color: open === i ? "white" : "#64748b",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                <span className="flex-1 font-semibold text-gray-800 pr-2 text-sm leading-snug">{item.q}</span>

                {/* Toggle icon */}
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={
                    open === i
                      ? { background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)" }
                      : { background: "#f1f5f9" }
                  }
                >
                  {open === i
                    ? <Minus size={14} className="text-white" />
                    : <Plus size={14} className="text-gray-500" />
                  }
                </div>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div
                      className="px-5 pb-5 text-gray-600 text-sm leading-relaxed pt-1 ml-12"
                      style={{ borderTop: "1px solid rgba(29,78,216,0.07)" }}
                    >
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 text-sm mb-4">Still have questions? We're here to help.</p>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-shimmer text-white px-8 py-3 rounded-xl font-black text-sm hover:scale-105 transition-transform shadow-lg"
          >
            Contact Us →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
