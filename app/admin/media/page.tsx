import { ImageIcon, Upload } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

export default function MediaPage() {
  return (
    <div>
      <AdminPageHeader title="Media" subtitle="Image and file library" />
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center py-24 text-center px-8">
        <div className="w-20 h-20 rounded-3xl bg-blue-50 flex items-center justify-center mb-6">
          <ImageIcon size={36} className="text-blue-400" />
        </div>
        <h3 className="text-xl font-black text-gray-800 mb-2">Media Library</h3>
        <p className="text-gray-500 max-w-sm mb-6 leading-relaxed">
          Cloud file storage is not yet configured. To add images, paste public image URLs directly in the Doctors, Blogs, or Testimonials forms.
        </p>
        <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-100 text-gray-400 text-sm font-bold cursor-not-allowed">
          <Upload size={16} />
          Upload Files (Coming Soon)
        </div>
        <p className="mt-6 text-xs text-gray-400">
          You can use <span className="font-semibold">Cloudinary</span>, <span className="font-semibold">Uploadthing</span>, or any CDN — configure it in settings to enable uploads here.
        </p>
      </div>
    </div>
  );
}
