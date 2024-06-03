"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import PipelineHeader from "./pipeline-header";
import SingleLeadCard from "./single-lead-card";

const PipelineStage = ({ stage }: any) => {
  const [leads, setLeads] = useState([]);

  const fetchLeadsForStage = async () => {
    try {
      const res = await fetch(`/api/leads?stageId=${stage?._id}`);

      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      setLeads(data?.data);
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLeadsForStage();
  }, []);

  return (
    <div
      className={cn(
        "pipeline-column bg-secondary py-2 px-4 rounded-md shadow-sm flex-shrink-0 w-[350px] h-fit"
      )}
    >
      <PipelineHeader stage={stage} leads={leads} />
      <div className="flex flex-col gap-4 mt-6">
        {leads.map((lead: any) => (
          <SingleLeadCard key={lead._id} lead={lead} />
        ))}
      </div>
    </div>
  );
};

export default PipelineStage;
