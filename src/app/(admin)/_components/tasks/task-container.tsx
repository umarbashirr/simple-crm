"use client";

import { useState } from "react";
import SingleTaskCard from "./single-task-card";
import { useDrawer } from "@/providers/DrawerProvider";
import { Drawer } from "../drawer";
import TaskDetails from "./task-details";

const TaskContainer = ({ tasks }: any) => {
  const { open, setOpen } = useDrawer();
  const [selectedTask, setSelectedTask] = useState(null);

  const openTaskDetails = (task: any) => {
    setSelectedTask(task);
    setOpen(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10                       ">
      {tasks?.map((task: any, index: number) => (
        <SingleTaskCard
          task={task}
          key={index}
          openTaskDetails={openTaskDetails}
        />
      ))}
      {open && (
        <Drawer
          title="Task Details"
          description="View and manage your task details"
        >
          <TaskDetails task={selectedTask} />
        </Drawer>
      )}
    </div>
  );
};

export default TaskContainer;
