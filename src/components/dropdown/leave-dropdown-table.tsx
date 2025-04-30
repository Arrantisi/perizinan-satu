import { MoreHorizontalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import ViewDialog from "../dialog/view-dialog";
import { AlertDialog, AlertDialogTrigger } from "../ui/alert-dialog";
import DeleteDialog from "../dialog/delete-dialog";
const DropdownTable = ({
  deleteType = "hapus",
  id,
}: {
  id: string;
  deleteType: "hapus" | "batal";
}) => {
  return (
    <Dialog>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"}>
              <MoreHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DialogTrigger asChild>
              <DropdownMenuItem>Lihat</DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuSeparator />
            <AlertDialogTrigger asChild>
              <DropdownMenuItem variant="destructive">
                {deleteType === "hapus" ? "Hapus" : "Batalkan"}
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>

        <DeleteDialog leaveId={id} />
        <ViewDialog id={id} />
      </AlertDialog>
    </Dialog>
  );
};

export default DropdownTable;
