# Database model

The commerce database lives in Supabase/PostgreSQL.

## Core commerce

- `products`
- `product_variants`
- `product_images`
- `collections` / `collection_products`
- `customers`
- `orders`
- `order_items`
- `discounts` / `order_discounts`
- `lookbooks` / `lookbook_items`
- `site_content`
- `admin_users`
- `production_events`
- `webhook_events`

There is intentionally no inventory quantity table in the first version.
Products are made after purchase.

## Production flow

`to_be_made -> in_production -> quality_check -> packed -> shipped -> delivered`

Every order-item stage change is written to `production_events`.

## Assets

The public `catalog` Storage bucket accepts JPEG, PNG, WebP and AVIF files up
to 10 MB. Upload/update/delete is restricted to authenticated admins by Storage
RLS. Public downloads are allowed because product imagery is storefront content.

## Security

RLS is enabled on every public commerce table. Catalog and published editorial
content can be read publicly. Customer/order/admin data is restricted to admins.
Discount codes are not enumerable publicly; validation goes through the
`validate_discount(code, subtotal)` database function.

Run Supabase security advisors after every DDL/RLS change.
