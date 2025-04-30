import columns from "@/json/table-daftar.json";
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
