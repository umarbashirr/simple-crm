"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import SelectInput from "@/components/select-input";
import TextAreaInput from "@/components/text-area-input";
import TextInput from "@/components/text-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { countryList } from "@/utils/countries";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  zipCode: z.string().optional(),
  notes: z.string().optional(),
});

interface ContactFormProps {
  contact?: any;
  type: "edit" | "add" | "view";
}

const ContactForm = ({ contact, type }: ContactFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: contact && contact?.name && type !== "add" ? contact?.name : "",
      email: contact && contact?.email && type !== "add" ? contact?.email : "",
      phone: contact && contact?.phone && type !== "add" ? contact?.phone : "",
      addressLine1:
        contact && contact?.address?.addressLine1 && type !== "add"
          ? contact?.address?.addressLine1
          : "",
      addressLine2:
        contact && contact?.address?.addressLine2 && type !== "add"
          ? contact?.address?.addressLine2
          : "",
      city:
        contact && contact?.address?.city && type !== "add"
          ? contact?.address?.city
          : "",
      state:
        contact && contact?.address?.state && type !== "add"
          ? contact?.address?.state
          : "",
      country:
        contact && contact?.address?.country && type !== "add"
          ? contact?.address?.country
          : "",
      zipCode:
        contact && contact?.address?.zipCode && type !== "add"
          ? contact?.address?.zipCode
          : "",
      notes: contact && contact?.notes && type !== "add" ? contact?.notes : "",
    },
  });

  console.log(contact);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formValues = {
      name: values?.name,
      email: values?.email,
      phone: values?.phone,
      address: {
        addressLine1: values?.addressLine1,
        addressLine2: values?.addressLine2,
        city: values?.city,
        state: values?.state,
        country: values?.country,
        zipCode: values?.zipCode,
      },
      notes: values?.notes,
    };

    try {
      let response;
      if (type === "add") {
        response = await fetch("/api/contact", {
          method: "POST",
          body: JSON.stringify(formValues),
        });
      } else {
        response = await fetch("/api/contact?contactId=" + contact?._id, {
          method: "PUT",
          body: JSON.stringify(formValues),
        });
      }

      const data = await response.json();

      if (!data?.success) {
        throw new Error(data?.message);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <TextInput
          control={form.control}
          name="name"
          label="Name"
          type="text"
          className="col-span-2"
        />
        <TextInput
          control={form.control}
          name="email"
          label="Email"
          type="email"
        />
        <TextInput
          control={form.control}
          name="phone"
          label="Phone"
          type="tel"
        />
        <TextInput
          control={form.control}
          name="addressLine1"
          label="Address Line 1"
          type="text"
        />
        <TextInput
          control={form.control}
          name="addressLine2"
          label="Address Line 2"
          type="text"
        />
        <TextInput
          control={form.control}
          name="city"
          label="City"
          type="text"
        />
        <TextInput
          control={form.control}
          name="state"
          label="state"
          type="text"
        />
        <SelectInput
          control={form.control}
          name="country"
          label="Country"
          placeholder="Select country"
          options={countryList.map((el) => ({ key: el, value: el }))}
        />
        <TextInput
          control={form.control}
          name="zipCode"
          label="ZipCode"
          type="text"
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

export default ContactForm;
