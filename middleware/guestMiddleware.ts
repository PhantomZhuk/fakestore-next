// middlewares/guestMiddleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";
import { cookies } from "next/headers";

const jwtConfig = {
  secret: new TextEncoder().encode(process.env.JWT_SECRET_KEY as string),
};

export async function guestMiddleware(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.next();
  }

  try {
    await jose.jwtVerify(token, jwtConfig.secret);

    const isAuthPage = ["/login", "/register"].includes(req.nextUrl.pathname);
    if (isAuthPage) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("guestMiddleware jwtVerify error: ", error);

    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.set("token", "", { maxAge: 0 }); // правильне видалення токена
    return response;
  }
}
