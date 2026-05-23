"use client";
import { useState, useEffect, useCallback } from "react";
import { CalendarCheck, Eye } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import Modal from "@/components/admin/Modal";

type Status = "all" | "PENDING" | "APPROVED" | "COMPLETED" | "CANCELLED" | "RESCHEDULED";

const STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  PENDING:     { bg: "rgba(245,158,11,0.1)",  text: "#d97706" },
  APPROVED:    { bg: "rgba(16,185,129,0.1)",  text: "#059669" },
  COMPLETED:   { bg: "rgba(29,78,216,0.1)",   text: "#1d4ed8" },
  CANCELLED:   { bg: "rgba(239,68,68,0.1)",   text: "#dc2626" },
  RESCHEDULED: { bg: "rgba(14,165,233,0.1)",  text: "#0ea5e9" },
};

const ALL_STATUSES: Status[] = ["all", "PENDING", "APPROVED", "COMPLETED", "CANCELLED", "RESCHEDULED"];

type Appointment = {
  id: string; patientName: string; mobile: string; email?: string;
  department?: string; doctor?: string; prefDate?: string; prefTime?: string;
  notes?: string; adminNotes?: string; status: string; createdAt: string;
};

const inputCls = "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white";

export default function AppointmentsPage() {
  const [items,        setItems]        = useState<Appointment[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [statusFilter, setStatusFilter] = useState<Status>("all");
  const [selected,     setSelected]     = useState<Appointment | null>(null);
  const [editStatus,   setEditStatus]   = useState("");
  const [editNotes,    setEditNotes]    = useState("");
  const [saving,       setSaving]       = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const url = statusFilter === "all" ? "/api/admin/appointments" : `/api/admin/appointments?status=${statusFilter}`;
    const res = await fetch(url);
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }, [statusFilter]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openModal = (appt: Appointment) => {
    setSelected(appt);
    setEditStatus(appt.status);
    setEditNotes(appt.adminNotes ?? "");
  };

  const handleSave = async () => {
    if (!selected) return;
    setSaving(true);
    await fetch(`/api/admin/appointments/${selected.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: editStatus, adminNotes: editNotes }),
    });
    setSaving(false);
    setSelected(null);
    fetchData();
  };

  return (
    <div>
      <AdminPageHeader title="Appointments" subtitle="Manage patient appointment requests" />

      {/* Filter bar */}
      <div className="flex items-center gap-3 mb-5">
        {ALL_STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 capitalize"
            style={
              statusFilter === s
                ? { background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)", color: "white" }
                : { background: "white", color: "#6b7280", border: "1px solid #e5e7eb" }
            }
          >
            {s === "all" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {["Patient", "Mobile", "Doctor / Dept", "Pref. Date & Time", "Status", "Received", ""].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-black text-gray-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan={7} className="text-center py-20 text-gray-400">Loading…</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-20 text-gray-400">No appointments found.</td></tr>
            ) : items.map((a) => {
              const s = STATUS_STYLES[a.status] ?? STATUS_STYLES["PENDING"];
              return (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0"
                        style={{ background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)" }}>
                        {a.patientName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 text-sm">{a.patientName}</div>
                        {a.email && <div className="text-xs text-gray-400">{a.email}</div>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{a.mobile}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{a.doctor ?? a.department ?? "—"}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {a.prefDate ?? "—"}{a.prefTime ? ` · ${a.prefTime}` : ""}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ background: s.bg, color: s.text }}>
                      {a.status.charAt(0) + a.status.slice(1).toLowerCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">{new Date(a.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => openModal(a)}
                      className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                      <Eye size={12} /> View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Detail / Edit modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title="Appointment Details">
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                ["Patient", selected.patientName],
                ["Mobile",  selected.mobile],
                ["Email",   selected.email ?? "—"],
                ["Doctor",  selected.doctor ?? "—"],
                ["Department", selected.department ?? "—"],
                ["Preferred Date", selected.prefDate ?? "—"],
                ["Preferred Time", selected.prefTime ?? "—"],
              ].map(([l, v]) => (
                <div key={l} className="bg-gray-50 rounded-xl px-3 py-2.5">
                  <div className="text-xs font-black text-gray-400 uppercase tracking-wider mb-0.5">{l}</div>
                  <div className="font-semibold text-gray-800">{v}</div>
                </div>
              ))}
            </div>
            {selected.notes && (
              <div className="bg-gray-50 rounded-xl px-3 py-2.5 text-sm">
                <div className="text-xs font-black text-gray-400 uppercase tracking-wider mb-1">Patient Notes</div>
                <p className="text-gray-700">{selected.notes}</p>
              </div>
            )}
            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Status</label>
              <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)} className={inputCls}>
                {["PENDING","APPROVED","COMPLETED","CANCELLED","RESCHEDULED"].map((s) => (
                  <option key={s} value={s}>{s.charAt(0)+s.slice(1).toLowerCase()}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Admin Notes</label>
              <textarea value={editNotes} onChange={(e) => setEditNotes(e.target.value)} rows={3}
                placeholder="Internal notes (not visible to patient)…" className={inputCls} />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => setSelected(null)}
                className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving}
                className="px-5 py-2.5 rounded-xl text-sm font-black text-white transition-all hover:scale-105 disabled:opacity-60"
                style={{ background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)" }}>
                {saving ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
