import { NextRequest } from "next/server";
import { login, logout } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { action, password } = await req.json();

  if (action === "logout") {
    await logout();
    return Response.json({ ok: true });
  }

  if (action === "login") {
    const ok = await login(password ?? "");
    if (!ok) return Response.json({ error: "Invalid password" }, { status: 401 });
    return Response.json({ ok: true });
  }

  return Response.json({ error: "Unknown action" }, { status: 400 });
}
