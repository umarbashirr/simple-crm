import { connectMongo } from "@/config/connect-db";
import { verifyJWT } from "@/helpers/verify-jwt";
import PipelineStage from "@/models/pipeline-stage.model";
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

    const { name } = await req.json();

    const isStageExist = await PipelineStage.findOne({
      name: name?.toLowerCase(),
      createdBy: user?.id,
    });

    if (isStageExist) {
      return NextResponse.json(
        {
          message: "Stage with same name already created!",
          success: false,
        },
        {
          status: 401,
        }
      );
    }

    const stage = new PipelineStage({
      name: name.toLowerCase(),
      createdBy: user.id,
    });

    await stage.save();

    return NextResponse.json(
      {
        message: "Stage created successfully!",
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

    const stages = await PipelineStage.find({
      createdBy: user?.id,
    });

    return NextResponse.json(
      {
        message: "Stages fetched successfully!",
        success: true,
        data: stages,
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
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
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

    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("stageId");

    const stage = await PipelineStage.findOneAndDelete({
      _id: query,
      createdBy: user?.id,
    });

    if (!stage) {
      return NextResponse.json(
        {
          message: "Error while deleting stage!",
          success: false,
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        message: "Stages deleted successfully!",
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
      { status: 500 }
    );
  }
}
