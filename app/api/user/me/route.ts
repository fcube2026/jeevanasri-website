import { NextResponse } from "next/server";
import { getUserSession } from "@/lib/userSession";

export async function GET() {
  const session = await getUserSession();
  if (!session) return NextResponse.json({ user: null });
  return NextResponse.json({ user: { name: session.name, email: session.email } });
}
