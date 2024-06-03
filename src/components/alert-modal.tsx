"use client";

import { useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

interface AlertModalProps {
  open: boolean;
  setOpen: () => void;
  title?: string;
  description?: string;
  cancelButtonText?: string;
  okButtonText?: string;
  onClick: () => void;
  setNoDrag?: (value: boolean) => void;
  cancelHandler?: () => void;
}

const AlertModal = ({
  open,
  setOpen,
  title,
  description,
  setNoDrag,
  onClick,
  cancelHandler,
  okButtonText = "Continue",
  cancelButtonText = "Cancel",
}: AlertModalProps) => {
  useEffect(() => {
    if (open && setNoDrag) {
      setNoDrag(true);
    }
  }, []);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="z-50">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title ? title : "Are you absolutely sure?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {description
              ? description
              : "This action cannot be undone. This will permanently delete your account and remove your data from our servers."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={cancelHandler}>
            {cancelButtonText}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onClick}>
            {okButtonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertModal;
