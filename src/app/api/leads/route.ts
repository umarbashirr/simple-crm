import { connectMongo } from "@/config/connect-db";
import { verifyJWT } from "@/helpers/verify-jwt";
import Lead from "@/models/lead.model";
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

    const body = await req.json();
    const {
      title,
      value,
      notes,
      stage,
      source,
      status,
      lastContactedAt,
      contactId,
    } = body;

    const lead = new Lead({
      title,
      value: parseInt(value),
      notes,
      stage,
      source,
      status,
      lastContactedAt,
      contactId,
    });

    await lead.save();

    return NextResponse.json(
      { data: lead, success: true, message: "Lead created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectMongo();

    const user = await verifyJWT(req);

    if (!user.success) {
      return NextResponse.json(
        {
          message: user?.message,
          success: false,
        },
        {
          status: 401,
        }
      );
    }

    const searchParams = req.nextUrl.searchParams;
    const stageId = searchParams.get("stageId");

    const leads = await Lead.find({
      stage: stageId,
    }).populate("contactId");

    return NextResponse.json(
      {
        message: "Leads fetched successfully!",
        success: true,
        data: leads,
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

export async function PUT(req: NextRequest) {
  try {
    await connectMongo();

    const user = await verifyJWT(req);

    if (!user.success) {
      return NextResponse.json(
        {
          message: user?.message,
          success: false,
        },
        {
          status: 401,
        }
      );
    }

    const searchParams = req.nextUrl.searchParams;
    const leadId = searchParams.get("leadId");

    const body = await req.json();
    const {
      title,
      value,
      notes,
      stage,
      source,
      status,
      lastContactedAt,
      contactId,
    } = body;

    const lead = await Lead.findById(leadId);

    if (!lead) {
      return NextResponse.json(
        {
          message: "Lead not found",
          success: false,
        },
        {
          status: 404,
        }
      );
    }

    lead.title = title;
    lead.value = parseInt(value);
    lead.notes = notes;
    lead.stage = stage;
    lead.source = source;
    lead.status = status;
    lead.lastContactedAt = lastContactedAt;
    lead.contactId = contactId;

    await lead.save();

    return NextResponse.json(
      { data: lead, success: true, message: "Lead updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
