import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { createOrder, getOrders } from "@/services/orderService";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const orders = await getOrders();

    if (!orders) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, orders });
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

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const products = await req.json();
    const { message } = await createOrder(token!, products);
    return NextResponse.json({ success: true, message });
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
