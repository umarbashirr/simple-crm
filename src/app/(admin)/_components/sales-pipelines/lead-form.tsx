"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import DateInput from "@/components/date-input";
import SelectInput from "@/components/select-input";
import SelectWithSearch from "@/components/select-with-search";
import TextAreaInput from "@/components/text-area-input";
import TextInput from "@/components/text-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useEffect, useState } from "react";

const formSchema = z.object({
  stage: z.string().min(2),
  title: z.string().min(2),
  value: z.string(),
  notes: z.string().min(10),
  source: z.string(),
  status: z.string(),
  lastContactedAt: z.date(),
  contactId: z.string(),
});

interface LeadFormProps {
  lead?: any;
  type: "edit" | "add" | "view";
}

const LeadForm = ({ lead, type }: LeadFormProps) => {
  const [stages, setStages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stage: lead && lead?.stage && type !== "add" ? lead?.stage : "",
      title: lead && lead?.title && type !== "add" ? lead?.title : "",
      value:
        lead && lead?.value && type !== "add" ? lead?.value?.toString() : "",
      notes: lead && lead?.notes && type !== "add" ? lead?.notes : "",
      source: lead && lead?.source && type !== "add" ? lead?.source : "",
      status: lead && lead?.status && type !== "add" ? lead?.status : "",
      lastContactedAt:
        lead && lead?.lastContactedAt && type !== "add"
          ? lead?.lastContactedAt
          : "",
      contactId:
        lead && lead?.contactId && type !== "add" ? lead?.contactId?._id : "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // if type == edit we need to pass leadId as param
      const response = await fetch(
        `/api/leads${type === "edit" ? `?leadId=${lead?._id}` : ""}`,
        {
          method: type === "add" ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();

      if (!data?.success) {
        throw new Error(data?.message);
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      router.push("/sales-pipelines");
    }
  }

  const fetchStages = async () => {
    try {
      const response = await fetch("/api/stages");
      const data = await response.json();
      setStages(data?.data);
    } catch (error: any) {
      console.log(error);
    }
  };

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
    fetchStages();
    fetchContacts();
  }, []);

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
          className="col-span-2"
        />
        <SelectInput
          control={form.control}
          name="stage"
          label="Pipleline Stage"
          placeholder="Select stage"
          options={stages.map((el: any) => ({ key: el?.name, value: el?._id }))}
        />
        <TextInput
          control={form.control}
          name="value"
          label="Lead Value"
          type="string"
        />

        <SelectInput
          control={form.control}
          name="status"
          label="Status"
          placeholder="Select status"
          options={[
            { key: "Open", value: "open" },
            { key: "Closed", value: "closed" },
            { key: "In Progress", value: "progress" },
          ]}
          className="col-span-2"
        />
        <SelectInput
          control={form.control}
          name="source"
          label="Source"
          placeholder="Select source"
          options={[
            { key: "Email", value: "email" },
            { key: "Phone", value: "phone" },
            { key: "Social Media", value: "social" },
            { key: "Website", value: "website" },
          ]}
        />
        <DateInput
          control={form.control}
          name="lastContactedAt"
          label="Last Contacted At"
          placeholder="Select date"
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
          className="col-span-2 w-full"
        />
        <TextAreaInput
          control={form.control}
          name="notes"
          label="Notes"
          rows={5}
          className="col-span-2"
          inputClass="resize-none"
        />

        <Button type="submit" className="w-full col-span-2">
          {type === "add" ? "Add now" : "Update now"}
        </Button>
      </form>
    </Form>
  );
};

export default LeadForm;
