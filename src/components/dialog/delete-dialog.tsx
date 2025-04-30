"use client";

import { toast } from "sonner";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { deleteLeave } from "@/lib/action";
import { useState } from "react";
import { FileMinus2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const DeleteDialog = ({ leaveId }: { leaveId: string }) => {
  const [loader, setLoader] = useState(false);

  const router = useRouter();

  const handleDelete = async () => {
    setLoader(true);
    try {
      const deleteLeaveById = await deleteLeave(leaveId);
      console.log(deleteLeaveById);

      if (deleteLeaveById.success) {
        toast(deleteLeaveById.message, {
          icon: <FileMinus2 />,
        });
      }
    } catch (error) {
      toast.error("ada kesalah yang tidak terduga");
      console.error("kesalahan yang tidak terduga: " + error);
    } finally {
      setLoader(false);
      router.refresh();
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
        <Button
          variant={"destructive"}
          className="w-20"
          onClick={() => handleDelete()}
        >
          {loader ? <Loader2 className="animate-spin" /> : "Hapus"}
        </Button>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteDialog;
