"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { BellIcon, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const logoutHandler = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      const data = await response.json();

      if (!data?.success) {
        throw new Error(data?.message);
      }

      toast({
        title: "Success",
        description: data?.message,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Oops!",
        description: error?.message,
      });
    } finally {
      router.replace("/sign-in");
    }
  };

  return (
    <div className="px-6 border-b h-16 flex items-center justify-between w-full">
      <div className="w-full">
        <div className="flex items-center justify-start w-full max-w-[400px] bg-transparent border rounded-md gap-2 px-2">
          <SearchIcon size={18} className="text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search contact or lead..."
            className="outline-none border-none focus-visible:outline-none focus-visible:border-none shadow-none px-0 focus-visible:ring-0"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" className="bg-transparent">
          Feedback
        </Button>
        <Button size="icon" variant="outline" className="bg-transparent">
          <BellIcon size={18} />
        </Button>
        <Button onClick={logoutHandler}>Logout</Button>
      </div>
    </div>
  );
};

export default Header;
