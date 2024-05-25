import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/user.model";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    const decodedToken: any = await jwt.verify(
      token,
      process.env.JWT_EMAIL_VERIFICATION_ACCESS_SECRET!
    );

    const user = await User.findById(decodedToken?.id);

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
          success: false,
        },
        {
          status: 401,
        }
      );
    }

    user.verificationStatus = true;
    user.emailVerificationToken = "";
    user.emailVerificationTokenExpiry = "";

    await user.save();

    return NextResponse.json(
      {
        message: "User verified successfully!",
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error?.message,
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
