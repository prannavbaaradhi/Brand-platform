# Backend readiness

## Ready

- database schema
- RLS/security model
- admin authentication plumbing
- admin operations dashboard
- product creation with size/color variants
- product-image uploads
- collection publishing
- lookbook records
- discount management
- customer records
- order dashboard
- production queue
- tracking fields
- public catalog API
- server-side discount validation
- atomic paid-order creation
- payment-provider adapter contract
- Docker workspace
- CI typecheck/build

## Deliberately waiting

### Customer storefront

Not started beyond the placeholder app. This is the next development phase.

### Payment provider

The backend boundary is ready, but a provider has not been selected or given
credentials. Provider checkout creation + signature verification should be
implemented before public checkout goes live.

### Shipping provider

Tracking fields exist and can be managed manually. Automated label/shipping
integration can be selected later without changing the core order model.

### Initial admin account

The Auth user must be created once and its UUID inserted into
`public.admin_users`. This manual bootstrap is documented in
`docs/admin-setup.md`.
