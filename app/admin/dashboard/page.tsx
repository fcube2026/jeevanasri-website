import { prisma } from "@/lib/db";
import {
  UserRound, BookOpen, Stethoscope, CalendarCheck,
  MessageSquare, Star, Clock, TrendingUp,
  CheckCircle2, XCircle, AlertCircle,
} from "lucide-react";

async function getStats() {
  const [doctors, blogs, services, appointments, inquiries, testimonials, pending] =
    await Promise.all([
      prisma.doctor.count(),
      prisma.blog.count(),
      prisma.service.count(),
      prisma.appointment.count(),
      prisma.inquiry.count(),
      prisma.testimonial.count(),
      prisma.appointment.count({ where: { status: "PENDING" } }),
    ]);
  return { doctors, blogs, services, appointments, inquiries, testimonials, pending };
}

async function getRecentActivity() {
  const [recentAppts, recentInquiries] = await Promise.all([
    prisma.appointment.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.inquiry.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);
  return { recentAppts, recentInquiries };
}

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  PENDING:     { bg: "rgba(245,158,11,0.1)",  text: "#d97706", label: "Pending" },
  APPROVED:    { bg: "rgba(16,185,129,0.1)",  text: "#059669", label: "Approved" },
  CANCELLED:   { bg: "rgba(239,68,68,0.1)",   text: "#dc2626", label: "Cancelled" },
  COMPLETED:   { bg: "rgba(29,78,216,0.1)",   text: "#1d4ed8", label: "Completed" },
  RESCHEDULED: { bg: "rgba(14,165,233,0.1)",  text: "#0ea5e9", label: "Rescheduled" },
};

export default async function DashboardPage() {
  const stats = await getStats();
  const { recentAppts, recentInquiries } = await getRecentActivity();

  const statCards = [
    { label: "Total Doctors",      value: stats.doctors,      icon: UserRound,     grad: ["#1e3a8a","#1d4ed8"], change: "Active staff" },
    { label: "Published Blogs",    value: stats.blogs,        icon: BookOpen,      grad: ["#1d4ed8","#2563eb"], change: "Articles" },
    { label: "Services",           value: stats.services,     icon: Stethoscope,   grad: ["#2563eb","#0ea5e9"], change: "Departments" },
    { label: "Total Appointments", value: stats.appointments, icon: CalendarCheck, grad: ["#0ea5e9","#38bdf8"], change: `${stats.pending} pending` },
    { label: "Inquiries",          value: stats.inquiries,    icon: MessageSquare, grad: ["#0369a1","#0ea5e9"], change: "Contact forms" },
    { label: "Testimonials",       value: stats.testimonials, icon: Star,          grad: ["#1e3a8a","#2563eb"], change: "Patient reviews" },
  ];

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back, Admin. Here&apos;s what&apos;s happening.</p>
      </div>

      {/* Pending alert */}
      {stats.pending > 0 && (
        <div
          className="flex items-center gap-3 px-5 py-4 rounded-2xl border font-semibold text-sm"
          style={{ background: "rgba(245,158,11,0.07)", borderColor: "rgba(245,158,11,0.2)", color: "#d97706" }}
        >
          <AlertCircle size={18} />
          You have <strong>{stats.pending}</strong> pending appointment{stats.pending !== 1 ? "s" : ""} awaiting review.
          <a href="/admin/appointments" className="ml-auto text-xs underline font-bold">Review →</a>
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {statCards.map(({ label, value, icon: Icon, grad, change }) => (
          <div
            key={label}
            className="bg-white rounded-2xl p-5 border hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
            style={{ borderColor: "#e5e7eb" }}
          >
            {/* Watermark number */}
            <span
              className="absolute -bottom-2 -right-1 text-7xl font-black opacity-[0.03] select-none pointer-events-none leading-none"
              style={{ color: grad[0] }}
            >
              {value}
            </span>

            <div className="flex items-start justify-between mb-4 relative">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center relative overflow-hidden shadow-md"
                style={{ background: `linear-gradient(135deg,${grad[0]},${grad[1]})` }}
              >
                <div className="absolute inset-0 opacity-30" style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.3),transparent)" }} />
                <Icon size={18} className="text-white relative" />
              </div>
              <TrendingUp size={14} className="text-gray-300 group-hover:text-green-400 transition-colors mt-1" />
            </div>

            <div className="text-3xl font-black text-gray-900 mb-1">{value}</div>
            <div className="text-sm font-semibold text-gray-700 mb-1">{label}</div>
            <div className="text-xs text-gray-400">{change}</div>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Recent appointments */}
        <div className="bg-white rounded-2xl border" style={{ borderColor: "#e5e7eb" }}>
          <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "#f3f4f6" }}>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)" }}>
                <CalendarCheck size={13} className="text-white" />
              </div>
              <h3 className="font-black text-gray-900 text-sm">Recent Appointments</h3>
            </div>
            <a href="/admin/appointments" className="text-xs font-bold" style={{ color: "#0ea5e9" }}>View all →</a>
          </div>

          {recentAppts.length === 0 ? (
            <div className="px-6 py-10 text-center text-gray-400 text-sm">No appointments yet.</div>
          ) : (
            <div className="divide-y" style={{ borderColor: "#f9fafb" }}>
              {recentAppts.map((a) => {
                const s = STATUS_STYLES[a.status] ?? STATUS_STYLES["PENDING"];
                return (
                  <div key={a.id} className="flex items-center gap-3 px-6 py-3.5">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black text-white"
                      style={{ background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)" }}>
                      {a.patientName.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-800 text-sm truncate">{a.patientName}</div>
                      <div className="text-xs text-gray-400">{a.mobile} · {a.department ?? "General"}</div>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0"
                      style={{ background: s.bg, color: s.text }}>
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent inquiries */}
        <div className="bg-white rounded-2xl border" style={{ borderColor: "#e5e7eb" }}>
          <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "#f3f4f6" }}>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#0369a1,#0ea5e9)" }}>
                <MessageSquare size={13} className="text-white" />
              </div>
              <h3 className="font-black text-gray-900 text-sm">Recent Inquiries</h3>
            </div>
            <a href="/admin/inquiries" className="text-xs font-bold" style={{ color: "#0ea5e9" }}>View all →</a>
          </div>

          {recentInquiries.length === 0 ? (
            <div className="px-6 py-10 text-center text-gray-400 text-sm">No inquiries yet.</div>
          ) : (
            <div className="divide-y" style={{ borderColor: "#f9fafb" }}>
              {recentInquiries.map((inq) => (
                <div key={inq.id} className="flex items-start gap-3 px-6 py-3.5">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black text-white mt-0.5"
                    style={{ background: "linear-gradient(135deg,#0369a1,#0ea5e9)" }}>
                    {inq.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-800 text-sm">{inq.name}</div>
                    <div className="text-xs text-gray-400 truncate">{inq.message}</div>
                  </div>
                  {inq.status === "RESOLVED" ? (
                    <CheckCircle2 size={16} className="text-green-400 flex-shrink-0 mt-1" />
                  ) : (
                    <XCircle size={16} className="text-amber-400 flex-shrink-0 mt-1" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick stats strip */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Pending Appointments", value: stats.pending,    icon: Clock,         color: "#d97706" },
          { label: "Open Inquiries",       value: stats.inquiries,  icon: MessageSquare, color: "#0ea5e9" },
          { label: "Active Doctors",       value: stats.doctors,    icon: UserRound,     color: "#059669" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl border p-4 flex items-center gap-3" style={{ borderColor: "#e5e7eb" }}>
            <Icon size={18} style={{ color }} />
            <div>
              <div className="text-lg font-black text-gray-900">{value}</div>
              <div className="text-xs text-gray-400 font-semibold">{label}</div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
