import DropdownTable from "@/components/dropdown/leave-dropdown-table";
import StatusBadge from "@/components/status-badge";
import BadgeEmptyTable from "@/components/table/badge-empty-table";
import { TableCell, TableRow } from "@/components/ui/table";
import { getLeave } from "@/lib/action";
import formattedDate from "@/utils/date-format";
import React from "react";

const TableLave = async () => {
  const leaves = await getLeave();

  if (leaves.length === 0) return <BadgeEmptyTable />;

  return (
    <>
      {leaves?.map((leave) => (
        <TableRow key={leave.id}>
          <TableCell className="hidden md:table-cell">
            {formattedDate(leave.startDate)} - {formattedDate(leave.endDate)}
          </TableCell>
          <TableCell>{leave.type}</TableCell>
          <TableCell>
            <StatusBadge status={leave.status} />
          </TableCell>
          <TableCell className="truncate max-w-[10rem] hidden lg:table-cell">
            {leave.reasonRejected || "-"}
          </TableCell>
          <TableCell className="truncate max-w-[10rem] hidden lg:table-cell">
            {formattedDate(leave.createdAt)}
          </TableCell>
          <TableCell>
            <DropdownTable deleteType="batal" id={leave.id} />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default TableLave;
