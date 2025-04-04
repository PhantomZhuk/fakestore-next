import { connectDB } from "@/lib/db";
import { registerUser } from "@/services/authService";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { fullName, email, password } = await req.json();
    const { token, user } = await registerUser(fullName, email, password);

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
    }
    return NextResponse.json(
      { success: false, message: "Unknown error" },
      { status: 500 }
    );
  }
}
