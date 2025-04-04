import { loginUser } from "@/services/authService";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();
    const { token, user } = await loginUser(email, password);
    const response = NextResponse.json({ success: true, user });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      path: "/",
    });
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "Unknown error" },
        { status: 500 }
      );
    }
  }
}
