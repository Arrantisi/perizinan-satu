import TableComponent from "@/components/table/table";
import columns from "@/json/table-daftar.json";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TableCell, TableRow } from "@/components/ui/table";
import DropdownTable from "@/components/dropdown/leave-dropdown-table";
import StatusBadge from "@/components/status-badge";
import formattedDate from "@/utils/date-format";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import getInitialName from "@/utils/fullName";
import { prisma } from "@/lib/prisma";

const DaftarPage = async () => {
  const menu = await prisma.leave.findMany({
    include: { user: true },
  });

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
          {menu.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Avatar>
                      <AvatarImage />
                      <AvatarFallback>
                        {getInitialName(item.user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h1 className="text-sm">{item.user.name}</h1>
                      <span className="text-xs text-muted-foreground">
                        {item.user.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {formattedDate(item.startDate)} -{" "}
                  {formattedDate(item.endDate)}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {item.type}
                </TableCell>
                <TableCell>
                  <StatusBadge status={item.status} />
                </TableCell>
                <TableCell className="max-w-[10rem] truncate hidden xl:table-cell">
                  {item.reason}
                </TableCell>
                <TableCell>
                  <DropdownTable deleteType="hapus" id={item.id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableComponent>
      </CardContent>
    </Card>
  );
};

export default DaftarPage;
