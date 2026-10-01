# Backend API

The Fastify service in `services/api` is the server-side commerce boundary.

## Public endpoints

- `GET /health`
- `GET /catalog/products`
- `GET /catalog/products/:slug`
- `GET /catalog/collections`
- `GET /catalog/lookbooks`
- `GET /content/homepage`
- `POST /discounts/validate`

Public catalog reads use the Supabase publishable key and are still constrained by
RLS. Draft products, private content, customer data and order data are not
returned.

## Order creation

Orders are not created from browser-supplied prices.

The database function `create_paid_order` is callable only with the server
role. It re-reads product/variant prices, checks availability, validates any
discount, creates/updates the customer, creates the paid order, inserts the
made-to-order items, and increments discount usage in one database transaction.

The API exposes this through the internal `confirmPaidOrder()` service only.
No public HTTP route calls it yet, because a payment provider has not been
selected. Once Razorpay/Stripe/etc. is chosen, its verified webhook should call
`confirmPaidOrder()`.

## Payment boundary

`src/payments/provider.ts` defines the provider adapter contract. A provider
implementation must:

1. create checkout sessions/orders,
2. verify webhook signatures from the raw request body,
3. return a normalized verified payment,
4. call `confirmPaidOrder()` only after verification,
5. use `webhook_events` for provider-event idempotency.

Do not trust payment success sent from the storefront.
