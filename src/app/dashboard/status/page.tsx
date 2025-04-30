"use client";

import StatusBadge from "@/components/status-badge";
import DropdownTable from "@/components/dropdown/leave-dropdown-table";
import TableComponent from "@/components/table/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TableCell, TableRow } from "@/components/ui/table";
import formattedDate from "@/utils/date-format";
import { getLeave } from "@/lib/action";
import { useEffect, useState } from "react";
import { Leave } from "@prisma/client";
import { SkeletonTable } from "@/components/skeletons";

const columns = [
  {
    type: "Tanggal",
    accesor: "tanggal",
  },
  {
    type: "Jenis Izin",
    accesor: "jenisIzin",
  },
  {
    type: "Status",
    accesor: "status",
  },
  {
    type: "Alasan ditolak",
    accesor: "alasan",
  },
  {
    type: "Dibuat",
    accesor: "dibuat",
  },
  {
    type: "action",
    accesor: "action",
  },
];

const StatusPage = () => {
  const [leaves, setLeaves] = useState<Leave[] | null>(null);
  const [loader, setLoader] = useState(false);

  const fetchLeave = async () => {
    setLoader(true);
    const leave = await getLeave();
    setLeaves(leave);
    setLoader(false);
  };

  useEffect(() => {
    fetchLeave();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Table Status Izin kalian</CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste,
          neque.😊
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TableComponent columns={columns}>
          {loader ? (
            <SkeletonTable />
          ) : (
            leaves?.map((leave) => {
              return (
                <TableRow key={leave.id}>
                  <TableCell className="hidden md:table-cell">
                    {formattedDate(leave.startDate)} -{" "}
                    {formattedDate(leave.endDate)}
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
              );
            })
          )}
        </TableComponent>
      </CardContent>
    </Card>
  );
};

export default StatusPage;
