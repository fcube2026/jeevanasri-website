import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const blog = await prisma.blog.findFirst({
      where: {
        OR: [{ slug }, { id: slug }],
        status: "PUBLISHED",
      },
      include: { images: true },
    });

    if (!blog) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: blog.id,
      slug: blog.slug,
      title: blog.title,
      author: blog.author,
      category: blog.category ?? "",
      summary: blog.summary ?? "",
      content: blog.content ?? "",
      tags: blog.tags ?? "",
      readTime: blog.readTime ?? "",
      featuredImage: blog.featuredImage ?? "",
      publishDate: blog.publishDate,
      createdAt: blog.createdAt,
      isFeatured: blog.isFeatured,
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
