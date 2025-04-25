"use client";

import { AjukanScemaType, ajukanSchema } from "@/schema";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Calendar1Icon, FileCheck2Icon, Loader2 } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { ajukanIzin } from "@/lib/action";
import { useState } from "react";

const AjukanForm = () => {
  const [loader, setLoader] = useState(false);

  const form = useForm<AjukanScemaType>({
    resolver: zodResolver(ajukanSchema),
    defaultValues: {
      dateRange: {
        from: new Date(),
        to: new Date(),
      },
      type: "",
      reason: "",
      status: "PENDING",
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (values: AjukanScemaType) => {
    try {
      setLoader(true);
      await ajukanIzin(values);
      toast("Pengajuan sudah berhasil terkirim", {
        icon: <FileCheck2Icon />,
      });
    } catch (error) {
      toast.error("Perizinan tidak bisa di ajukan");
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            control={control}
            name="dateRange"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tanggal</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <Calendar1Icon className="mr-2 h-4 w-4 opacity-50" />
                        {field.value ? (
                          field.value?.to ? (
                            <>
                              {format(field.value.from, "LLL dd, y")} -{" "}
                              {format(field.value.to, "LLL dd, y")}
                            </>
                          ) : (
                            <>{format(field.value.from, "LLL dd, y")}</>
                          )
                        ) : (
                          <span>Pilih tanggal</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jenis Izin</FormLabel>
                <FormControl>
                  <Input
                    placeholder="sakit atau ada masalah pribadi"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reason</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="alasan kamu cuti"
                    className="resize-none "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input defaultValue={field.value} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {loader ? (
            <Button type="submit" className=" w-[8rem]" disabled>
              <Loader2 className="animate-spin" />
            </Button>
          ) : (
            <Button type="submit" className=" w-[8rem]">
              Submit
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default AjukanForm;
