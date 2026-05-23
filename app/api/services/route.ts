import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { SERVICES } from "@/lib/data";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { isVisible: true },
      orderBy: { order: "asc" },
    });
    if (services.length === 0) return NextResponse.json(SERVICES);
    return NextResponse.json(
      services.map((s) => ({
        icon: s.icon ?? "🏥",
        title: s.title,
        description: s.description ?? "",
      }))
    );
  } catch {
    return NextResponse.json(SERVICES);
  }
}
