"use client";
import { useState, useEffect, useCallback } from "react";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import Modal from "@/components/admin/Modal";

type Faq = { id: string; question: string; answer: string; order: number; createdAt: string };

const inputCls = "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white";
const empty = { question: "", answer: "", order: 0 };

export default function FaqPage() {
  const [items,    setItems]    = useState<Faq[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [modal,    setModal]    = useState<"add" | "edit" | null>(null);
  const [form,     setForm]     = useState(empty);
  const [editId,   setEditId]   = useState<string | null>(null);
  const [saving,   setSaving]   = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/faq");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openAdd = () => {
    const nextOrder = items.length > 0 ? Math.max(...items.map((f) => f.order)) + 1 : 0;
    setForm({ ...empty, order: nextOrder });
    setEditId(null);
    setModal("add");
  };
  const openEdit = (f: Faq) => {
    setForm({ question: f.question, answer: f.answer, order: f.order });
    setEditId(f.id);
    setModal("edit");
  };

  const handleSave = async () => {
    setSaving(true);
    const payload = { ...form, order: Number(form.order) };
    if (modal === "add") {
      await fetch("/api/admin/faq", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    } else {
      await fetch(`/api/admin/faq/${editId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    }
    setSaving(false);
    setModal(null);
    fetchData();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this FAQ?")) return;
    await fetch(`/api/admin/faq/${id}`, { method: "DELETE" });
    fetchData();
  };

  return (
    <div>
      <AdminPageHeader title="FAQ" subtitle="Frequently asked questions shown on the website" onAdd={openAdd} addLabel="Add FAQ" />

      {loading ? (
        <div className="text-center py-20 text-gray-400">Loading…</div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm text-center py-20 text-gray-400">No FAQs yet.</div>
      ) : (
        <div className="space-y-3">
          {items.map((f) => (
            <div key={f.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div
                className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpanded(expanded === f.id ? null : f.id)}>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-black text-gray-300 w-6">#{f.order}</span>
                  <span className="font-semibold text-gray-800">{f.question}</span>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <button onClick={(e) => { e.stopPropagation(); openEdit(f); }}
                    className="text-xs font-bold px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">Edit</button>
                  <button onClick={(e) => { e.stopPropagation(); remove(f.id); }}
                    className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
                    <Trash2 size={11} /> Delete
                  </button>
                  {expanded === f.id ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                </div>
              </div>
              {expanded === f.id && (
                <div className="px-5 pb-4 text-sm text-gray-600 border-t border-gray-50 pt-3 ml-9">
                  {f.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal === "add" ? "Add FAQ" : "Edit FAQ"}>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Question *</label>
            <input value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} className={inputCls} placeholder="What are your visiting hours?" />
          </div>
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Answer *</label>
            <textarea value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} rows={5} className={inputCls} />
          </div>
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Display Order</label>
            <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className={inputCls} min={0} />
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
