"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { ContactProps } from "./contact-columns";
import Model from "@/components/model";
import NewContactForm from "./contact-form";

const ContactDropdown = ({ contact }: { contact: ContactProps }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[200px]">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => navigator.clipboard.writeText(contact.email)}
          >
            Copy email
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            View contact
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setOpen(true)}
          >
            Edit contact
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Model
        title="Edit Contact"
        description="Change the below fields in order to update contact details"
        open={open}
        setOpen={() => setOpen(!open)}
        className="max-w-[450px] lg:max-w-[600px]"
      >
        <NewContactForm type="edit" contact={contact} />
      </Model>
    </>
  );
};

export default ContactDropdown;
