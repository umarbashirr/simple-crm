"use client";

import Model from "@/components/model";
import { useState } from "react";
import LeadForm from "./lead-form";
import { Badge } from "@/components/ui/badge";

const SingleLeadCard = ({ lead }: any) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div
        className="cursor-pointer bg-white rounded-md p-2"
        onClick={() => setOpen(true)}
      >
        <h4 className="font-bold mb-2">{lead?.title}</h4>
        <p className="text-sm text-muted-foreground">
          {lead?.notes || "No notes"}
        </p>
        <hr className="my-2" />
        <div className="flex items-center justify-between">
          <p className="font-semibold">
            ${lead?.value ? lead?.value.toLocaleString() : "0"}
          </p>
          <Badge variant="outline" className="capitalize">
            {lead?.status}
          </Badge>
        </div>
      </div>
      <Model
        title="Edit Lead"
        description="Change the below fields in order to update lead details"
        open={open}
        setOpen={() => setOpen(!open)}
        className="max-w-[450px] lg:max-w-[600px]"
      >
        <LeadForm type="edit" lead={lead} />
      </Model>
    </>
  );
};

export default SingleLeadCard;
