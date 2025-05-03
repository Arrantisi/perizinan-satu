"use client";

import { ComponentPropsWithRef, useState } from "react";
import { Button } from "./ui/button";
import { FileCheck2Icon, Loader2 } from "lucide-react";
import { persetujuan } from "@/lib/action";
import { toast } from "sonner";
import { ButtonPesetujuanInter } from "@/types";
import { useRouter } from "next/navigation";
import AlertRejectedDialog from "./dialog/alert-rejected-dialog";
import { AlertDialog, AlertDialogTrigger } from "./ui/alert-dialog";

export const ButtonLoader = ({
  ...props
}: ComponentPropsWithRef<typeof Button>) => {
  return (
    <Button {...props} disabled>
      <Loader2 className="animate-spin" />
    </Button>
  );
};

export const ButtonSetuju = ({
  leaveId,
  onSuccess,
  ...props
}: ButtonPesetujuanInter) => {
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const handlePersetujuan = async (leaveId: string) => {
    setLoader(true);

    try {
      const leave = await persetujuan(leaveId);
      if (leave.success) {
        toast(leave.message, {
          icon: <FileCheck2Icon />,
        });
        onSuccess();
        router.refresh();
      } else {
        toast.error("masalah pada server");
        console.error(leave.message);
      }
    } catch (error) {
      toast.error("Ada masalah yang tidak terduga");
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  return loader ? (
    <ButtonLoader className="w-1/2" />
  ) : (
    <Button
      onClick={() => {
        handlePersetujuan(leaveId);
      }}
      {...props}
    >
      Setuju
    </Button>
  );
};

export const ButtonTolak = ({
  leaveId,
  onSuccess,
  ...props
}: ButtonPesetujuanInter) => {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant={"destructive"}
          onClick={() => {
            setOpen(true);
          }}
          {...props}
        >
          Tolak
        </Button>
      </AlertDialogTrigger>
      <AlertRejectedDialog
        leaveId={leaveId}
        onSuccess={() => {
          setOpen(false);
          onSuccess();
        }}
      />
    </AlertDialog>
  );
};
