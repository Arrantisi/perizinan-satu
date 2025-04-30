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

export const ButtonSetuju = ({ id, ...props }: ButtonPesetujuanInter) => {
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const handlePersetujuan = async (id: string) => {
    setLoader(true);

    try {
      const leave = await persetujuan(id);
      if (leave.success) {
        toast(leave.message, {
          icon: <FileCheck2Icon />,
        });
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
    <ButtonLoader className="w-1/3" />
  ) : (
    <Button onClick={() => handlePersetujuan(id)} className="w-1/3" {...props}>
      Setuju
    </Button>
  );
};

export const ButtonTolak = ({ leaveId }: { leaveId: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant={"destructive"}
          className="w-1/3"
          onClick={() => setOpen(true)}
        >
          Tolak
        </Button>
      </AlertDialogTrigger>
      <AlertRejectedDialog leaveId={leaveId} onSuccess={() => setOpen(false)} />
    </AlertDialog>
  );
};
