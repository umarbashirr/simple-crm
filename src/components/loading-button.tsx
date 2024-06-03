import { ReloadIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ButtonLoadingProps {
  isLoading?: boolean;
  children: ReactNode;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export function ButtonLoading({
  isLoading = false,
  children,
  className,
  variant = "default",
  size = "default",
}: ButtonLoadingProps) {
  return (
    <Button
      disabled={isLoading}
      className={cn("flex items-center space-x-2", className)}
      variant={variant}
      size={size}
    >
      {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
