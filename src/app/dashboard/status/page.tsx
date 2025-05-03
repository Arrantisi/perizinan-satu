import TableComponent from "@/components/table/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TableLave from "./components/table-leave";
import { Suspense } from "react";
import { SkeletonTable } from "@/components/skeletons";

const columns = [
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
  },
  {
    type: "Alasan ditolak",
    accesor: "alasan",
    className: "hidden lg:table-cell",
  },
  {
    type: "Dibuat",
    accesor: "dibuat",
    className: "hidden lg:table-cell",
  },
  {
    type: "action",
    accesor: "action",
  },
];

const StatusPage = () => {
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
          <Suspense fallback={<SkeletonTable />}>
            <TableLave />
          </Suspense>
        </TableComponent>
      </CardContent>
    </Card>
  );
};

export default StatusPage;
