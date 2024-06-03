"use client";

import { format } from "date-fns";
import {
  CalendarRangeIcon,
  CircleDot,
  FlagIcon,
  NotebookIcon,
} from "lucide-react";
import { useEffect } from "react";

const TaskDetails = ({ task }: any) => {
  const formatDate = (date: string) => {
    return format(new Date(date), "dd MMM yyyy");
  };
  return (
    <div className="mt-8">
      <h3 className="font-medium text-2xl">{task?.title}</h3>
      <div className="w-full mt-6 flex flex-col gap-4">
        <div className="w-full grid grid-cols-2">
          <p className="capitalize flex items-center gap-2 text-muted-foreground">
            <CircleDot size={16} />
            Status
          </p>
          <p className="capitalize">{task?.status}</p>
        </div>
        <div className="w-full grid grid-cols-2">
          <p className="capitalize flex items-center gap-2  text-muted-foreground">
            <FlagIcon size={16} /> Priority
          </p>
          <p className="capitalize">{task?.priority}</p>
        </div>
        <div className="w-full grid grid-cols-2">
          <p className="capitalize flex items-center gap-2  text-muted-foreground">
            <CalendarRangeIcon size={16} /> Due Date
          </p>
          <p className="capitalize">{formatDate(task?.dueDate)}</p>
        </div>
        <div className="w-full grid grid-cols-1">
          <p className="capitalize flex items-center gap-2  text-muted-foreground">
            <NotebookIcon size={16} />
            Description
          </p>
          <div className="border rounded-lg shadow-sm p-3 mt-2">
            <p className="text-sm">{task?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
