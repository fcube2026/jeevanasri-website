import { NextResponse } from "next/server";
import { deleteUserSession } from "@/lib/userSession";

export async function POST() {
  await deleteUserSession();
  return NextResponse.json({ ok: true });
}
