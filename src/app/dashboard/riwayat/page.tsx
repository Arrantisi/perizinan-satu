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
    type: "Alasan",
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

const RiwayatPage = async () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Table Riwayat cuti anda</CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, est.
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

export default RiwayatPage;
