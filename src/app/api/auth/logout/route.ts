import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    cookies().delete("token");
    return NextResponse.json(
      {
        message: "Logged out successfully!",
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error?.message,
      },
      { status: 500 }
    );
  }
}
