import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import jwt from "jsonwebtoken";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const token = cookies().get("token")?.value || "";

  if (token) {
    const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);

    console.log(decodedToken);

    if (decodedToken) {
      return redirect("/dashboard");
    }
  } else {
    return <div>{children}</div>;
  }
};

export default AuthLayout;
