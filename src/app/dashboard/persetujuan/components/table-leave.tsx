import { ButtonSetuju, ButtonTolak } from "@/components/buttons";
import StatusBadge from "@/components/status-badge";
import { TableRow, TableCell } from "@/components/ui/table";
import { getAllLeave } from "@/lib/action";
import formattedDate from "@/utils/date-format";
import getInitialName from "@/utils/fullName";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import React from "react";

const TableLeave = async () => {
  const leaves = await getAllLeave();

  return (
    <>
      {leaves?.map((leave) => {
        return (
          <TableRow key={leave.id}>
            <TableCell>
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
            <TableCell>{leave.type}</TableCell>
            <TableCell>
              <StatusBadge status={leave.status} />
            </TableCell>
            <TableCell className="truncate max-w-[10rem] hidden xl:table-cell">
              {leave.reason}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center gap-2">
                <ButtonSetuju id={leave.id} />
                <ButtonTolak leaveId={leave.id} />
              </div>
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
};

export default TableLeave;
