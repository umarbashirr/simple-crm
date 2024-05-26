"use client";

import Logo from "@/components/logo";
import { cn } from "@/lib/utils";
import { ADMIN_ROUTES } from "@/utils/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const path = usePathname();
  return (
    <div className="bg-white fixed h-full w-full max-w-56 shadow-sm">
      <div className="flex items-center justify-start p-4 border-b">
        <Logo />
      </div>
      <nav className="flex flex-col gap-1 p-2">
        {ADMIN_ROUTES.map((route) => {
          return (
            <Link
              href={route?.path}
              key={route?.label}
              className={cn(
                "p-2 capitalize rounded-md duration-300 ease-in-out transition-all",
                path === route?.path
                  ? "bg-primary text-white"
                  : "bg-transparent hover:bg-slate-200"
              )}
            >
              {route?.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
