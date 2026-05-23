import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Jeevanasri Hospitals – Compassionate Care, Advanced Treatment",
  description:
    "NABH accredited multi-specialty hospital in Hyderabad. Expert doctors in Cardiology, Orthopedics, Neurology, Pediatrics and 12+ specializations. 24/7 emergency care. Book appointment online.",
  keywords: "hospital, Hyderabad, cardiology, orthopedics, multispecialty, NABH, emergency",
  openGraph: {
    title: "Jeevanasri Hospitals",
    description: "Compassionate Care, Advanced Treatment, Trusted Doctors",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>{children}</body>
    </html>
  );
}
