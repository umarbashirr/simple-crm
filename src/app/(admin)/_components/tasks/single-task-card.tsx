"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDrawer } from "@/providers/DrawerProvider";
import { ArchiveIcon, EditIcon, TrashIcon } from "lucide-react";
import { Drawer } from "../drawer";
import TaskDetails from "./task-details";

interface SingleTaskCardProps {
  task: any;
  openTaskDetails: (task: any) => void;
}

const SingleTaskCard = ({ task, openTaskDetails }: SingleTaskCardProps) => {
  return (
    <>
      <div className="relative bg-white shadow-sm border rounded-lg p-6 min-h-[200px] flex flex-col gap-4">
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 bg-transparent"
          onClick={() => openTaskDetails(task)}
        >
          <EditIcon size={18} />
        </Button>
        <div className="flex-grow">
          <h2 className="font-semibold text-lg">{task.title}</h2>
          <p className="text-sm text-muted-foreground my-2 line-clamp-3">
            {task.description}
          </p>
        </div>
        <hr />
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center flex-wrap gap-2">
            <Badge variant="outline" className="capitalize">
              {task.status}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {task.priority}
            </Badge>
          </div>
          <div className="flex items-center gap-2 -mr-2">
            <Button size="icon" variant="ghost" className=" bg-transparent">
              <ArchiveIcon size={18} />
            </Button>
            <Button size="icon" variant="ghost" className=" bg-transparent">
              <TrashIcon size={18} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleTaskCard;
