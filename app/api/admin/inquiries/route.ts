import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const status = searchParams.get("status");

    const inquiries = await prisma.inquiry.findMany({
      where: status ? { status: status as never } : undefined,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(inquiries);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
