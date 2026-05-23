import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const doctors = await prisma.doctor.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(doctors);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      specialization,
      qualification,
      experience,
      department,
      availability,
      consultingHours,
      phone,
      email,
      languages,
      shortBio,
      description,
      image,
      isActive,
      showOnHomepage,
    } = body;

    const doctor = await prisma.doctor.create({
      data: {
        name,
        specialization,
        qualification,
        experience,
        department,
        availability,
        consultingHours,
        phone,
        email,
        languages,
        shortBio,
        description,
        image,
        isActive: isActive ?? true,
        showOnHomepage: showOnHomepage ?? false,
      },
    });
    return NextResponse.json(doctor, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
