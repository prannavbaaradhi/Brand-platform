# Supabase database workflow

Remote project ref:

```text
gpsvpaxnozawapszudlb
```

Region:

```text
ap-south-1
```

## Applied migrations

The following migrations have been applied to the remote project in order:

```text
20261001062957 initial_commerce_schema
20261001063110 harden_rls_and_indexes
20261001063449 operations_discounts_content_and_storage
20261001063531 operations_indexes
20261001063651 secure_discount_validation
20261001064045 atomic_paid_order_creation
20261001064102 service_paid_order_rpc
20261001064414 restrict_discount_rpc_to_server
```

The remote Supabase migration history is the current schema authority for this
initial build.

Before the team starts parallel database development, pull the remote schema
with the Supabase CLI and commit the generated local migration files here. From
that point onward, schema changes should be authored as migration files first
and applied through the normal migration workflow.

## After a schema change

1. apply the migration,
2. run Supabase security and performance advisors,
3. regenerate `packages/database/src/types.ts`,
4. run `pnpm typecheck`,
5. run `pnpm build`.

Do not manually edit the generated database TypeScript file.
