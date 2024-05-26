import { validateEmail } from "@/helpers/validation";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { connectMongo } from "@/config/connect-db";

export async function POST(req: NextRequest) {
  try {
    await connectMongo();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          message: "Missing Inputs",
          success: false,
        },
        {
          status: 401,
        }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        {
          message: "Invalid Email",
          success: false,
        },
        {
          status: 401,
        }
      );
    }

    if (password < 6) {
      return NextResponse.json(
        {
          message: "Password should be minimum 06 characters",
          success: false,
        },
        {
          status: 401,
        }
      );
    }

    const userExist = await User.findOne({
      email,
    });

    if (!userExist) {
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

    const isPasswordMatch = await bcrypt.compare(password, userExist?.password);

    if (!isPasswordMatch) {
      return NextResponse.json(
        {
          message: "Invalid Password",
          success: false,
        },
        {
          status: 401,
        }
      );
    }

    const payload = {
      id: userExist?._id,
      name: userExist?.name,
      email: userExist?.email,
      verificationStatus: userExist?.verificationStatus,
    };

    const token = await jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: "1d",
    });

    cookies().set("token", token, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: process.env.NODE_ENV === "production",
    });

    return NextResponse.json({
      message: "User logged-in successfully!",
      success: true,
      data: token,
    });
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
