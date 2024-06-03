"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useDrawer } from "@/providers/DrawerProvider";

interface DrawerProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function Drawer({ title, description, children }: DrawerProps) {
  const { open, setOpen } = useDrawer();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription className="-mt-2">{description}</SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
}
