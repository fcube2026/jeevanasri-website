import { Plus } from "lucide-react";

interface Props {
  title: string;
  subtitle?: string;
  onAdd?: () => void;
  addLabel?: string;
}

export default function AdminPageHeader({ title, subtitle, onAdd, addLabel = "Add New" }: Props) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900">{title}</h1>
        {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
      </div>
      {onAdd && (
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-sm text-white transition-all hover:scale-105 hover:shadow-lg"
          style={{ background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)", boxShadow: "0 4px 16px rgba(29,78,216,0.25)" }}
        >
          <Plus size={16} />
          {addLabel}
        </button>
      )}
    </div>
  );
}
