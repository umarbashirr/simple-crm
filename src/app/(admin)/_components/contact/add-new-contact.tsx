"use client";

import Model from "@/components/model";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ContactForm from "./contact-form";

const AddNewContact = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Add Contact</Button>
      <Model
        title="Add New Contact"
        description="Fill out the below form to add new contact"
        open={open}
        setOpen={() => setOpen(!open)}
        className="max-w-[450px] lg:max-w-[600px]"
      >
        <ContactForm type="add" />
      </Model>
    </div>
  );
};

export default AddNewContact;
