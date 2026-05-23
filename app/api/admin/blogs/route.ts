import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        author: true,
        category: true,
        status: true,
        isFeatured: true,
        publishDate: true,
        createdAt: true,
        featuredImage: true,
      },
    });
    return NextResponse.json(blogs);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      slug,
      author,
      category,
      summary,
      content,
      tags,
      metaTitle,
      metaDesc,
      isFeatured,
      status,
      readTime,
      featuredImage,
      publishDate,
    } = body;

    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        author,
        category,
        summary,
        content,
        tags: Array.isArray(tags) ? tags.join(", ") : (tags ?? null),
        metaTitle,
        metaDesc,
        isFeatured: isFeatured ?? false,
        status: status ?? "DRAFT",
        readTime,
        featuredImage,
        publishDate: publishDate ? new Date(publishDate) : null,
      },
    });
    return NextResponse.json(blog, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
