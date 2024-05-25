import Logo from "@/components/logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import SigninForm from "../_components/signin-form";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 min-h-screen w-full max-w-screen-sm mx-auto p-6">
      <Logo />
      <Card>
        <CardHeader>
          <CardTitle>Login your account</CardTitle>
          <CardDescription>
            Welcome back! We are very happy to see you again
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SigninForm />
        </CardContent>
        <CardFooter className="text-sm flex items-center justify-center">
          Don&lsquo;t have an account?{" "}
          <Link
            href="/sign-up"
            className="text-indigo-600 hover:text-indigo-500 ml-1"
          >
            Sign up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
