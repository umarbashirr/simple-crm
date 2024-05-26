import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const verifyJWT = async (req: NextRequest) => {
  const token = cookies().get("token")?.value || req.headers.get("token");

  if (!token) {
    return {
      success: false,
      message: "You are not authorized to complete this request",
    };
  }

  const decodedToken = await jwt.verify(token, process.env.JWT_ACCESS_SECRET!);

  if (!decodedToken) {
    return { success: false, message: "Unauthorized! Invalid token" };
  }

  return { success: true, data: decodedToken };
};
