import AppSidebar from "@/components/sidebar/app-sidebar";
import NavHeader from "@/components/sidebar/nav-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getCurrentUserId } from "@/lib/action";
// import { getSession } from "@/lib/action";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUserId();

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" user={user?.role} />
      <SidebarInset>
        <NavHeader />
        <div className="m-4 h-full">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
