"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { FAQ } from "@/lib/data";

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-[0.05]"
        style={{ background: "radial-gradient(circle,#2563eb,transparent)" }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
            style={{ background: "rgba(6,182,212,0.08)", color: "#0891b2", border: "1px solid rgba(6,182,212,0.2)" }}
          >
            FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {FAQ.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="gradient-border bg-white overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50/80 transition-colors"
              >
                <span className="font-semibold text-gray-800 pr-4 text-sm leading-snug">{item.q}</span>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={
                    open === i
                      ? { background: "linear-gradient(135deg,#2563eb,#e91e8c)" }
                      : { background: "#f3f4f6" }
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
                    <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-3">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
