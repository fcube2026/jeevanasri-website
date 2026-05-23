"use client";
import { useState, useEffect, useCallback } from "react";
import { Trash2, Eye, EyeOff, GripVertical } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import Modal from "@/components/admin/Modal";

type Service = {
  id: string; title: string; description?: string; icon?: string;
  order: number; isVisible: boolean; createdAt: string;
};

const inputCls = "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white";
const empty = { title: "", description: "", icon: "", order: 0, isVisible: true };

export default function ServicesPage() {
  const [items,   setItems]   = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal,   setModal]   = useState<"add" | "edit" | null>(null);
  const [form,    setForm]    = useState(empty);
  const [editId,  setEditId]  = useState<string | null>(null);
  const [saving,  setSaving]  = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/services");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openAdd = () => {
    const nextOrder = items.length > 0 ? Math.max(...items.map((s) => s.order)) + 1 : 0;
    setForm({ ...empty, order: nextOrder });
    setEditId(null);
    setModal("add");
  };
  const openEdit = (s: Service) => {
    setForm({ title: s.title, description: s.description ?? "", icon: s.icon ?? "", order: s.order, isVisible: s.isVisible });
    setEditId(s.id);
    setModal("edit");
  };

  const handleSave = async () => {
    setSaving(true);
    const payload = { ...form, order: Number(form.order) };
    if (modal === "add") {
      await fetch("/api/admin/services", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    } else {
      await fetch(`/api/admin/services/${editId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    }
    setSaving(false);
    setModal(null);
    fetchData();
  };

  const toggleVisible = async (s: Service) => {
    await fetch(`/api/admin/services/${s.id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isVisible: !s.isVisible }),
    });
    fetchData();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
    fetchData();
  };

  return (
    <div>
      <AdminPageHeader title="Services" subtitle="Manage hospital services shown on the website" onAdd={openAdd} addLabel="Add Service" />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {["Order", "Icon", "Title", "Description", "Visible", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-black text-gray-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan={6} className="text-center py-20 text-gray-400">Loading…</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-20 text-gray-400">No services yet.</td></tr>
            ) : items.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 text-gray-400">
                    <GripVertical size={14} />
                    <span className="text-sm font-bold text-gray-500">#{s.order}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-2xl">{s.icon ?? "🏥"}</td>
                <td className="px-4 py-3 font-semibold text-gray-800 text-sm">{s.title}</td>
                <td className="px-4 py-3 text-sm text-gray-500 max-w-xs">
                  {s.description ? (s.description.length > 80 ? s.description.slice(0, 80) + "…" : s.description) : "—"}
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => toggleVisible(s)}
                    className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${s.isVisible ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                    {s.isVisible ? <Eye size={11} /> : <EyeOff size={11} />}
                    {s.isVisible ? "Shown" : "Hidden"}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEdit(s)}
                      className="text-xs font-bold px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">Edit</button>
                    <button onClick={() => remove(s.id)}
                      className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
                      <Trash2 size={11} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal === "add" ? "Add Service" : "Edit Service"}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Title *</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputCls} placeholder="Cardiology" />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Icon (emoji or text)</label>
              <input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className={inputCls} placeholder="🫀" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Display Order</label>
              <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className={inputCls} min={0} />
            </div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 cursor-pointer mt-4">
              <input type="checkbox" checked={form.isVisible} onChange={(e) => setForm({ ...form, isVisible: e.target.checked })} className="w-4 h-4 rounded border-gray-300" />
              Show on website
            </label>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setModal(null)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 border border-gray-200 hover:bg-gray-50">Cancel</button>
            <button onClick={handleSave} disabled={saving}
              className="px-5 py-2.5 rounded-xl text-sm font-black text-white disabled:opacity-60 hover:scale-105 transition-all"
              style={{ background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)" }}>
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
