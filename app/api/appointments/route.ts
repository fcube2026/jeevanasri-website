import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, mobile, email, department, doctor, prefDate, prefTime, notes } = body;

    if (!name || !mobile) {
      return NextResponse.json({ error: "Name and mobile are required" }, { status: 400 });
    }

    const appointment = await prisma.appointment.create({
      data: {
        patientName: name,
        mobile,
        email: email || null,
        department: department || null,
        doctor: doctor || null,
        prefDate: prefDate || null,
        prefTime: prefTime || null,
        notes: notes || null,
        status: "PENDING",
      },
    });

    return NextResponse.json({ success: true, id: appointment.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
