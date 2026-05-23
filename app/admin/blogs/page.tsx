"use client";
import { useState, useEffect, useCallback } from "react";
import { Trash2, Star } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import Modal from "@/components/admin/Modal";

type Blog = {
  id: string; title: string; slug: string; author: string; category?: string;
  status: string; isFeatured: boolean; publishDate?: string; createdAt: string; featuredImage?: string;
};

type BlogStatus = "all" | "DRAFT" | "PUBLISHED" | "ARCHIVED";

const inputCls = "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white";

const empty = {
  title: "", slug: "", author: "", category: "", summary: "", content: "",
  tags: "", metaTitle: "", metaDesc: "", isFeatured: false, status: "DRAFT",
  readTime: "", featuredImage: "", publishDate: "",
};

function toSlug(t: string) {
  return t.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}

const STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  DRAFT:     { bg: "rgba(245,158,11,0.1)",  text: "#d97706" },
  PUBLISHED: { bg: "rgba(16,185,129,0.1)",  text: "#059669" },
  ARCHIVED:  { bg: "rgba(107,114,128,0.1)", text: "#6b7280" },
};

export default function BlogsPage() {
  const [items,        setItems]        = useState<Blog[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [statusFilter, setStatusFilter] = useState<BlogStatus>("all");
  const [modal,        setModal]        = useState<"add" | "edit" | null>(null);
  const [form,         setForm]         = useState(empty);
  const [editId,       setEditId]       = useState<string | null>(null);
  const [saving,       setSaving]       = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/blogs");
    const data = await res.json();
    const all: Blog[] = Array.isArray(data) ? data : [];
    setItems(statusFilter === "all" ? all : all.filter((b) => b.status === statusFilter));
    setLoading(false);
  }, [statusFilter]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openAdd = () => { setForm(empty); setEditId(null); setModal("add"); };
  const openEdit = async (b: Blog) => {
    const res = await fetch(`/api/admin/blogs/${b.id}`);
    const full = await res.json();
    setForm({
      title: full.title ?? "", slug: full.slug ?? "", author: full.author ?? "",
      category: full.category ?? "", summary: full.summary ?? "", content: full.content ?? "",
      tags: full.tags ?? "", metaTitle: full.metaTitle ?? "", metaDesc: full.metaDesc ?? "",
      isFeatured: full.isFeatured ?? false, status: full.status ?? "DRAFT",
      readTime: full.readTime ?? "", featuredImage: full.featuredImage ?? "",
      publishDate: full.publishDate ? full.publishDate.slice(0, 10) : "",
    });
    setEditId(b.id);
    setModal("edit");
  };

  const handleSave = async () => {
    setSaving(true);
    const payload = {
      ...form,
      tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      publishDate: form.publishDate || null,
    };
    if (modal === "add") {
      await fetch("/api/admin/blogs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    } else {
      await fetch(`/api/admin/blogs/${editId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    }
    setSaving(false);
    setModal(null);
    fetchData();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
    fetchData();
  };

  return (
    <div>
      <AdminPageHeader title="Blogs" subtitle="Manage articles and health content" onAdd={openAdd} addLabel="New Post" />

      <div className="flex gap-3 mb-5">
        {(["all", "DRAFT", "PUBLISHED", "ARCHIVED"] as BlogStatus[]).map((s) => (
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
              {["Title", "Author", "Category", "Status", "Featured", "Date", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-black text-gray-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan={7} className="text-center py-20 text-gray-400">Loading…</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-20 text-gray-400">No posts found.</td></tr>
            ) : items.map((b) => {
              const ss = STATUS_STYLES[b.status] ?? STATUS_STYLES["DRAFT"];
              return (
                <tr key={b.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {b.featuredImage && (
                        <img src={b.featuredImage} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                      )}
                      <div>
                        <div className="font-semibold text-gray-800 text-sm">{b.title}</div>
                        <div className="text-xs text-gray-400">{b.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{b.author}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{b.category ?? "—"}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: ss.bg, color: ss.text }}>
                      {b.status.charAt(0) + b.status.slice(1).toLowerCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {b.isFeatured && <Star size={14} fill="#f59e0b" stroke="#f59e0b" />}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">{new Date(b.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(b)}
                        className="text-xs font-bold px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">Edit</button>
                      <button onClick={() => remove(b.id)}
                        className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
                        <Trash2 size={11} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal === "add" ? "New Blog Post" : "Edit Blog Post"} width="max-w-3xl">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Title *</label>
            <input value={form.title} onChange={(e) => {
              const title = e.target.value;
              setForm({ ...form, title, slug: modal === "add" ? toSlug(title) : form.slug });
            }} className={inputCls} placeholder="10 Tips for a Healthy Heart" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Slug</label>
              <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className={inputCls} placeholder="auto-generated" />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Author *</label>
              <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className={inputCls} placeholder="Dr. Jane Smith" />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Category</label>
              <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputCls} placeholder="Cardiology" />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className={inputCls}>
                {["DRAFT", "PUBLISHED", "ARCHIVED"].map((s) => (
                  <option key={s} value={s}>{s.charAt(0) + s.slice(1).toLowerCase()}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Read Time</label>
              <input value={form.readTime} onChange={(e) => setForm({ ...form, readTime: e.target.value })} className={inputCls} placeholder="5 min read" />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Publish Date</label>
              <input type="date" value={form.publishDate} onChange={(e) => setForm({ ...form, publishDate: e.target.value })} className={inputCls} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Featured Image URL</label>
            <input value={form.featuredImage} onChange={(e) => setForm({ ...form, featuredImage: e.target.value })} className={inputCls} placeholder="https://…" />
          </div>
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Summary</label>
            <textarea value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} rows={2} className={inputCls} />
          </div>
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Content</label>
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={6} className={inputCls} />
          </div>
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Tags (comma-separated)</label>
            <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className={inputCls} placeholder="heart, health, diet" />
          </div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 cursor-pointer">
            <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} className="w-4 h-4 rounded border-gray-300" />
            Mark as Featured
          </label>
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
