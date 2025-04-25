"use client";

import { ComponentPropsWithRef, useState } from "react";
import { Button } from "./ui/button";
import { FileCheck2Icon, FileX2Icon, Loader2 } from "lucide-react";
import { persetujuan, tolakLeave } from "@/lib/action";
import { toast } from "sonner";
import { ButtonPesetujuanInter } from "@/types";

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
  id,
  onSuccess,
  ...props
}: ButtonPesetujuanInter) => {
  const [loader, setLoader] = useState(false);

  const handlePersetujuan = async (id: string) => {
    setLoader(true);

    try {
      const leave = await persetujuan(id);
      if (leave.success) {
        toast(leave.message, {
          icon: <FileCheck2Icon />,
        });
        onSuccess?.();
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

export const ButtonTolak = ({
  id,
  onSuccess,
  ...props
}: ButtonPesetujuanInter) => {
  const [loader, setLoader] = useState(false);

  const handlePenolakan = async (id: string) => {
    setLoader(true);

    console.log(id);
    try {
      const leave = await tolakLeave(id);

      if (leave.success) {
        toast(leave.message, {
          icon: <FileX2Icon />,
        });
        onSuccess?.();
      } else {
        toast.error("Masalah di server");
        console.error(leave.message);
      }
    } catch (error) {
      toast.error("Ada sedikit masalah yang tidak terduga");
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  return loader ? (
    <ButtonLoader variant="destructive" className="w-1/3" />
  ) : (
    <Button
      onClick={() => handlePenolakan(id)}
      variant={"destructive"}
      className="w-1/3"
      {...props}
    >
      Tolak
    </Button>
  );
};
