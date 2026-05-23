import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status, adminNotes, prefDate, prefTime, doctor, department } = body;

    const appointment = await prisma.appointment.update({
      where: { id },
      data: {
        ...(status !== undefined && { status }),
        ...(adminNotes !== undefined && { adminNotes }),
        ...(prefDate !== undefined && { prefDate }),
        ...(prefTime !== undefined && { prefTime }),
        ...(doctor !== undefined && { doctor }),
        ...(department !== undefined && { department }),
      },
    });
    return NextResponse.json(appointment);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
