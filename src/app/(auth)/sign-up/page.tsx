import Logo from "@/components/logo";
import SignupForm from "../_components/signup-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 min-h-screen w-full max-w-screen-sm mx-auto p-6">
      <Logo />
      <Card>
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Join us now and start managing your business with us
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
        <CardFooter className="text-sm  flex items-center justify-center">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-indigo-600 hover:text-indigo-500 ml-1"
          >
            Sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
