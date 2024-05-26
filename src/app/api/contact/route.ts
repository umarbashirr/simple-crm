import { connectMongo } from "@/config/connect-db";
import { verifyJWT } from "@/helpers/verify-jwt";
import Contact from "@/models/contact.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectMongo();

    const response = await verifyJWT(req);

    if (!response.success) {
      return NextResponse.json(
        {
          message: response?.message,
          success: false,
        },
        {
          status: 401,
        }
      );
    }

    const user: any = response.data;

    const body = await req.json();

    const { name, email, phone, address, notes } = body;

    console.log(body);

    const isContactExists = await Contact.findOne({ email });

    if (isContactExists) {
      return NextResponse.json({
        message: "Contact already exists!",
        success: false,
      });
    }

    const contact = new Contact({
      name,
      email,
      phone,
      address,
      notes,
      createdBy: user?.id,
    });

    await contact.save();

    return NextResponse.json({
      message: "Contact added to list successfully!",
      success: true,
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

export async function PUT(req: NextRequest) {
  try {
    await connectMongo();

    const response = await verifyJWT(req);

    if (!response.success) {
      return NextResponse.json(
        {
          message: response?.message,
          success: false,
        },
        {
          status: 401,
        }
      );
    }

    const user: any = response.data;

    const body = await req.json();

    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("contactId");

    const { name, email, phone, address, notes } = body;

    console.log(body);

    const updatedContact = await Contact.findByIdAndUpdate(
      query,
      {
        $set: {
          name,
          email,
          phone,
          address,
          notes,
        },
      },
      {
        new: true,
      }
    );

    if (!updatedContact) {
      return NextResponse.json({
        message: "Issue while updating contact details!",
        success: false,
      });
    }

    return NextResponse.json({
      message: "Contact updated successfully!",
      success: true,
      data: updatedContact,
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

export async function GET(req: NextRequest) {
  try {
    await connectMongo();

    const response = await verifyJWT(req);

    if (!response.success) {
      return NextResponse.json(
        {
          message: response?.message,
          success: false,
        },
        {
          status: 401,
        }
      );
    }

    const user: any = response.data;

    const contacts = await Contact.find({
      createdBy: user?.id,
    });

    return NextResponse.json(
      {
        message: "Contact list fetched!",
        success: true,
        data: contacts,
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
