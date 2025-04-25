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
import columns from "@/json/table-status.json";
import { prisma } from "@/lib/prisma";
import formattedDate from "@/utils/date-format";

const StatusPage = async () => {
  const menu = await prisma.leave.findMany();

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
          {menu.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell className="hidden md:table-cell">
                  {formattedDate(item.startDate)} -{" "}
                  {formattedDate(item.endDate)}
                </TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>
                  <StatusBadge status={item.status} />
                </TableCell>
                <TableCell className="truncate max-w-[10rem] hidden lg:table-cell">
                  {item.reason}
                </TableCell>
                <TableCell>
                  <DropdownTable deleteType="batal" id={item.id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableComponent>
      </CardContent>
    </Card>
  );
};

export default StatusPage;
