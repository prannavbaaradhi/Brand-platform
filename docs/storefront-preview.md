# Drop 001 storefront

The storefront now includes a responsive three-shirt preview, product details with
sample size selection, a persistent bag, quantity changes/removal, and contact and
review steps for a full-upfront-payment preorder flow. No address or campus
handover details are collected. Contact details stay in React memory only.

This is explicitly a frontend preview, not an active order channel. Placeholder
products have no prices or production dates. Payment is disabled; no order or
payment success is simulated. Catalog and payment API integration is pending.

Before opening sales: replace the three numbered placeholders with final product
records/photos, verify actual variants and size charts, publish prices, closing
date, ready estimate and cancellation/refund terms, and implement a server-created
payment session plus verified webhook using the existing API payment boundary.
Browser-supplied prices and payment-success flags must never create paid orders.

Run: `pnpm --filter @brand/storefront dev`.
Validate: `pnpm --filter @brand/storefront typecheck` and
`pnpm --filter @brand/storefront build`.
