"use client";

import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import ViewDialogKaryawan from "../dialog/view-karyawan-dialog";
import KaryawanUpdateDialog from "../dialog/karyawan-update-dialog";
import { useState } from "react";
import { AlertDialog, AlertDialogTrigger } from "../ui/alert-dialog";
import DeleteUserDialog from "../dialog/delete-user-dialog";

const DropdownTableData = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"view" | "update" | null>(null);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"}>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DialogTrigger asChild onClick={() => setDialogType("view")}>
              <DropdownMenuItem>Lihat</DropdownMenuItem>
            </DialogTrigger>
            <DialogTrigger
              asChild
              onClick={() => {
                setDialogType("update");
                setOpen(true);
              }}
            >
              <DropdownMenuItem>update role</DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuSeparator />
            <AlertDialogTrigger asChild>
              <DropdownMenuItem variant="destructive">Hapus</DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        {dialogType === "view" ? (
          <ViewDialogKaryawan id={id} />
        ) : (
          <KaryawanUpdateDialog id={id} onClose={() => setOpen(false)} />
        )}
        <DeleteUserDialog userId={id} />
      </AlertDialog>
    </Dialog>
  );
};

export default DropdownTableData;
