import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { DOCTORS } from "@/lib/data";

export async function GET() {
  try {
    const docs = await prisma.doctor.findMany({
      where: { isActive: true },
      orderBy: [{ showOnHomepage: "desc" }, { createdAt: "asc" }],
    });
    if (docs.length === 0) return NextResponse.json(DOCTORS);
    return NextResponse.json(
      docs.map((d) => ({
        id: d.id,
        name: d.name,
        specialization: d.specialization,
        experience: d.experience ?? "",
        qualification: d.qualification ?? "",
        availability: d.availability ?? "",
        bio: d.shortBio ?? d.description ?? "",
        image: d.image ?? "",
      }))
    );
  } catch {
    return NextResponse.json(DOCTORS);
  }
}
