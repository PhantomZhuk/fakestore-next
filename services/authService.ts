import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
}

const JWT_SECRET = process.env.JWT_SECRET as string;

export const registerUser = async (
  fullName: string,
  email: string,
  password: string
) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({
    fullName,
    email,
    password: passwordHash,
  });

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: "1d",
  });

  return { token, user };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Invalid password");

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: "1d",
  });

  return { token, user };
};

export const verifyToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if (!decoded) throw new Error("Invalid token");
    const user = await User.findById(decoded.userId);
    if (!user) throw new Error("User not found");

    return user;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
