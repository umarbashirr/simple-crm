"use client";

import Model from "@/components/model";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import LeadForm from "./lead-form";

const AddLead = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>New Lead</Button>
      <Model
        title="Add New Lead"
        description="Enter the details of a potential client to start tracking their journey.
        "
        open={open}
        setOpen={() => setOpen(!open)}
        className="max-w-[450px] lg:max-w-[600px]"
      >
        <LeadForm type="add" />
      </Model>
    </div>
  );
};

export default AddLead;
