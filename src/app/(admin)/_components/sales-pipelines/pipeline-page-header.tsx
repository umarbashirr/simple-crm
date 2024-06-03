"use client";

import React from "react";
import AddLead from "./add-lead";

const PipelinePageHeader = () => {
  return (
    <div className="flex items-end justify-between mb-4 p-[24px_24px_0px_24px]">
      <div>
        <h1 className="font-bold text-xl">Sales Pipeline</h1>
        <p className="text-sm text-muted-foreground">
          Manage your sales pipeline here
        </p>
      </div>
      <AddLead />
    </div>
  );
};

export default PipelinePageHeader;
