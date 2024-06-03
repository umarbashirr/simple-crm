"use client";

import TextInput from "@/components/text-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface AddNewStageProps {
  isActive: boolean;
  setIsActive: (value: boolean) => void;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

const AddNewStage = ({ isActive, setIsActive }: AddNewStageProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/api/stages", {
        method: "POST",
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!data?.success) {
        throw new Error(data?.message);
      }

      toast({
        title: "Success",
        description: data?.message,
      });

      router.refresh();
      form.reset();
    } catch (error: any) {
      console.error(error?.message);
      toast({
        variant: "destructive",
        title: "Oops!",
        description: error?.message,
      });
    } finally {
      setIsLoading(false);
      setIsActive(false);
    }
  };

  const closeForm = () => {
    setIsActive(false);
    form.reset();
    form.clearErrors();
  };

  return (
    <div className=" p-2 bg-secondary h-max rounded-md shadow-sm min-w-[350px] flex-shrink-0">
      {!isActive ? (
        <Button
          variant="secondary"
          className="p-0 shadow-none flex items-center justify-start gap-2 w-full"
          onClick={() => setIsActive(true)}
        >
          <PlusIcon size={16} />
          Add New Stage
        </Button>
      ) : (
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2 bg-transparent"
            >
              <TextInput
                name="name"
                placeholder="Enter stage title..."
                className="bg-white"
                control={form.control}
                type="text"
              />
              <div className="flex items-center justify-start gap-2">
                <Button type="submit">Add Stage</Button>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={closeForm}
                  className="shadow-none"
                >
                  <X />
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default AddNewStage;
