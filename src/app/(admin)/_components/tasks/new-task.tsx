"use client";

import Model from "@/components/model";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import TaskForm from "./task-form";

const NewTask = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Add New Task</Button>
      <Model
        title="
        Add New Task"
        description="Fill out the below form to add new task"
        open={open}
        setOpen={() => setOpen(!open)}
        className="max-w-[450px] lg:max-w-[600px]"
      >
        <TaskForm type="add" setOpen={setOpen} />
      </Model>
    </div>
  );
};

export default NewTask;
