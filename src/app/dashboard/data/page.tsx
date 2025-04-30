import TableComponent from "@/components/table/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import columns from "@/json/table-data-karyawan.json";
import TableUser from "./components/table-user";
import { Suspense } from "react";
import { SkeletonTable } from "@/components/skeletons";

const DataPage = async () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>table data karyawan</CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias,
          nihil.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TableComponent columns={columns}>
          <Suspense fallback={<SkeletonTable />}>
            <TableUser />
          </Suspense>
        </TableComponent>
      </CardContent>
    </Card>
  );
};

export default DataPage;
