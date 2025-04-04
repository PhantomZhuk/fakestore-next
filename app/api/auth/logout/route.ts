import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json(
      { success: true, message: "Logout successful" },
      { status: 200 }
    );
    response.cookies.set("token", "", {
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
