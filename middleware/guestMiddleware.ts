import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function guestMiddleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (
    token &&
    (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register")
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
