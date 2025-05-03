import DropdownTable from "@/components/dropdown/leave-dropdown-table";
import StatusBadge from "@/components/status-badge";
import BadgeEmptyTable from "@/components/table/badge-empty-table";
import { TableRow, TableCell } from "@/components/ui/table";
import { getLeave } from "@/lib/action";
import formattedDate from "@/utils/date-format";
import React from "react";

const TableLeave = async () => {
  const leaves = await getLeave();
  const leavePending = leaves.filter((leave) => leave.status !== "PENDING");

  if (!leavePending || leavePending.length === 0) {
    return <BadgeEmptyTable />;
  }

  return (
    <>
      {leavePending.map((leave) => {
        return (
          <TableRow key={leave.id}>
            <>
              <TableCell>
                {formattedDate(leave.startDate)} -{" "}
                {formattedDate(leave.endDate)}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {leave.type}
              </TableCell>
              <TableCell>
                <StatusBadge status={leave.status} />
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {leave?.reviewedBy}
              </TableCell>
              <TableCell className="max-w-[10rem] truncate hidden lg:table-cell">
                {leave.reason}
              </TableCell>
              <TableCell>
                <DropdownTable deleteType="hapus" id={leave.id} />
              </TableCell>
            </>
          </TableRow>
        );
      })}
    </>
  );
};

export default TableLeave;
