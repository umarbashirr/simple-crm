import { connectMongo } from "@/config/connect-db";
import { verifyJWT } from "@/helpers/verify-jwt";
import Task from "@/models/task.model";
import User from "@/models/user.model";
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

    const { title, description, status, priority, dueDate, contactId } =
      await req.json();

    const task = {
      title,
      description,
      status,
      priority,
      dueDate,
      createdBy: user.id,
      contactId,
    };

    const newTask = await new Task(task).save();

    return NextResponse.json(
      {
        success: true,
        message: "Task saved successfully",
        data: newTask,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
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

    const tasks = await Task.find({
      $or: [{ createdBy: user.id }, { assignedTo: user.id }],
    }).populate({ path: "contactId", model: User });

    return NextResponse.json(
      {
        success: true,
        message: "Tasks fetched successfully!",
        data: tasks,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
