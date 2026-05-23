import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET ?? "fallback-dev-secret-change-in-prod-32chars!!"
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow login page through
  if (pathname === "/admin/login") return NextResponse.next();

  const isApiRoute = pathname.startsWith("/api/admin/");

  const token = request.cookies.get("admin_session")?.value;
  if (!token) {
    if (isApiRoute) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  try {
    await jwtVerify(token, SECRET, { algorithms: ["HS256"] });
    return NextResponse.next();
  } catch {
    if (isApiRoute) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const res = NextResponse.redirect(new URL("/admin/login", request.url));
    res.cookies.delete("admin_session");
    return res;
  }
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
