"use client";

import { useState } from "react";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { FileCheck2, Loader2 } from "lucide-react";
import { deleteUser } from "@/lib/action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const DeleteUserDialog = ({
  userId,
  alertIsOpen,
}: {
  userId: string;
  alertIsOpen: () => void;
}) => {
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const handleDelete = async (userId: string) => {
    setLoader(true);

    try {
      const user = await deleteUser(userId);
      if (user.success) {
        toast(user.message, {
          icon: <FileCheck2 />,
        });
        alertIsOpen();
        router.refresh();
      } else {
        toast.error(user.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Ada masalah yang tidak terduga");
    } finally {
      setLoader(false);
    }
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="w-full sm:w-1/6">
          Cancel
        </AlertDialogCancel>
        <Button
          variant={"destructive"}
          onClick={() => handleDelete(userId)}
          className="w-full sm:w-1/5"
          disabled={loader}
        >
          {loader ? <Loader2 className="animate-spin" /> : "Continue"}
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteUserDialog;
