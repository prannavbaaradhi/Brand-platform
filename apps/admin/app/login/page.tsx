import { signIn } from "../../actions/auth";

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const hasError = Boolean(params.error);

  return (
    <main className="grid min-h-screen place-items-center bg-[var(--charcoal)] px-6 text-[var(--off-white)]">
      <div className="w-full max-w-sm">
        <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">
          Brand Platform
        </p>
        <h1 className="mt-3 text-3xl font-medium tracking-[-0.04em]">
          Admin sign in
        </h1>
        <p className="mt-2 text-sm leading-6 text-white/55">
          Use a Supabase Auth account that has a matching admin profile.
        </p>

        <form action={signIn} className="mt-8 space-y-4">
          <label className="block text-xs uppercase tracking-[0.16em] text-white/60">
            Email
            <input
              name="email"
              type="email"
              required
              className="mt-2 w-full border border-white/15 bg-white/5 px-4 py-3 text-sm normal-case tracking-normal outline-none focus:border-white/40"
            />
          </label>
          <label className="block text-xs uppercase tracking-[0.16em] text-white/60">
            Password
            <input
              name="password"
              type="password"
              required
              className="mt-2 w-full border border-white/15 bg-white/5 px-4 py-3 text-sm normal-case tracking-normal outline-none focus:border-white/40"
            />
          </label>
          {hasError && (
            <p className="text-sm text-red-300">
              Sign in failed. Check the email and password.
            </p>
          )}
          <button className="w-full bg-[var(--off-white)] px-4 py-3 text-xs uppercase tracking-[0.2em] text-[var(--charcoal)]">
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}
