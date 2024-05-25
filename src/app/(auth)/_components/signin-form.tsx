"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import TextInput from "@/components/text-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(50),
});

const SigninForm = () => {
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
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        body: JSON.stringify(values),
        credentials: "include",
      });

      const data = await response.json();

      if (data?.success) {
        localStorage.setItem("_ult", data?.data);
        form.reset();
        router.push("/dashboard");
      } else {
        throw new Error(data?.message);
      }
    } catch (error) {
      console.error(error);
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
        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </form>
    </Form>
  );
};

export default SigninForm;
