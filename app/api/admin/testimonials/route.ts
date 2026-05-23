import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(testimonials);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, review, rating, treatment, image, isVisible } = body;

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        review,
        rating: Number(rating),
        treatment,
        image,
        isVisible: isVisible ?? true,
      },
    });
    return NextResponse.json(testimonial, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
