import { Order } from "@/models/Order";
import { CartProduct } from "@/store/store";

export const createOrder = async (
  fullName: string,
  email: string,
  products: CartProduct[]
) => {
  if (!fullName || !email || !products) throw Error("Missing required fields");
  if (products.length === 0) throw Error("No products in the order");

  const order = await Order.create({
    fullName,
    email,
    products,
  });

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
