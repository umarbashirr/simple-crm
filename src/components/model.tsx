"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface ModelProps {
  title: string;
  description: string;
  children: ReactNode;
  open: boolean;
  setOpen: () => void;
  className?: string;
}

const Model = ({
  title,
  description,
  children,
  open,
  setOpen,
  className,
}: ModelProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={cn("rounded-xl", className)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Model;
