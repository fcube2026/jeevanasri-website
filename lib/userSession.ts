import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET ?? "fallback-dev-secret-change-in-prod-32chars!!"
);

const COOKIE    = "user_session";
const EXPIRES   = 7 * 24 * 60 * 60 * 1000;

export type UserPayload = { userId: string; email: string; name: string };

async function encrypt(payload: UserPayload) {
  return new SignJWT(payload as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET);
}

async function decrypt(token: string): Promise<UserPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET, { algorithms: ["HS256"] });
    return payload as unknown as UserPayload;
  } catch {
    return null;
  }
}

export async function createUserSession(userId: string, email: string, name: string) {
  const expiresAt = new Date(Date.now() + EXPIRES);
  const token     = await encrypt({ userId, email, name });
  const store     = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}

export async function deleteUserSession() {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function getUserSession(): Promise<UserPayload | null> {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (!token) return null;
  return decrypt(token);
}
