import { cookies } from "next/headers";
import NewTask from "../../_components/tasks/new-task";
import TaskContainer from "../../_components/tasks/task-container";

const fetchContact = async () => {
  try {
    const url = process.env.NEXT_PUBLIC_APP_URL + "/api/tasks";
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        token: `${cookies().get("token")?.value}`,
      },
    });

    const data = await response.json();

    return data?.data;
  } catch (error: any) {
    console.error(error?.message);
  }
};

const Page = async () => {
  const tasks = await fetchContact();
  return (
    <div className="p-6">
      <div className="flex items-end justify-between mb-4">
        <div>
          <h1 className="font-bold text-xl">Tasks</h1>
          <p className="text-sm text-muted-foreground">
            Manage all your tasks here
          </p>
        </div>
        <NewTask />
      </div>
      <TaskContainer tasks={tasks} />
    </div>
  );
};

export default Page;
