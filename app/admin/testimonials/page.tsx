"use client";
import { useState, useEffect, useCallback } from "react";
import { Star, Trash2, Eye, EyeOff } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import Modal from "@/components/admin/Modal";

type Testimonial = {
  id: string; name: string; review: string; rating: number;
  treatment?: string; image?: string; isVisible: boolean; createdAt: string;
};

const inputCls = "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white";

const empty = { name: "", review: "", rating: 5, treatment: "", image: "", isVisible: true };

export default function TestimonialsPage() {
  const [items,   setItems]   = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal,   setModal]   = useState<"add" | "edit" | null>(null);
  const [form,    setForm]    = useState(empty);
  const [editId,  setEditId]  = useState<string | null>(null);
  const [saving,  setSaving]  = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/testimonials");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openAdd = () => { setForm(empty); setEditId(null); setModal("add"); };
  const openEdit = (t: Testimonial) => {
    setForm({ name: t.name, review: t.review, rating: t.rating, treatment: t.treatment ?? "", image: t.image ?? "", isVisible: t.isVisible });
    setEditId(t.id);
    setModal("edit");
  };

  const handleSave = async () => {
    setSaving(true);
    const payload = { ...form, rating: Number(form.rating) };
    if (modal === "add") {
      await fetch("/api/admin/testimonials", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    } else {
      await fetch(`/api/admin/testimonials/${editId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    }
    setSaving(false);
    setModal(null);
    fetchData();
  };

  const toggleVisible = async (t: Testimonial) => {
    await fetch(`/api/admin/testimonials/${t.id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isVisible: !t.isVisible }),
    });
    fetchData();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
    fetchData();
  };

  const Stars = ({ n }: { n: number }) => (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map((i) => (
        <Star key={i} size={12} fill={i <= n ? "#f59e0b" : "none"} stroke={i <= n ? "#f59e0b" : "#d1d5db"} />
      ))}
    </div>
  );

  return (
    <div>
      <AdminPageHeader title="Testimonials" subtitle="Patient reviews and feedback" onAdd={openAdd} addLabel="Add Testimonial" />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {["Patient", "Review", "Rating", "Treatment", "Visible", "Date", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-black text-gray-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan={7} className="text-center py-20 text-gray-400">Loading…</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-20 text-gray-400">No testimonials yet.</td></tr>
            ) : items.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    {t.image ? (
                      <img src={t.image} alt={t.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0"
                        style={{ background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)" }}>
                        {t.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="font-semibold text-gray-800 text-sm">{t.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 max-w-xs">
                  <span title={t.review}>{t.review.length > 70 ? t.review.slice(0, 70) + "…" : t.review}</span>
                </td>
                <td className="px-4 py-3"><Stars n={t.rating} /></td>
                <td className="px-4 py-3 text-sm text-gray-500">{t.treatment ?? "—"}</td>
                <td className="px-4 py-3">
                  <button onClick={() => toggleVisible(t)}
                    className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${t.isVisible ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                    {t.isVisible ? <Eye size={11} /> : <EyeOff size={11} />}
                    {t.isVisible ? "Shown" : "Hidden"}
                  </button>
                </td>
                <td className="px-4 py-3 text-xs text-gray-400">{new Date(t.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEdit(t)}
                      className="text-xs font-bold px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                      Edit
                    </button>
                    <button onClick={() => remove(t.id)}
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

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal === "add" ? "Add Testimonial" : "Edit Testimonial"}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Patient Name *</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Treatment</label>
              <input value={form.treatment} onChange={(e) => setForm({ ...form, treatment: e.target.value })} className={inputCls} placeholder="e.g. Cardiac Surgery" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Review *</label>
            <textarea value={form.review} onChange={(e) => setForm({ ...form, review: e.target.value })} rows={4}
              className={inputCls} placeholder="Patient's review…" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Rating (1–5)</label>
              <select value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} className={inputCls}>
                {[5,4,3,2,1].map((n) => <option key={n} value={n}>{n} Star{n > 1 ? "s" : ""}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Photo URL</label>
              <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className={inputCls} placeholder="https://…" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="vis" checked={form.isVisible} onChange={(e) => setForm({ ...form, isVisible: e.target.checked })}
              className="w-4 h-4 rounded border-gray-300 text-blue-600" />
            <label htmlFor="vis" className="text-sm font-semibold text-gray-700">Show on website</label>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setModal(null)}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 border border-gray-200 hover:bg-gray-50">Cancel</button>
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
