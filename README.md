# Brand Platform

Custom commerce platform for a made-to-order clothing brand.

## Apps

- `apps/storefront` — customer-facing fashion store
- `apps/admin` — internal dashboard for products, orders, production, lookbooks and content
- `services/api` — backend/API service
- `packages/database` — shared Supabase clients
- `packages/ui` — shared design tokens
- `packages/config` — shared TypeScript configuration

## Current direction

The brand is made-to-order rather than inventory-led. The admin experience will focus on products, orders and a production queue rather than stock counts.

Visual direction for the storefront:
- minimalist
- dull matte palette
- charcoal, off-white, dusty brown and warm grey
- restrained transitions
- editorial lookbooks
- subtle skeleton/shadow loaders

## Local development

### Docker

1. Copy the environment template:
   ```bash
   cp .env.example .env
   ```
2. Add the Supabase values to `.env`.
3. Start the workspace:
   ```bash
   docker compose up --build
   ```

Local services:
- Storefront: http://localhost:3000
- Admin: http://localhost:3001
- API: http://localhost:4000

### Native Node

Requires Node 22+ and pnpm.

```bash
corepack enable
pnpm install
pnpm dev
```

## Security

Never commit `.env` or a Supabase service-role key. Browser-facing apps should only use the project URL and publishable key.
