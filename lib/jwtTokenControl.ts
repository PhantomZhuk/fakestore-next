import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import * as jose from "jose";

const jwtConfig = {
  secret: new TextEncoder().encode(process.env.JWT_SECRET as string),
};

export const isAuthenticated = async (req: NextRequest) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    console.log("Token not found in cookies");
    return false;
  }

  try {
    const { payload } = await jose.jwtVerify(token, jwtConfig.secret);

    if (payload) {
      return true;
    } else {
      console.log("Payload does not contain _id");
      return false;
    }
  } catch (err) {
    console.error("isAuthenticated error: ", err);
    return false;
  }
};
