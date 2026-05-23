"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, UserRound, BookOpen, Stethoscope, Image, CalendarCheck,
  MessageSquare, Star, HelpCircle, Settings, LogOut, Menu, X, ChevronRight,
  Bell, Activity,
} from "lucide-react";

const NAV = [
  { label: "Dashboard",    href: "/admin/dashboard",    icon: LayoutDashboard },
  { label: "Doctors",      href: "/admin/doctors",       icon: UserRound },
  { label: "Blogs",        href: "/admin/blogs",         icon: BookOpen },
  { label: "Services",     href: "/admin/services",      icon: Stethoscope },
  { label: "Media",        href: "/admin/media",         icon: Image },
  { label: "Appointments", href: "/admin/appointments",  icon: CalendarCheck },
  { label: "Inquiries",    href: "/admin/inquiries",     icon: MessageSquare },
  { label: "Testimonials", href: "/admin/testimonials",  icon: Star },
  { label: "FAQ",          href: "/admin/faq",           icon: HelpCircle },
  { label: "Content",      href: "/admin/content",       icon: Activity },
  { label: "Settings",     href: "/admin/settings",      icon: Settings },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname  = usePathname();
  const router    = useRouter();
  const [open, setOpen]       = useState(false);
  const [logging, setLogging] = useState(false);

  // Close sidebar on route change (mobile)
  useEffect(() => { setOpen(false); }, [pathname]);

  // Don't render shell on login page
  if (pathname === "/admin/login") return <>{children}</>;

  const logout = async () => {
    setLogging(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#f4f6fb" }}>

      {/* ── Sidebar ── */}
      <>
        {/* Mobile overlay */}
        {open && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        <aside
          className={`fixed top-0 left-0 h-full z-40 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${open ? "translate-x-0" : "-translate-x-full"}`}
          style={{
            width: 256,
            background: "linear-gradient(175deg,#060d24 0%,#0a1535 60%,#0c1a3d 100%)",
            borderRight: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)" }}
            >
              <div className="absolute inset-0 opacity-30" style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.4),transparent)" }} />
              <Stethoscope size={16} className="text-white relative" />
            </div>
            <div>
              <div className="font-black text-white text-sm leading-tight">Jeevanasri</div>
              <div className="text-[9px] font-black tracking-widest" style={{ color: "#60a5fa" }}>ADMIN PANEL</div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
            {NAV.map(({ label, href, icon: Icon }) => {
              const active = pathname === href || (href !== "/admin/dashboard" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group"
                  style={
                    active
                      ? { background: "linear-gradient(135deg,rgba(29,78,216,0.5),rgba(14,165,233,0.3))", color: "#fff", border: "1px solid rgba(29,78,216,0.4)" }
                      : { color: "rgba(255,255,255,0.5)", border: "1px solid transparent" }
                  }
                  onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; }}
                  onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = ""; }}
                >
                  <Icon size={16} className={active ? "text-sky-300" : "text-gray-500 group-hover:text-gray-300"} />
                  {label}
                  {active && <ChevronRight size={12} className="ml-auto text-sky-400" />}
                </Link>
              );
            })}
          </nav>

          {/* Bottom: logout */}
          <div className="px-3 pb-4 border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <button
              onClick={logout}
              disabled={logging}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all hover:bg-red-500/10 text-gray-500 hover:text-red-400 disabled:opacity-50"
            >
              <LogOut size={16} />
              {logging ? "Signing out…" : "Sign Out"}
            </button>
          </div>
        </aside>
      </>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top navbar */}
        <header
          className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 h-16 border-b"
          style={{ background: "white", borderColor: "#e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        >
          {/* Hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Page breadcrumb title */}
          <div className="hidden lg:flex items-center gap-2 text-sm text-gray-400">
            <span>Admin</span>
            <ChevronRight size={14} />
            <span className="font-semibold text-gray-700 capitalize">
              {pathname.split("/").pop()?.replace("-", " ") ?? "Dashboard"}
            </span>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3 ml-auto">
            <button className="relative w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
            </button>
            <div className="flex items-center gap-2.5 pl-3 border-l border-gray-100">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black text-white"
                style={{ background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)" }}
              >
                A
              </div>
              <div className="hidden sm:block">
                <div className="text-xs font-black text-gray-800">Admin</div>
                <div className="text-[10px] text-gray-400">Super Admin</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
