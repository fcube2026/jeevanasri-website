import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { BLOGS } from "@/lib/data";

export async function GET(req: NextRequest) {
  const limitParam = req.nextUrl.searchParams.get("limit");
  const limit = limitParam ? parseInt(limitParam) : undefined;

  try {
    const rows = await prisma.blog.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ isFeatured: "desc" }, { publishDate: "desc" }, { createdAt: "desc" }],
      take: limit,
      select: {
        id: true, title: true, slug: true, author: true, category: true,
        summary: true, featuredImage: true, publishDate: true, createdAt: true, isFeatured: true,
      },
    });
    if (rows.length === 0) return NextResponse.json(BLOGS.slice(0, limit));
    return NextResponse.json(
      rows.map((b) => ({
        id: b.id,
        slug: b.slug,
        title: b.title,
        author: b.author,
        category: b.category ?? "Health",
        date: new Date(b.publishDate ?? b.createdAt).toLocaleDateString("en-US", {
          month: "long", day: "numeric", year: "numeric",
        }),
        preview: b.summary ?? "",
        image: b.featuredImage ?? "",
      }))
    );
  } catch {
    return NextResponse.json(BLOGS.slice(0, limit));
  }
}
