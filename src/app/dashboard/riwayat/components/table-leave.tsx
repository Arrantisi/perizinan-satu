import DropdownTable from "@/components/dropdown/leave-dropdown-table";
import StatusBadge from "@/components/status-badge";
import { TableRow, TableCell } from "@/components/ui/table";
import { getLeave } from "@/lib/action";
import formattedDate from "@/utils/date-format";
import React from "react";

const TableLeave = async () => {
  const leaves = await getLeave();

  return (
    <>
      {leaves.map((leave) => {
        return (
          <TableRow key={leave.id}>
            {leave.status !== "PENDING" && (
              <>
                <TableCell className="hidden md:table-cell">
                  {formattedDate(leave.startDate)} -{" "}
                  {formattedDate(leave.endDate)}
                </TableCell>
                <TableCell>{leave.type}</TableCell>
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
            )}
          </TableRow>
        );
      })}
    </>
  );
};

export default TableLeave;
