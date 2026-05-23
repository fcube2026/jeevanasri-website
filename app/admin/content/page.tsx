import Link from "next/link";
import { Stethoscope, BookOpen, Wrench, Star, HelpCircle, Settings } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

const sections = [
  {
    href: "/admin/doctors",
    icon: Stethoscope,
    title: "Doctors",
    description: "Add, edit or remove doctors from the hospital's medical team listing.",
    color: "#1d4ed8",
  },
  {
    href: "/admin/blogs",
    icon: BookOpen,
    title: "Blog Posts",
    description: "Create and publish articles, health tips, and hospital news.",
    color: "#0ea5e9",
  },
  {
    href: "/admin/services",
    icon: Wrench,
    title: "Services",
    description: "Manage the list of medical services and departments shown on the website.",
    color: "#7c3aed",
  },
  {
    href: "/admin/testimonials",
    icon: Star,
    title: "Testimonials",
    description: "Curate patient reviews and testimonials visible on the homepage.",
    color: "#059669",
  },
  {
    href: "/admin/faq",
    icon: HelpCircle,
    title: "FAQ",
    description: "Manage frequently asked questions and their answers.",
    color: "#d97706",
  },
  {
    href: "/admin/settings",
    icon: Settings,
    title: "Settings",
    description: "Update hospital contact details, social media links, and branding.",
    color: "#64748b",
  },
];

export default function ContentPage() {
  return (
    <div>
      <AdminPageHeader title="Content" subtitle="Quick access to all website content sections" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <Link key={s.href} href={s.href}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:-translate-y-0.5 transition-all group">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: `${s.color}15` }}>
                <Icon size={22} style={{ color: s.color }} />
              </div>
              <h3 className="font-black text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{s.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
