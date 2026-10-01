# Admin setup

The admin app uses Supabase Auth plus the `public.admin_users` table.

## Bootstrap the first owner

1. In Supabase Dashboard, open **Authentication > Users**.
2. Create a user with the email/password you want to use for the dashboard.
3. Copy the new user's UUID.
4. In the SQL editor, run:

```sql
insert into public.admin_users (user_id, role, display_name)
values ('PASTE_AUTH_USER_UUID_HERE', 'owner', 'Owner');
```

After that, open the admin app on port 3001 and sign in.

The first owner bootstrap is intentionally manual so the public app cannot claim
administrator access. Additional admin-management UI can be added later if needed.

## Roles

The schema supports `owner`, `admin`, `operations`, and `content`.
The first dashboard version treats all admin roles as trusted staff. Fine-grained
role restrictions can be layered in once responsibilities are finalized.
