"use client";
import { useState, useEffect } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

const inputCls = "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white";

const FIELDS: { key: string; label: string; placeholder: string; type?: string; rows?: number }[] = [
  { key: "hospital_name",    label: "Hospital Name",       placeholder: "Jeevanasri Hospitals" },
  { key: "tagline",          label: "Tagline",             placeholder: "Caring for Life, Healing with Heart" },
  { key: "phone_primary",    label: "Primary Phone",       placeholder: "+91 98765 43210" },
  { key: "phone_emergency",  label: "Emergency Number",    placeholder: "108" },
  { key: "email",            label: "Email",               placeholder: "info@jeevanasrihospitals.com" },
  { key: "address_line1",    label: "Address Line 1",      placeholder: "123 Hospital Road" },
  { key: "address_line2",    label: "Address Line 2",      placeholder: "Chennai, Tamil Nadu 600001" },
  { key: "working_hours",    label: "Working Hours",       placeholder: "Mon–Sat: 8 AM – 8 PM, Sun: 9 AM – 5 PM" },
  { key: "google_maps_url",  label: "Google Maps URL",     placeholder: "https://maps.google.com/…" },
  { key: "facebook_url",     label: "Facebook URL",        placeholder: "https://facebook.com/jeevanasri" },
  { key: "instagram_url",    label: "Instagram URL",       placeholder: "https://instagram.com/jeevanasri" },
  { key: "twitter_url",      label: "Twitter/X URL",       placeholder: "https://twitter.com/jeevanasri" },
  { key: "youtube_url",      label: "YouTube URL",         placeholder: "https://youtube.com/@jeevanasri" },
  { key: "about_short",      label: "About (Short)",       placeholder: "Brief description for homepage…", rows: 3 },
  { key: "footer_text",      label: "Footer Text",         placeholder: "© 2024 Jeevanasri Hospitals. All rights reserved.", rows: 2 },
];

export default function SettingsPage() {
  const [values,  setValues]  = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [saved,   setSaved]   = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => { setValues(data ?? {}); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const payload = Object.entries(values).map(([key, value]) => ({ key, value }));
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) return <div className="text-center py-20 text-gray-400">Loading…</div>;

  return (
    <div>
      <AdminPageHeader title="Settings" subtitle="Hospital information and contact details" />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
        <div>
          <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-4">Hospital Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FIELDS.slice(0, 8).map((f) => (
              <div key={f.key} className={f.rows ? "md:col-span-2" : ""}>
                <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">{f.label}</label>
                {f.rows ? (
                  <textarea
                    rows={f.rows}
                    value={values[f.key] ?? ""}
                    onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                    className={inputCls}
                    placeholder={f.placeholder}
                  />
                ) : (
                  <input
                    type={f.type ?? "text"}
                    value={values[f.key] ?? ""}
                    onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                    className={inputCls}
                    placeholder={f.placeholder}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-4">Social Media</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FIELDS.slice(8, 12).map((f) => (
              <div key={f.key}>
                <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">{f.label}</label>
                <input
                  value={values[f.key] ?? ""}
                  onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                  className={inputCls}
                  placeholder={f.placeholder}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-4">Content</h2>
          <div className="space-y-4">
            {FIELDS.slice(12).map((f) => (
              <div key={f.key}>
                <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">{f.label}</label>
                <textarea
                  rows={f.rows ?? 2}
                  value={values[f.key] ?? ""}
                  onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                  className={inputCls}
                  placeholder={f.placeholder}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {saved ? (
            <span className="text-sm font-bold text-green-600">Settings saved successfully!</span>
          ) : <span />}
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-8 py-3 rounded-xl text-sm font-black text-white disabled:opacity-60 hover:scale-105 transition-all"
            style={{ background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)" }}>
            {saving ? "Saving…" : "Save Settings"}
          </button>
        </div>
      </div>
    </div>
  );
}
