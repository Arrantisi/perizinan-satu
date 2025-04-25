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
import columns from "@/json/table-riwayat.json";
import StatusBadge from "@/components/status-badge";
import { prisma } from "@/lib/prisma";
import formattedDate from "@/utils/date-format";

const RiwayatPage = async () => {
  const menu = await prisma.leave.findMany();

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
          {menu.map((item) => {
            return (
              <TableRow key={item.id}>
                {item.status !== "PENDING" && (
                  <>
                    <TableCell className="hidden md:table-cell">
                      {formattedDate(item.startDate)} -{" "}
                      {formattedDate(item.endDate)}
                    </TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>
                      <StatusBadge status={item.status} />
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {item?.reviewedBy}
                    </TableCell>
                    <TableCell className="max-w-[10rem] truncate hidden lg:table-cell">
                      {item.reason}
                    </TableCell>
                    <TableCell>
                      <DropdownTable deleteType="hapus" id={item.id} />
                    </TableCell>
                  </>
                )}
              </TableRow>
            );
          })}
        </TableComponent>
      </CardContent>
    </Card>
  );
};

export default RiwayatPage;
