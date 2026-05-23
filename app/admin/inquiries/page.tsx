"use client";
import { useState, useEffect, useCallback } from "react";
import { CheckCircle2, Trash2 } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

type InquiryStatus = "all" | "OPEN" | "RESOLVED";
type Inquiry = {
  id: string; name: string; mobile: string; email?: string;
  message: string; status: string; createdAt: string;
};

export default function InquiriesPage() {
  const [items,        setItems]        = useState<Inquiry[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [statusFilter, setStatusFilter] = useState<InquiryStatus>("all");

  const fetchData = useCallback(async () => {
    setLoading(true);
    const url = statusFilter === "all" ? "/api/admin/inquiries" : `/api/admin/inquiries?status=${statusFilter}`;
    const res = await fetch(url);
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }, [statusFilter]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const resolve = async (id: string) => {
    await fetch(`/api/admin/inquiries/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "RESOLVED" }),
    });
    fetchData();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this inquiry?")) return;
    await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
    fetchData();
  };

  return (
    <div>
      <AdminPageHeader title="Inquiries" subtitle="Contact form submissions from the website" />

      <div className="flex gap-3 mb-5">
        {(["all", "OPEN", "RESOLVED"] as InquiryStatus[]).map((s) => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className="px-4 py-2 rounded-xl text-sm font-semibold transition-all capitalize"
            style={statusFilter === s
              ? { background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)", color: "white" }
              : { background: "white", color: "#6b7280", border: "1px solid #e5e7eb" }}>
            {s === "all" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {["Name", "Mobile", "Email", "Message", "Status", "Date", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-black text-gray-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan={7} className="text-center py-20 text-gray-400">Loading…</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-20 text-gray-400">No inquiries found.</td></tr>
            ) : items.map((inq) => (
              <tr key={inq.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white"
                      style={{ background: "linear-gradient(135deg,#0369a1,#0ea5e9)" }}>
                      {inq.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-semibold text-gray-800 text-sm">{inq.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{inq.mobile}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{inq.email ?? "—"}</td>
                <td className="px-4 py-3 text-sm text-gray-600 max-w-xs">
                  <span title={inq.message}>{inq.message.length > 80 ? inq.message.slice(0, 80) + "…" : inq.message}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={inq.status === "RESOLVED"
                      ? { background: "rgba(16,185,129,0.1)", color: "#059669" }
                      : { background: "rgba(245,158,11,0.1)", color: "#d97706" }}>
                    {inq.status === "RESOLVED" ? "Resolved" : "Open"}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-gray-400">{new Date(inq.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {inq.status === "OPEN" && (
                      <button onClick={() => resolve(inq.id)}
                        className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors">
                        <CheckCircle2 size={12} /> Resolve
                      </button>
                    )}
                    <button onClick={() => remove(inq.id)}
                      className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
