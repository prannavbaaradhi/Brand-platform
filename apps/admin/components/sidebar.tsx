import Link from "next/link";
import { signOut } from "../actions/auth";

const links = [
  ["Dashboard", "/dashboard"],
  ["Products", "/products"],
  ["Orders", "/orders"],
  ["Production", "/production"],
  ["Collections", "/collections"],
  ["Lookbooks", "/lookbooks"],
  ["Discounts", "/discounts"],
  ["Customers", "/customers"],
  ["Site content", "/content"]
] as const;

export function Sidebar({
  email,
  role
}: {
  email: string;
  role: string;
}) {
  return (
    <aside className="border-b border-black/10 p-5 md:min-h-screen md:w-64 md:border-b-0 md:border-r md:p-6">
      <Link href="/dashboard" className="block">
        <p className="text-[9px] uppercase tracking-[0.28em] text-black/40">
          Internal
        </p>
        <p className="mt-1 text-lg font-medium tracking-[-0.03em]">
          Brand Platform
        </p>
      </Link>

      <nav className="mt-8 grid grid-cols-2 gap-1 md:grid-cols-1">
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className="px-2 py-2 text-sm text-black/60 transition-colors hover:bg-black/[0.04] hover:text-black"
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className="mt-8 border-t border-black/10 pt-5 text-xs text-black/50">
        <p className="truncate">{email}</p>
        <p className="mt-1 uppercase tracking-[0.12em]">{role}</p>
        <form action={signOut} className="mt-4">
          <button className="text-xs underline underline-offset-4">Sign out</button>
        </form>
      </div>
    </aside>
  );
}
