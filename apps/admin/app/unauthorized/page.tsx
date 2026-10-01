import { signOut } from "../../actions/auth";

export default function UnauthorizedPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[var(--off-white)] px-6 text-[var(--charcoal)]">
      <div className="max-w-md border border-black/10 p-8">
        <p className="text-[10px] uppercase tracking-[0.24em] text-black/45">
          Access pending
        </p>
        <h1 className="mt-3 text-2xl font-medium">No admin profile found</h1>
        <p className="mt-3 text-sm leading-6 text-black/60">
          The Auth account exists, but it has not been added to the admin_users table yet.
        </p>
        <form action={signOut} className="mt-6">
          <button className="border border-black/20 px-4 py-2 text-xs uppercase tracking-[0.16em]">
            Sign out
          </button>
        </form>
      </div>
    </main>
  );
}
