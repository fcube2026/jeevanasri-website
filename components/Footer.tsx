"use client";
import { Phone, Mail, MapPin } from "lucide-react";
import { HOSPITAL_INFO, SERVICES } from "@/lib/data";

const SocialIcons = {
  Facebook: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  ),
  Instagram: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  Twitter: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
    </svg>
  ),
  Youtube: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
      <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
      <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  ),
};

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Our Doctors", href: "#doctors" },
  { label: "Services", href: "#services" },
  { label: "Blogs", href: "#blogs" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const scrollTo = (href: string) =>
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer style={{ background: "linear-gradient(135deg,#060d2a 0%,#0a1535 50%,#060d2a 100%)" }} className="text-white">

      {/* Top gradient accent */}
      <div className="h-0.5 w-full" style={{ background: "linear-gradient(90deg,#2563eb,#06b6d4,#e91e8c,#2563eb)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-1">
                <img src="/logo.jpeg" alt="Jeevanasri Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="font-black text-lg leading-tight" style={{
                  background: "linear-gradient(135deg,#60a5fa,#06b6d4,#f9a8d4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  Jeevanasri
                </div>
                <div className="text-[10px] text-gray-400 font-bold tracking-widest">HOSPITALS</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">{HOSPITAL_INFO.description}</p>

            {/* Social icons */}
            <div className="flex gap-2">
              {[
                { Icon: SocialIcons.Facebook, href: HOSPITAL_INFO.social.facebook },
                { Icon: SocialIcons.Instagram, href: HOSPITAL_INFO.social.instagram },
                { Icon: SocialIcons.Twitter, href: HOSPITAL_INFO.social.twitter },
                { Icon: SocialIcons.Youtube, href: HOSPITAL_INFO.social.youtube },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg,#2563eb,#e91e8c)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-black text-sm tracking-widest uppercase mb-5"
              style={{ color: "#60a5fa" }}>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <button onClick={() => scrollTo(link.href)}
                    className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: "linear-gradient(135deg,#2563eb,#e91e8c)" }} />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-black text-sm tracking-widest uppercase mb-5"
              style={{ color: "#06b6d4" }}>
              Our Services
            </h3>
            <ul className="space-y-3">
              {SERVICES.slice(0, 8).map((s) => (
                <li key={s.title}>
                  <span className="text-gray-400 hover:text-white text-sm transition-colors cursor-default flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: "#06b6d4" }} />
                    {s.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-black text-sm tracking-widest uppercase mb-5"
              style={{ color: "#f9a8d4" }}>
              Contact Us
            </h3>
            <ul className="space-y-4">
              {[
                { icon: MapPin, value: HOSPITAL_INFO.address, color: "#60a5fa", href: undefined },
                { icon: Phone,  value: HOSPITAL_INFO.phone,   color: "#06b6d4", href: `tel:${HOSPITAL_INFO.phone}` },
                { icon: Mail,   value: HOSPITAL_INFO.email,   color: "#f9a8d4", href: `mailto:${HOSPITAL_INFO.email}` },
              ].map(({ icon: Icon, value, color, href }) => (
                <li key={value} className="flex items-start gap-3">
                  <Icon size={15} style={{ color, flexShrink: 0, marginTop: 2 }} />
                  {href ? (
                    <a href={href} className="text-gray-400 hover:text-white text-sm transition-colors">{value}</a>
                  ) : (
                    <span className="text-gray-400 text-sm">{value}</span>
                  )}
                </li>
              ))}
            </ul>

            {/* Emergency box */}
            <div className="mt-6 p-4 rounded-2xl border"
              style={{ background: "rgba(233,30,140,0.1)", borderColor: "rgba(233,30,140,0.25)" }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-pink-400 pulse-ring" />
                <span className="text-pink-300 font-bold text-xs uppercase tracking-wider">Emergency 24/7</span>
              </div>
              <a href={`tel:${HOSPITAL_INFO.phone}`}
                className="text-white font-black text-base hover:text-pink-300 transition-colors">
                {HOSPITAL_INFO.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-3"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Jeevanasri Hospitals. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {["NABH Accredited", "ISO 9001:2015"].map((badge, i) => (
              <span key={badge} className="text-xs font-bold px-3 py-1 rounded-full"
                style={{
                  background: i === 0 ? "rgba(37,99,235,0.15)" : "rgba(233,30,140,0.15)",
                  color: i === 0 ? "#60a5fa" : "#f9a8d4",
                  border: `1px solid ${i === 0 ? "rgba(37,99,235,0.25)" : "rgba(233,30,140,0.25)"}`,
                }}>
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
