import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, mobile, email, message } = body;

    if (!name || !mobile || !message) {
      return NextResponse.json({ error: "Name, mobile, and message are required" }, { status: 400 });
    }

    await prisma.inquiry.create({
      data: { name, mobile, email: email || null, message, status: "OPEN" },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
