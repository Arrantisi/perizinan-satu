import {
  BarChart2,
  CheckCircle,
  ClipboardList,
  FilePlus,
  Inbox,
  Info,
  LayoutDashboardIcon,
  Users,
} from "lucide-react";
import { Skeleton } from "../ui/skeleton";

const menu = [
  {
    name: "Dashboard",
    icon: LayoutDashboardIcon,
    visible: ["EMPLOYEE", "BOSS"],
    link: "/dashboard/",
  },
  {
    name: "Ajukan Izin",
    icon: FilePlus,
    visible: ["EMPLOYEE"],
    link: "/dashboard/ajukan",
  },
  {
    name: "Riwayat Izin",
    icon: ClipboardList,
    visible: ["EMPLOYEE"],
    link: "/dashboard/riwayat",
  },
  {
    name: "Status Izin",
    icon: Info,
    visible: ["EMPLOYEE"],
    link: "/dashboard/status",
  },
  {
    name: "Daftar Izin",
    icon: Inbox,
    visible: ["BOSS"],
    link: "/dashboard/daftar",
  },
  {
    name: "Persetujuan Izin",
    icon: CheckCircle,
    visible: ["BOSS"],
    link: "/dashboard/persetujuan",
  },
  {
    name: "Laporan Izin",
    icon: BarChart2,
    visible: ["BOSS"],
    link: "/dashboard/laporan",
  },
  {
    name: "Data Karyawan",
    icon: Users,
    visible: ["BOSS"],
    link: "/dashboard/data",
  },
];

const NavLoader = () => {
  return (
    <div className="m-2 mt-4">
      <Skeleton className="h-8" />
      <div className="mt-4">
        {menu.map((item) => (
          <Skeleton key={item.name} className="h-6 my-2" />
        ))}
      </div>
    </div>
  );
};

export default NavLoader;
