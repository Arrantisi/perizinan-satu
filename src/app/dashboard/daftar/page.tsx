import TableComponent from "@/components/table/table";
import columns from "@/json/table-daftar.json";
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
