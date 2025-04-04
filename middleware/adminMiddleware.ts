import { verifyToken } from "@/services/authService";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function adminMiddleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  const user = await verifyToken(token);
  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  const role = user.role;

  if (role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
