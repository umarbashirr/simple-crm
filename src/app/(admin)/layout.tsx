import { ReactNode } from "react";
import Sidebar from "./_components/sidebar";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-[#fafafa] h-full min-h-screen">
      <Sidebar />
      <div className="pl-56">{children}</div>
    </div>
  );
};

export default AdminLayout;
