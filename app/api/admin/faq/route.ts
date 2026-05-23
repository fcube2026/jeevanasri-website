import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const faqs = await prisma.faq.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(faqs);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, answer, order } = body;

    const faq = await prisma.faq.create({
      data: {
        question,
        answer,
        order: order ?? 0,
      },
    });
    return NextResponse.json(faq, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
