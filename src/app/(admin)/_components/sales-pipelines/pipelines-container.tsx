"use client";

import { useState } from "react";
import AddNewStage from "./add-new-stage";
import PipelineStage from "./pipeline-stage";

const PipelinesContainer = ({ stages }: any) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div className="p-[24px_24px_0px_24px] pipelines-wrapper  h-[calc(100vh-170px)]">
      <div className="pipeline-colums flex flex-nowrap gap-4 w-full max-w-full overflow-x-auto h-full">
        <>
          {stages?.map((col: any) => {
            return <PipelineStage key={col?._id} stage={col} />;
          })}
        </>

        <AddNewStage isActive={isActive} setIsActive={setIsActive} />
      </div>
    </div>
  );
};

export default PipelinesContainer;
