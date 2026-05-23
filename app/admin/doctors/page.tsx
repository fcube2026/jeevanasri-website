"use client";
import { useState, useEffect, useCallback } from "react";
import { Trash2, Home } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import Modal from "@/components/admin/Modal";

type Doctor = {
  id: string; name: string; specialization: string; qualification?: string;
  experience?: string; department?: string; availability?: string;
  consultingHours?: string; phone?: string; email?: string;
  languages?: string; shortBio?: string; description?: string;
  image?: string; isActive: boolean; showOnHomepage: boolean; createdAt: string;
};

const inputCls = "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white";
const empty = {
  name: "", specialization: "", qualification: "", experience: "",
  department: "", availability: "", consultingHours: "", phone: "",
  email: "", languages: "", shortBio: "", description: "", image: "",
  isActive: true, showOnHomepage: false,
};

export default function DoctorsPage() {
  const [items,   setItems]   = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal,   setModal]   = useState<"add" | "edit" | null>(null);
  const [form,    setForm]    = useState(empty);
  const [editId,  setEditId]  = useState<string | null>(null);
  const [saving,  setSaving]  = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/doctors");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openAdd = () => { setForm(empty); setEditId(null); setModal("add"); };
  const openEdit = (d: Doctor) => {
    setForm({
      name: d.name, specialization: d.specialization, qualification: d.qualification ?? "",
      experience: d.experience ?? "", department: d.department ?? "",
      availability: d.availability ?? "", consultingHours: d.consultingHours ?? "",
      phone: d.phone ?? "", email: d.email ?? "", languages: d.languages ?? "",
      shortBio: d.shortBio ?? "", description: d.description ?? "",
      image: d.image ?? "", isActive: d.isActive, showOnHomepage: d.showOnHomepage,
    });
    setEditId(d.id);
    setModal("edit");
  };

  const handleSave = async () => {
    setSaving(true);
    if (modal === "add") {
      await fetch("/api/admin/doctors", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    } else {
      await fetch(`/api/admin/doctors/${editId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    }
    setSaving(false);
    setModal(null);
    fetchData();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this doctor?")) return;
    await fetch(`/api/admin/doctors/${id}`, { method: "DELETE" });
    fetchData();
  };

  return (
    <div>
      <AdminPageHeader title="Doctors" subtitle="Manage the hospital's medical team" onAdd={openAdd} addLabel="Add Doctor" />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {["Doctor", "Specialization", "Department", "Phone", "Status", "Homepage", "Date", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-black text-gray-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan={8} className="text-center py-20 text-gray-400">Loading…</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={8} className="text-center py-20 text-gray-400">No doctors added yet.</td></tr>
            ) : items.map((d) => (
              <tr key={d.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    {d.image ? (
                      <img src={d.image} alt={d.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0"
                        style={{ background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)" }}>
                        {d.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-gray-800 text-sm">{d.name}</div>
                      {d.qualification && <div className="text-xs text-gray-400">{d.qualification}</div>}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{d.specialization}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{d.department ?? "—"}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{d.phone ?? "—"}</td>
                <td className="px-4 py-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={d.isActive
                      ? { background: "rgba(16,185,129,0.1)", color: "#059669" }
                      : { background: "rgba(239,68,68,0.1)", color: "#dc2626" }}>
                    {d.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {d.showOnHomepage && (
                    <span className="flex items-center gap-1 text-xs font-bold text-blue-600">
                      <Home size={11} /> Yes
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-xs text-gray-400">{new Date(d.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEdit(d)}
                      className="text-xs font-bold px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">Edit</button>
                    <button onClick={() => remove(d.id)}
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

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal === "add" ? "Add Doctor" : "Edit Doctor"} width="max-w-3xl">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Full Name *</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} placeholder="Dr. John Smith" />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Specialization *</label>
              <input value={form.specialization} onChange={(e) => setForm({ ...form, specialization: e.target.value })} className={inputCls} placeholder="Cardiologist" />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Qualification</label>
              <input value={form.qualification} onChange={(e) => setForm({ ...form, qualification: e.target.value })} className={inputCls} placeholder="MBBS, MD" />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Experience</label>
              <input value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} className={inputCls} placeholder="15+ Years" />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Department</label>
              <input value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className={inputCls} placeholder="Cardiology" />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Languages</label>
              <input value={form.languages} onChange={(e) => setForm({ ...form, languages: e.target.value })} className={inputCls} placeholder="English, Tamil, Hindi" />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Phone</label>
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} placeholder="+91 98765 43210" />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Email</label>
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} placeholder="doctor@hospital.com" />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Availability</label>
              <input value={form.availability} onChange={(e) => setForm({ ...form, availability: e.target.value })} className={inputCls} placeholder="Mon–Fri" />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Consulting Hours</label>
              <input value={form.consultingHours} onChange={(e) => setForm({ ...form, consultingHours: e.target.value })} className={inputCls} placeholder="9 AM – 5 PM" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Short Bio</label>
            <input value={form.shortBio} onChange={(e) => setForm({ ...form, shortBio: e.target.value })} className={inputCls} placeholder="One-liner for listings" />
          </div>
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Full Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className={inputCls} />
          </div>
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Photo URL</label>
            <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className={inputCls} placeholder="https://…" />
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 cursor-pointer">
              <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 rounded border-gray-300" />
              Active
            </label>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 cursor-pointer">
              <input type="checkbox" checked={form.showOnHomepage} onChange={(e) => setForm({ ...form, showOnHomepage: e.target.checked })} className="w-4 h-4 rounded border-gray-300" />
              Show on Homepage
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
