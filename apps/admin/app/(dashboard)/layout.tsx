import { requireAdmin } from "../../lib/auth";
import { Sidebar } from "../../components/sidebar";

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { user, admin } = await requireAdmin();

  return (
    <div className="min-h-screen bg-[var(--off-white)] text-[var(--charcoal)] md:flex">
      <Sidebar email={user.email ?? "admin"} role={admin.role} />
      <main className="min-w-0 flex-1 p-5 md:p-10">{children}</main>
    </div>
  );
}
