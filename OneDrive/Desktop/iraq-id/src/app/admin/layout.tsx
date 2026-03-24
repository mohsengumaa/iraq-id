import { AdminHeader } from "@/components/admin/admin-header";
import { AdminMobileNav } from "@/components/admin/admin-mobile-nav";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-[var(--rm-surface)] md:flex-row">
      <AdminSidebar />
      <div className="flex min-h-full min-w-0 flex-1 flex-col pb-16 md:pb-0">
        <AdminHeader />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
      <AdminMobileNav />
    </div>
  );
}
