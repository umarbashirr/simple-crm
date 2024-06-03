"use client";

import AlertModal from "@/components/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PipelineHeader = ({ stage, leads }: any) => {
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const router = useRouter();

  const openDeleteAlert = () => {
    setOpenDeleteModal(true);
  };

  const deleteStageHandler = async () => {
    try {
      const response = await fetch("/api/stages?stageId=" + stage?._id, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!data?.success) {
        throw new Error(data?.message);
      }
      toast({
        title: "Success",
        description: data?.message,
      });
    } catch (error: any) {
      console.error(error.message);
      toast({
        variant: "destructive",
        title: "Oops!",
        description: error?.message,
      });
    } finally {
      router.refresh();
    }
  };

  const getTotalValue = () => {
    return leads?.reduce((acc: number, lead: any) => acc + lead?.value, 0);
  };

  return (
    <>
      <header className="relative">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 absolute top-0 right-0"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-[200px]">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer">
              Archive list
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={openDeleteAlert}
              className="cursor-pointer text-red-500"
            >
              Delete list
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center justify-start gap-2">
          <h3 className="text-primary text-lg font-semibold capitalize">
            {stage?.name}{" "}
          </h3>
          <div className="bg-gray-300 w-5 h-5  inline-flex items-center justify-center rounded-full text-gray-700 text-xs">
            {leads?.length || 0}
          </div>
        </div>
        <p className="text-muted-foreground text-sm">
          Total deals: ${getTotalValue() || 0}{" "}
        </p>
      </header>

      <AlertModal
        open={openDeleteModal}
        setOpen={() => setOpenDeleteModal(false)}
        onClick={deleteStageHandler}
      />
    </>
  );
};

export default PipelineHeader;
