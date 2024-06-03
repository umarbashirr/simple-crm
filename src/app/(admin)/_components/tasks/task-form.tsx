"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import DateInput from "@/components/date-input";
import { ButtonLoading } from "@/components/loading-button";
import SelectInput from "@/components/select-input";
import TextAreaInput from "@/components/text-area-input";
import TextInput from "@/components/text-input";
import { Form } from "@/components/ui/form";
import { useEffect, useState } from "react";
import SelectWithSearch from "@/components/select-with-search";

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.string(),
  priority: z.string(),
  dueDate: z.date(),
  contactId: z.string(),
});

interface TaskFormProps {
  task?: any;
  type: "edit" | "add" | "view";
  setOpen: (value: boolean) => void;
}

const TaskForm = ({ task, type, setOpen }: TaskFormProps) => {
  const [contacts, setContacts] = useState<any[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      status: task?.status || "",
      priority: task?.priority || "",
      dueDate: task?.dueDate || "",
      contactId: task?.contactId || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    try {
      setLoading(true);
      const response = await fetch(
        `/api/tasks${type === "edit" ? "?taskId=" + task?._id : ""}`,
        {
          method: type === "add" ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();

      if (!data.success) throw new Error(data.message);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
      setOpen(false);
      router.refresh();
    }
  }

  const fetchContacts = async () => {
    try {
      const response = await fetch("/api/contact");
      const data = await response.json();
      setContacts(data?.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const statusOptions = [
    { value: "pending", key: "Pending" },
    { value: "in-progress", key: "In Progress" },
    { value: "completed", key: "Completed" },
  ];

  const priorityOptions = [
    { value: "low", key: "Low" },
    { value: "medium", key: "Medium" },
    { value: "high", key: "High" },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <TextInput
          control={form.control}
          name="title"
          label="Title"
          type="text"
          placeholder="Enter task title"
          className="col-span-2"
        />
        <SelectInput
          control={form.control}
          name="status"
          label="status"
          placeholder="Select status"
          options={statusOptions.map((el) => ({
            key: el?.key,
            value: el?.value,
          }))}
        />
        <SelectInput
          control={form.control}
          name="priority"
          label="priority"
          placeholder="Select priority"
          options={priorityOptions.map((el) => ({
            key: el?.key,
            value: el?.value,
          }))}
        />
        <DateInput
          control={form.control}
          name="dueDate"
          label="Due Date"
          placeholder="Select due date"
        />

        <SelectWithSearch
          form={form}
          control={form.control}
          name="contactId"
          label="Select Contact"
          placeholder="Select contact email"
          options={contacts.map((el: any) => ({
            label: el?.email,
            value: el?._id,
          }))}
          valueToSetFor="contactId"
          className=" w-full"
        />

        <TextAreaInput
          control={form.control}
          name="description"
          label="description"
          rows={5}
          className="col-span-2"
          inputClass="resize-none"
        />
        <ButtonLoading isLoading={loading} className="w-full col-span-2">
          {type === "add" ? "Add now" : "Update now"}
        </ButtonLoading>
      </form>
    </Form>
  );
};

export default TaskForm;
