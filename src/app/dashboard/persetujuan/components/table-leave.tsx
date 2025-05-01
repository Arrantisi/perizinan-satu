import StatusBadge from "@/components/status-badge";
import { TableRow, TableCell } from "@/components/ui/table";
import { getAllLeave } from "@/lib/action";
import formattedDate from "@/utils/date-format";
import getInitialName from "@/utils/fullName";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import DialogPersetujuan from "@/components/dialog/dialog-persetujuan";
import { Badge } from "@/components/ui/badge";

const TableLeave = async () => {
  const leaves = await getAllLeave();
  const pendingLeaves = leaves.filter((leave) => leave.status === "PENDING");

  if (!pendingLeaves || pendingLeaves.length === 0) {
    return (
      <TableRow className="hover:bg-card">
        <TableCell colSpan={9} className="text-center">
          <Badge variant={"destructive"} className="my-7 dark:bg-red-700 p-1">
            Tidak ada surat perizinan
          </Badge>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {pendingLeaves?.map((leave) => {
        return (
          <TableRow key={leave.id}>
            <TableCell className="hidden md:table-cell">
              <div className="flex items-center gap-1">
                <Avatar>
                  <AvatarImage />
                  <AvatarFallback>
                    {getInitialName(leave.user.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-sm">{leave.user.name}</h1>
                  <span className="text-xs text-muted-foreground">
                    {leave.user.email}
                  </span>
                </div>
              </div>
            </TableCell>
            <TableCell>
              {formattedDate(leave.startDate)} - {formattedDate(leave.endDate)}
            </TableCell>
            <TableCell className="hidden lg:table-cell">{leave.type}</TableCell>
            <TableCell className="hidden lg:table-cell">
              <StatusBadge status={leave.status} />
            </TableCell>
            <TableCell className="truncate max-w-[10rem] hidden xl:table-cell">
              {leave.reason}
            </TableCell>
            <TableCell className="text-right">
              <DialogPersetujuan leaveId={leave.id} />
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
};

export default TableLeave;
