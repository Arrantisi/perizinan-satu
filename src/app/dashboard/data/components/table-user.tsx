import DropdownTableData from "@/components/dropdown/karyawan-dropdown-table";
import { TableRow, TableCell } from "@/components/ui/table";
import { getUser } from "@/lib/action";
import formattedDate from "@/utils/date-format";
import getInitialName from "@/utils/fullName";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import React from "react";

const TableUser = async () => {
  const users = await getUser();

  return (
    <>
      {users.map((user) => (
        <TableRow key={user.id}>
          <TableCell>
            <Avatar>
              <AvatarFallback>{getInitialName(user.name)}</AvatarFallback>
            </Avatar>
          </TableCell>
          <TableCell className="capitalize">{user.name}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell>{user.role}</TableCell>
          <TableCell>{formattedDate(user.createdAt)}</TableCell>
          <TableCell>
            <DropdownTableData id={user.id} />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default TableUser;
