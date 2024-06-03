"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ButtonLoading } from "@/components/loading-button";
import TextInput from "@/components/text-input";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(50),
});

const SigninForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        body: JSON.stringify(values),
        credentials: "include",
      });

      const data = await response.json();

      if (data?.success) {
        toast({
          title: "Success",
          description: data?.message,
        });
        localStorage.setItem("_ult", data?.data);
        form.reset();
        router.push("/dashboard");
      } else {
        throw new Error(data?.message);
      }
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.message,
      });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <TextInput
          control={form.control}
          name="email"
          label="Email"
          placeholder="Enter your email"
          type="email"
        />
        <TextInput
          control={form.control}
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
        />
        <ButtonLoading className="w-full" isLoading={isLoading}>
          {isLoading ? "Please wait..." : "Sign in"}
        </ButtonLoading>
      </form>
    </Form>
  );
};

export default SigninForm;
