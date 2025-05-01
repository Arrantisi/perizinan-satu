import DropdownTableData from "@/components/dropdown/karyawan-dropdown-table";
import { TableRow, TableCell } from "@/components/ui/table";
import { getUser } from "@/lib/action";
import formattedDate from "@/utils/date-format";
import getInitialName from "@/utils/fullName";
import { currentUser } from "@clerk/nextjs/server";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import React from "react";

const TableUser = async () => {
  const users = await getUser();
  const CurrentUser = await currentUser();

  const userLogin = users.filter((user) => user.id !== CurrentUser?.id);

  return (
    <>
      {userLogin.map((user) => (
        <TableRow key={user.id}>
          <TableCell>
            <Avatar>
              <AvatarFallback>{getInitialName(user.name)}</AvatarFallback>
            </Avatar>
          </TableCell>
          <TableCell className="capitalize">{user.name}</TableCell>
          <TableCell className="hidden lg:table-cell">{user.email}</TableCell>
          <TableCell className="hidden lg:table-cell">{user.role}</TableCell>
          <TableCell className="hidden lg:table-cell">
            {formattedDate(user.createdAt)}
          </TableCell>
          <TableCell>
            <DropdownTableData id={user.id} />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default TableUser;
