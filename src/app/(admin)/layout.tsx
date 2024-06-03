import { ReactNode } from "react";
import Sidebar from "./_components/sidebar";
import Header from "./_components/header";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import DrawerProvider from "@/providers/DrawerProvider";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const token = cookies().get("token")?.value || "";

  if (!token) {
    redirect("/sign-in");
  }

  const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);

  if (!decodedToken) {
    return redirect("/sign-in");
  }

  return (
    <DrawerProvider>
      <div className="bg-white h-full min-h-screen">
        <Sidebar />
        <div className="pl-64">
          <Header />
          {children}
        </div>
      </div>
    </DrawerProvider>
  );
};

export default AdminLayout;
