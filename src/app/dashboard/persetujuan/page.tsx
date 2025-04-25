"use client";

import columns from "@/json/table-daftar.json";
import TableComponent from "@/components/table/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import getInitialName from "@/utils/fullName";
import StatusBadge from "@/components/status-badge";
import formattedDate from "@/utils/date-format";
import { ButtonSetuju, ButtonTolak } from "@/components/buttons";
import { useEffect, useState } from "react";
import { Leave, User } from "@prisma/client";
import { getLeave } from "@/lib/action";

type LeaveWithUserType = Leave & { user: User };

const PersetujuanPage = () => {
  const [menu, setMenu] = useState<LeaveWithUserType[]>([]);

  const fetchData = async () => {
    const data = await getLeave();
    setMenu(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Table Persetujuan Izin Cuti</CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore,
          quod.😊
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TableComponent columns={columns}>
          {menu.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Avatar>
                      <AvatarImage />
                      <AvatarFallback>
                        {getInitialName(item.user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h1 className="text-sm">{item.user.name}</h1>
                      <span className="text-xs text-muted-foreground">
                        {item.user.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {formattedDate(item.startDate)} -{" "}
                  {formattedDate(item.endDate)}
                </TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>
                  <StatusBadge status={item.status} />
                </TableCell>
                <TableCell className="truncate max-w-[10rem] hidden xl:table-cell">
                  {item.reason}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center gap-2">
                    <ButtonSetuju id={item.id} onSuccess={fetchData} />
                    <ButtonTolak id={item.id} onSuccess={fetchData} />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableComponent>
      </CardContent>
    </Card>
  );
};

export default PersetujuanPage;
