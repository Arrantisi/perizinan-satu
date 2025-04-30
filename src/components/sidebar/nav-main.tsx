"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
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
import Link from "next/link";
import NavLoader from "./nav-loader";
import { usePathname } from "next/navigation";

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

const NavMain = ({ userRole }: { userRole?: string }) => {
  const pathname = usePathname();

  if (!userRole) return <NavLoader />;

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem className="text-primary-foreground bg-primary py-1 px-2 mb-2 rounded-sm">
            Menu
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {menu.map((item) => {
            if (item.visible.includes(userRole)) {
              return (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    tooltip={item.name}
                    asChild
                    isActive={item.link === pathname}
                  >
                    <Link href={item.link}>
                      {item.icon && <item.icon />}
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            }
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default NavMain;
