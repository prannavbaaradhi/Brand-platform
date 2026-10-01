# Brand Platform

Custom made-to-order commerce platform for a clothing brand.

The customer storefront is intentionally not built yet. Everything before that
point is scaffolded so the frontend can be added on top of a stable commerce
backend.

## What is already in place

- Next.js admin dashboard
- Supabase Auth-based admin login
- PostgreSQL commerce schema
- Row Level Security on all public commerce tables
- products, variants and product image management
- public catalog Storage bucket with admin-only uploads
- collections
- editorial lookbooks
- customers
- discounts
- orders and order items
- made-to-order production queue
- production history
- shipment/tracking fields
- site-content CMS records
- payment/webhook event persistence
- atomic server-only paid-order creation
- Fastify commerce API
- Docker-based local workspace
- generated Supabase TypeScript definitions
- GitHub Actions typecheck + production-build CI

## Repository

```text
apps/
  admin/          Internal operations dashboard
  storefront/     Placeholder only; customer frontend comes next

packages/
  config/
  database/       Typed Supabase clients + generated database types
  ui/             Shared design tokens

services/
  api/            Public catalog API and server-side commerce boundary

docs/
  admin-setup.md
  backend-api.md
  database.md

supabase/
  README.md       Remote migration registry and database workflow
```

## Made-to-order model

There is deliberately no stock quantity system in the first version.

Once a payment is verified, each ordered piece enters:

```text
to_be_made
→ in_production
→ quality_check
→ packed
→ shipped
→ delivered
```

The platform records production-stage changes in `production_events`.

## Local setup

1. Copy the environment file.

   ```bash
   cp .env.example .env
   ```

2. In Supabase Project Settings > API Keys, create/copy a server secret key and
   place it in:

   ```text
   SUPABASE_SECRET_KEY=...
   ```

3. Start the workspace.

   ```bash
   docker compose up --build
   ```

Services:

- Storefront placeholder: http://localhost:3000
- Admin: http://localhost:3001
- API: http://localhost:4000
- API health: http://localhost:4000/health

## First admin

Follow [docs/admin-setup.md](docs/admin-setup.md). The first owner is
intentionally provisioned manually so a public signup cannot claim admin access.

## Security model

- public users can only read published catalog/editorial/site-content data
- customer, order and admin records are protected by RLS
- product media uploads require an authenticated admin
- discount codes cannot be enumerated through the public database API
- paid orders can only be finalized through a server-role database function
- browser-submitted product prices are never trusted when an order is created
- Supabase security advisors currently report no security findings

## Payment integration

The payment-provider interface is ready, but a provider has not been selected.
A Razorpay/Stripe/etc. implementation should verify the provider webhook before
calling the internal paid-order service. See
[docs/backend-api.md](docs/backend-api.md).

## Next milestone

The next phase is the customer storefront frontend: the matte charcoal,
off-white, dusty-brown and warm-grey minimalist experience with restrained
transitions, lookbooks and subtle shadow/skeleton loaders.
