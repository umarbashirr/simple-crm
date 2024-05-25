"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon, RocketIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const params = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const token = params.get("token");

  const verifyEmail = async () => {
    try {
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        body: JSON.stringify({ token: token }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      verifyEmail();
    }
  }, [token]);

  if (isLoading && !isSuccess) {
    return <div>Loading...</div>;
  }

  if (!isLoading && !isSuccess) {
    return (
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Oops! Unable to verify your email</AlertDescription>
      </Alert>
    );
  }

  if (!isLoading && isSuccess) {
    return (
      <div className="flex items-center justify-center min-h-screen p-8 max-w-screen-sm mx-auto">
        <Alert>
          <RocketIcon className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            Email verified successfully!{" "}
            <Link href="/sign-in" className="underline underline-offset-2">
              Sign in now
            </Link>
          </AlertDescription>
        </Alert>
      </div>
    );
  }
};

export default Page;
