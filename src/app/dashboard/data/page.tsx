"use client";

import KaryawanRowTable from "@/components/table/karyawan-row-table";
import TableComponent from "@/components/table/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import columns from "@/json/table-data-karyawan.json";
import { getUser } from "@/lib/action";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";

const DataPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUser = async () => {
    const data = await getUser();
    setUsers(data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

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
          {users.map((user) => (
            <KaryawanRowTable key={user.id} user={user} />
          ))}
        </TableComponent>
      </CardContent>
    </Card>
  );
};

export default DataPage;
