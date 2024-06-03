import { cookies } from "next/headers";
import PipelinePageHeader from "../../_components/sales-pipelines/pipeline-page-header";
import PipelinesContainer from "../../_components/sales-pipelines/pipelines-container";

const fetchStages = async () => {
  try {
    const url = process.env.NEXT_PUBLIC_APP_URL + "/api/stages";
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        token: `${cookies().get("token")?.value}`,
      },
      cache: "no-store",
    });

    const data = await response.json();

    return data?.data;
  } catch (error: any) {
    console.error(error?.message);
  }
};

const Page = async () => {
  const stages = await fetchStages();
  return (
    <div className="overflow-hidden">
      <PipelinePageHeader />
      {/* Here we show the board of the pipelines */}
      <PipelinesContainer stages={stages} />
    </div>
  );
};

export default Page;
