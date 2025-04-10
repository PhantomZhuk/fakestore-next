import { Document, model, models, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  fullName: string;
  password: string;
  role: "user" | "admin";
}

const UserSchema = new Schema<IUser>({
  email: { required: true, type: String, unique: true },
  fullName: { required: true, type: String },
  password: { required: true, type: String },
  role: {
    required: true,
    enum: ["user", "admin"],
    type: String,
    default: "user",
  },
});

export const User = model<IUser>("User", UserSchema);
