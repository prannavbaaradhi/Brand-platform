# Database model

The commerce database lives in Supabase/PostgreSQL.

## Core tables

- `products` — made-to-order products and publishing state
- `product_variants` — size/color combinations; no stock quantity
- `product_images` — product photography
- `collections` and `collection_products` — storefront groupings
- `customers` — customer contact records
- `orders` — payment and fulfilment state
- `order_items` — ordered pieces and per-piece production state
- `lookbooks` and `lookbook_items` — editorial content
- `admin_users` — authenticated dashboard users and roles

## Made-to-order flow

There is intentionally no inventory table in the first version.

Each purchased piece enters the production flow:

`to_be_made -> in_production -> quality_check -> packed -> shipped -> delivered`

Order-level stages also include payment confirmation and cancellation.

## Security

Row Level Security is enabled on every public table.

Anonymous users can only read published catalog and lookbook data. Authenticated administrators can manage catalog and operational data. Customer/order data is not anonymously readable. The admin-check helper is stored in a non-exposed `private` schema.

Supabase generated TypeScript definitions are stored in
`packages/database/src/types.ts`.

## Current remote migrations

- `initial_commerce_schema`
- `harden_rls_and_indexes`

After database schema changes, regenerate the TypeScript definitions before
shipping application code that depends on the new shape.
