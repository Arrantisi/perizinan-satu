import TableComponent from "@/components/table/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";
import { SkeletonTable } from "@/components/skeletons";
import LeaveTable from "../table-leave";

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
    className: "hidden lg:table-cell",
  },
  {
    type: "Alasan",
    accesor: "alasan",
    className: "hidden xl:table-cell",
  },
  {
    type: "action",
    accesor: "action",
  },
];

const DaftarPage = async () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Table Daftar Karyawan Yang Cuti</CardTitle>
        <CardDescription>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique
          mollitia perferendis voluptatibus?😊
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TableComponent columns={columns}>
          <Suspense fallback={<SkeletonTable />}>
            <LeaveTable />
          </Suspense>
        </TableComponent>
      </CardContent>
    </Card>
  );
};

export default DaftarPage;
