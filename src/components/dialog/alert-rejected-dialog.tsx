"use client";

import { useForm } from "react-hook-form";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { rejectedSchema, RejectedSchemaType } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";
import { tolakLeave } from "@/lib/action";
import { FileX2Icon, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

const AlertRejectedDialog = ({
  leaveId,
  onSuccess,
}: {
  leaveId: string;
  onSuccess: () => void;
}) => {
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const form = useForm<RejectedSchemaType>({
    resolver: zodResolver(rejectedSchema),
    defaultValues: {
      reasonRejected: "",
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = async (value: RejectedSchemaType) => {
    setLoader(true);

    try {
      const leave = await tolakLeave(leaveId, value);

      if (leave.success) {
        toast(leave.message, {
          icon: <FileX2Icon />,
        });
        form.reset();
        onSuccess();
        router.refresh();
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

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <div className="my-4">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField
              control={control}
              name="reasonRejected"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>alasan menolak</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>
                    Surat izin ditolak karena alasan yang tidak sesuai dengan
                    kebijakan perusahaan.
                  </FormDescription>
                </FormItem>
              )}
            />
            <AlertDialogFooter className="mt-4">
              <AlertDialogCancel>Batalkan</AlertDialogCancel>
              <Button
                type="submit"
                variant={"destructive"}
                className="w-20"
                disabled={loader}
              >
                {loader ? <Loader2 className="animate-spin" /> : "Tolak"}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </div>
    </AlertDialogContent>
  );
};

export default AlertRejectedDialog;
