import { Order } from "@/models/Order";
import { User } from "@/models/User";
import { CartProduct } from "@/store/store";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const createOrder = async (token: string, products: CartProduct[]) => {
  const userId = jwt.verify(token, JWT_SECRET);
  if (!userId) throw Error("Invalid token");
  if (typeof userId === "string") throw Error("Invalid token format");
  const user = await User.findById(userId.userId);

  const order = new Order({
    fullName: user.fullName,
    email: user.email,
    products,
  });

  await order.save({ runValidators: false });

  if (!order) throw Error("Failed to create order");

  return { message: "Order created successfully" };
};

export const updateOrder = async (
  _id: string,
  fullName: string,
  email: string,
  products: CartProduct[]
) => {
  const order = await Order.findByIdAndUpdate(_id, {
    fullName,
    email,
    products,
  });

  if (!order) throw Error("Order not found");

  return { message: "Order updated successfully" };
};

export const deleteOrder = async (_id: string) => {
  const order = await Order.findByIdAndDelete(_id);

  if (!order) throw Error("Order not found");

  return { message: "Order deleted successfully" };
};

export const getOrders = async () => {
  const orders = await Order.find();

  if (!orders) throw Error("Order not found");

  return orders;
};
