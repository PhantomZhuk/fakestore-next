import { CartProduct } from "@/store/store";
import mongoose, { Schema, Document, model, models } from "mongoose";

interface IOrder extends Document {
  fullName: string;
  email: string;
  products: CartProduct[];
}

const ProductSchema = new Schema<CartProduct>(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    rating: {
      rate: { type: Number, required: true },
      count: { type: Number, required: true },
    },
    quantity: { type: Number, required: true },
  },
  { _id: false, validateBeforeSave: false }
);

const OrderSchema = new Schema<IOrder>({
  fullName: { required: true, type: String },
  email: { required: true, type: String },
  products: { type: [ProductSchema], required: true },
});

export const Order = models.Order || model<IOrder>("Order", OrderSchema);
