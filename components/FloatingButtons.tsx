"use client";
import { useState, useEffect } from "react";
import { Phone, ArrowUp } from "lucide-react";
import { HOSPITAL_INFO } from "@/lib/data";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function FloatingButtons() {
  const [showTop, setShowTop]     = useState(false);
  const [showPulse, setShowPulse] = useState(true);

  useEffect(() => {
    const handler = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", handler, { passive: true });
    const t = setTimeout(() => setShowPulse(false), 5000);
    return () => { window.removeEventListener("scroll", handler); clearTimeout(t); };
  }, []);

  return (
    <>
      {/* WhatsApp */}
      <a
        href={`https://wa.me/${HOSPITAL_INFO.whatsapp}?text=Hello!%20I%20would%20like%20to%20book%20an%20appointment.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-all duration-300 group"
        style={{ background: "#25d366", boxShadow: "0 8px 30px rgba(37,211,102,0.45)" }}
      >
        {showPulse && (
          <span className="absolute inset-0 rounded-full animate-ping opacity-40" style={{ background: "#25d366" }} />
        )}
        <WhatsAppIcon />
        {/* Tooltip */}
        <span
          className="absolute right-16 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
        >
          WhatsApp Us
        </span>
      </a>

      {/* Call button */}
      <a
        href={`tel:${HOSPITAL_INFO.phone}`}
        aria-label="Call us"
        className="fixed bottom-24 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-all duration-300 group relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)", boxShadow: "0 6px 24px rgba(29,78,216,0.4)" }}
      >
        <span className="shine-overlay rounded-full" />
        <Phone size={18} className="relative" />
        {/* Tooltip */}
        <span
          className="absolute right-14 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
        >
          Call Now
        </span>
      </a>

      {/* Scroll to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="fixed bottom-40 right-6 z-50 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all duration-300 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", boxShadow: "0 6px 20px rgba(14,165,233,0.35)" }}
        >
          <span className="shine-overlay rounded-full" />
          <ArrowUp size={17} className="relative" />
        </button>
      )}
    </>
  );
}
