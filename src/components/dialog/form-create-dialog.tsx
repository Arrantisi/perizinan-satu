"use client";

import { Loader2, Plus, UserPlus2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../ui/dialog";
import { useForm } from "react-hook-form";
import {
  createUserAndInviteSchema,
  CreateUserAndInviteSchemaType,
} from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { createUserAndInvite } from "@/lib/action";
import { useState } from "react";
import { useRouter } from "next/navigation";

const FormCreateDialog = () => {
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const form = useForm<CreateUserAndInviteSchemaType>({
    resolver: zodResolver(createUserAndInviteSchema),
    defaultValues: {
      email: "",
      firsName: "",
      lastName: "",
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = async (value: CreateUserAndInviteSchemaType) => {
    setLoader(true);
    try {
      const createuser = await createUserAndInvite(value);
      if (createuser.success) {
        toast(createuser.message, {
          icon: <UserPlus2 />,
        });

        form.reset();
        setOpen(false);
      } else {
        toast.error(createuser.message);
      }
      router.refresh();
    } catch (error) {
      toast.error("ada masalah pada server");
      console.log({ error });
    } finally {
      setLoader(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="mr-10"
          variant={"outline"}
          onClick={() => setOpen(true)}
        >
          <Plus size={30} />
          Buat User
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Form Membuat user</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non,
            minima?
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex justify-center items-center gap-4 my-4 ">
                <FormField
                  control={control}
                  name="firsName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Nama Depan</FormLabel>
                      <FormControl>
                        <Input placeholder="Joe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Nama belakang</FormLabel>
                      <FormControl>
                        <Input placeholder="McGuire" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="es@bah.gb" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button variant={"outline"} className="w-full lg:w-1/6">
                    Tutup
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  className="w-full lg:w-1/6"
                  disabled={loader}
                >
                  {loader ? <Loader2 className="animate-spin" /> : "Buat"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FormCreateDialog;
