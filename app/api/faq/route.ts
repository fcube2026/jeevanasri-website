import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { FAQ } from "@/lib/data";

export async function GET() {
  try {
    const rows = await prisma.faq.findMany({ orderBy: { order: "asc" } });
    if (rows.length === 0) return NextResponse.json(FAQ);
    return NextResponse.json(rows.map((f) => ({ q: f.question, a: f.answer })));
  } catch {
    return NextResponse.json(FAQ);
  }
}
