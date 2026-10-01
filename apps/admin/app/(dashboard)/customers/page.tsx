import { requireAdmin } from "../../../lib/auth";

export default async function CustomersPage() {
  const { supabase } = await requireAdmin();
  const { data: customers, error } = await supabase
    .from("customers")
    .select("id, email, full_name, phone, created_at")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (
    <>
      <header>
        <p className="text-[10px] uppercase tracking-[0.24em] text-black/40">CRM</p>
        <h1 className="mt-2 text-3xl font-medium tracking-[-0.04em]">Customers</h1>
      </header>
      <div className="mt-8 overflow-x-auto border border-black/10">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="border-b border-black/10 text-[10px] uppercase tracking-[0.14em] text-black/45">
            <tr><th className="p-4 font-normal">Name</th><th className="p-4 font-normal">Email</th><th className="p-4 font-normal">Phone</th><th className="p-4 font-normal">Joined</th></tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b border-black/[0.06] last:border-0">
                <td className="p-4">{customer.full_name ?? "—"}</td>
                <td className="p-4">{customer.email}</td>
                <td className="p-4">{customer.phone ?? "—"}</td>
                <td className="p-4">{new Date(customer.created_at).toLocaleDateString("en-IN")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
