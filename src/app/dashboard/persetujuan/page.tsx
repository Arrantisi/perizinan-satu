import TableComponent from "@/components/table/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";
import TableLeave from "./components/table-leave";
import { SkeletonTable } from "@/components/skeletons";

const columns = [
  {
    type: "Karywan",
    accesor: "karywan",
    className: "hidden md:table-cell",
  },
  {
    type: "Tanggal",
    accesor: "tanggal",
  },
  {
    type: "Jenis Izin",
    accesor: "jenisIzin",
    className: "hidden lg:table-cell",
  },
  {
    type: "Status",
    accesor: "status",
    className: "hidden md:table-cell",
  },
  {
    type: "Alasan",
    accesor: "alasan",
    className: "hidden lg:table-cell",
  },
  {
    type: "action",
    accesor: "action",
  },
];

const PersetujuanPage = async () => {
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
          <Suspense fallback={<SkeletonTable />}>
            <TableLeave />
          </Suspense>
        </TableComponent>
      </CardContent>
    </Card>
  );
};

export default PersetujuanPage;
