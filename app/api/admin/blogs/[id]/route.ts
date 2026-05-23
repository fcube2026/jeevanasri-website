import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const blog = await prisma.blog.findUnique({
      where: { id },
      include: { images: true },
    });
    if (!blog) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(blog);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    if (body.publishDate !== undefined) {
      body.publishDate = body.publishDate ? new Date(body.publishDate) : null;
    }
    if (body.tags !== undefined) {
      body.tags = Array.isArray(body.tags) ? body.tags.join(", ") : (body.tags ?? null);
    }

    const blog = await prisma.blog.update({
      where: { id },
      data: body,
    });
    return NextResponse.json(blog);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.blog.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
