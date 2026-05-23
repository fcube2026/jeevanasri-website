import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { TESTIMONIALS } from "@/lib/data";

export async function GET() {
  try {
    const rows = await prisma.testimonial.findMany({
      where: { isVisible: true },
      orderBy: { createdAt: "desc" },
    });
    if (rows.length === 0) return NextResponse.json(TESTIMONIALS);
    return NextResponse.json(
      rows.map((t) => ({
        id: t.id,
        name: t.name,
        review: t.review,
        rating: t.rating,
        treatment: t.treatment ?? "",
        image: t.image ?? "",
      }))
    );
  } catch {
    return NextResponse.json(TESTIMONIALS);
  }
}
