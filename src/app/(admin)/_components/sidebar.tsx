"use client";

import Logo from "@/components/logo";
import { cn } from "@/lib/utils";
import { ADMIN_ROUTES } from "@/utils/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const path = usePathname();
  return (
    <div className="bg-white border-r fixed h-full w-full max-w-64 shadow-sm">
      <div className="h-16 flex items-center justify-start p-4 border-b">
        <Logo type="dark" />
      </div>
      <nav className="flex flex-col gap-1 p-2">
        {ADMIN_ROUTES.map((route) => {
          return (
            <Link
              href={route?.path}
              key={route?.label}
              className={cn(
                "p-2 capitalize font-normal rounded-md duration-300 ease-in-out transition-all group flex items-center justify-start gap-2",
                path === route?.path
                  ? "bg-primary text-secondary"
                  : "bg-transparent hover:bg-slate-200 text-primary"
              )}
            >
              {route?.icon && route?.icon}
              <span>{route?.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
