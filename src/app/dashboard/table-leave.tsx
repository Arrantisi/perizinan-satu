import DropdownTable from "@/components/dropdown/leave-dropdown-table";
import StatusBadge from "@/components/status-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableCell, TableRow } from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import formattedDate from "@/utils/date-format";
import getInitialName from "@/utils/fullName";
import React from "react";

const LeaveTable = async () => {
  const leaves = await prisma.leave.findMany({
    include: { user: true },
  });

  return (
    <>
      {leaves.map((leave) => {
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
            <TableCell className="hidden md:table-cell">
              {formattedDate(leave.startDate)} - {formattedDate(leave.endDate)}
            </TableCell>
            <TableCell className="hidden lg:table-cell">{leave.type}</TableCell>
            <TableCell>
              <StatusBadge status={leave.status} />
            </TableCell>
            <TableCell className="max-w-[10rem] truncate hidden xl:table-cell">
              {leave.reason}
            </TableCell>
            <TableCell>
              <DropdownTable deleteType="hapus" id={leave.id} />
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
};

export default LeaveTable;
