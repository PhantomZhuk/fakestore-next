import type { NextRequest } from "next/server";
import { authMiddleware } from "./middleware/authMiddleware";
import { adminMiddleware } from "./middleware/adminMiddleware";
import { guestMiddleware } from "./middleware/guestMiddleware";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  console.log("Middleware triggered for path:", pathname);

  if (pathname.startsWith("/dashboard")) {
    return adminMiddleware(req);
  }

  if (
    pathname.startsWith("/profile") ||
    pathname.startsWith("/checkout") ||
    pathname === "/"
  ) {
    return authMiddleware(req);
  }

  if (pathname === "/login" || pathname === "/register") {
    return guestMiddleware(req);
  }

  return undefined;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile",
    "/checkout",
    "/login",
    "/register",
    "/",
    "/home",
  ],
};
