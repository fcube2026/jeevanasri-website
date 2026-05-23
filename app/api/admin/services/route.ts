import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(services);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, icon, order, isVisible } = body;

    const service = await prisma.service.create({
      data: {
        title,
        description,
        icon,
        order: order ?? 0,
        isVisible: isVisible ?? true,
      },
    });
    return NextResponse.json(service, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
