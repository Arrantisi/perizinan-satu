import { User } from "@prisma/client";
import React, { useState } from "react";
import { TableCell, TableRow } from "../ui/table";
import { Avatar, AvatarFallback } from "../ui/avatar";
import getInitialName from "@/utils/fullName";
import formattedDate from "@/utils/date-format";
import DropdownTableData from "../dropdown/karyawan-dropdown-table";

const KaryawanRowTable = ({ user }: { user: User }) => {
  const [currentUser, setCurrenUser] = useState(user);

  const updateUser = (data: User) => {
    setCurrenUser(data);
  };

  return (
    <TableRow>
      <TableCell>
        <Avatar>
          <AvatarFallback>{getInitialName(currentUser.name)}</AvatarFallback>
        </Avatar>
      </TableCell>
      <TableCell className="capitalize">{currentUser.name}</TableCell>
      <TableCell>{currentUser.email}</TableCell>
      <TableCell>{currentUser.role}</TableCell>
      <TableCell>{formattedDate(currentUser.createdAt)}</TableCell>
      <TableCell>
        <DropdownTableData id={currentUser.id} onSuccess={updateUser} />
      </TableCell>
    </TableRow>
  );
};

export default KaryawanRowTable;
