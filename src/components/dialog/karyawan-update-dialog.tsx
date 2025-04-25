import { Mail, User2, UserCog2 } from "lucide-react";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { getUserById, updateUserRole } from "@/lib/action";
import { useForm } from "react-hook-form";
import { karyawanSchema, KaryawanSchemaType } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { ButtonLoader } from "../buttons";
import { Input } from "../ui/input";

const KaryawanUpdateDialog = ({
  id,
  onClose,
  onSuccess,
}: {
  id: string;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess?: (data: any) => void;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchUser = async (id: string) => {
      const data = await getUserById(id);
      setUser(data);
    };

    fetchUser(id);
  }, [id]);

  const form = useForm<KaryawanSchemaType>({
    resolver: zodResolver(karyawanSchema),
    defaultValues: {
      role: user?.role,
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = async (value: KaryawanSchemaType) => {
    setLoader(true);

    try {
      const updateRole = await updateUserRole(id, value);

      if (updateRole.success) {
        const updateUser = await getUserById(id);
        onSuccess?.(updateUser);
        toast(updateRole.message, {
          icon: <UserCog2 />,
        });
        onClose();
      } else {
        toast.error("Masalah di server");
      }
    } catch (error) {
      toast.error("Ada maslah yang tidak terduga");
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <DialogContent>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>update role karyawan</DialogTitle>
            <DialogDescription>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur,
              pariatur!
            </DialogDescription>
          </DialogHeader>
          <div className="grid my-8 gap-4">
            {/* LEFT */}

            <div className="grid-cols-4 grid items-center">
              <div className="flex items-center gap-3">
                <User2 size={16} />
                Nama
              </div>
              <Input
                defaultValue={user?.name}
                disabled
                className="col-span-3"
              />
            </div>
            <div className="grid-cols-4 grid items-center">
              <div className="flex items-center gap-3">
                <Mail size={16} />
                Email
              </div>
              <Input
                defaultValue={user?.email}
                className="col-span-3"
                disabled
              />
            </div>
            <div className="grid-cols-4 grid items-center">
              <div className="flex items-center gap-3">
                <UserCog2 size={16} />
                Role
              </div>
              <div className="col-span-3">
                <FormField
                  control={control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder={user?.role} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="BOSS">BOSS</SelectItem>
                          <SelectItem value="EMPLOYEE">EMPLOYEE</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            {!loader ? (
              <Button type="submit" className="w-1/4">
                Submit
              </Button>
            ) : (
              <ButtonLoader className="w-1/4 cursor-progress" />
            )}
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default KaryawanUpdateDialog;
