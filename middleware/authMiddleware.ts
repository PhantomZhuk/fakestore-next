import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthenticated } from "@/lib/jwtTokenControl";

export async function authMiddleware(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    console.log(token);
    console.log("token not found");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const result = await isAuthenticated(req);

  if (result) {
    console.log("token valid");
    return NextResponse.next();
  } else {
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete("token");
    return response;
  }
}
