import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { deleteOrder, updateOrder } from "@/services/orderService";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const id = params.id;
    const { fullName, email, products } = await req.json();
    const { message } = await updateOrder(id, fullName, email, products);
    return NextResponse.json({ success: true, message });
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const id = params.id;
    const { message } = await deleteOrder(id);

    return NextResponse.json({ success: true, message });
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
