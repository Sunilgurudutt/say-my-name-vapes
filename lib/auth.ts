"use server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

const SESSION_COOKIE = "smn_admin_session";
const SESSION_VALUE = "authenticated";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function login(password: string): Promise<boolean> {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!hash) {
    // Dev fallback — no hash set, use plaintext password "admin"
    if (
      process.env.NODE_ENV === "development" &&
      password === (process.env.ADMIN_PASSWORD ?? "admin")
    ) {
      await setSession();
      return true;
    }
    return false;
  }
  const valid = await bcrypt.compare(password, hash);
  if (valid) await setSession();
  return valid;
}

async function setSession() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, SESSION_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value === SESSION_VALUE;
}
