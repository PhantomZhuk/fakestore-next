import mongoose, { Schema, Document, model } from "mongoose";

interface IOrder extends Document {}

const OrderSchema = new Schema<IOrder>({});

const Order = model<IOrder>("Order", OrderSchema);
