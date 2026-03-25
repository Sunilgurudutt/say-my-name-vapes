import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE = "smn_admin_session";
const SESSION_VALUE = "smn_v2";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the login page through without a session check
  if (pathname === "/admin/login") return NextResponse.next();

  const session = request.cookies.get(SESSION_COOKIE);
  if (session?.value !== SESSION_VALUE) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
