import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validateEmail, validateName } from "@/helpers/validation";
import { connectMongo } from "@/config/connect-db";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import moment from "moment";

export async function POST(req: NextRequest) {
  try {
    await connectMongo();

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          message: "Missing input fields",
          success: false,
        },
        {
          status: 402,
        }
      );
    }

    if (!validateName(name)) {
      return NextResponse.json(
        {
          message: "Invalid name",
          success: false,
        },
        {
          status: 402,
        }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        {
          message: "Invalid email",
          success: false,
        },
        {
          status: 402,
        }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          message: "Password should be minimum 06 characters",
          success: false,
        },
        {
          status: 402,
        }
      );
    }

    const userExists = await User.findOne({
      email,
    });

    if (userExists) {
      return NextResponse.json(
        {
          message: "User already exists!",
          success: false,
        },
        {
          status: 402,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!hashedPassword) {
      return NextResponse.json(
        {
          message: "Error while hashing password",
          success: false,
        },
        {
          status: 402,
        }
      );
    }

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    const newUser = await user.save();

    const verificationToken = await jwt.sign(
      { id: newUser?._id },
      process.env.JWT_EMAIL_VERIFICATION_ACCESS_SECRET!,
      {
        expiresIn: "1d",
      }
    );

    const url = `${process.env.NEXT_PUBLIC_APP_URL}/email-verification?token=${verificationToken}`;

    const emailResponse = await sendVerificationEmail(name, email, url);

    // Get the current time plus one day
    const currentTimePlusOneDay = moment().add(1, "days");

    // Convert to milliseconds
    const timeInMilliseconds = currentTimePlusOneDay.valueOf();

    if (!emailResponse.success) {
      return NextResponse.json(
        { message: emailResponse.message, success: false },
        { status: 402 }
      );
    }

    newUser.emailVerificationToken = verificationToken;
    newUser.emailVerificationTokenExpiry = timeInMilliseconds;

    await newUser.save();

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully!",
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error(error);
    NextResponse.json(
      { message: error?.message, success: false },
      { status: 500 }
    );
  }
}
