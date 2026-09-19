/*
# Create orders table for online pickup ordering

1. New Tables
- `orders`: stores pickup orders submitted from the website
  - `id` (uuid, primary key)
  - `customer_name` (text, not null) — name on the order
  - `customer_phone` (text, not null) — contact phone
  - `pickup_time` (text, not null) — requested pickup time slot (free text)
  - `items` (jsonb, not null) — array of { name, price, quantity }
  - `subtotal` (numeric, not null) — order subtotal in dollars
  - `notes` (text, nullable) — optional customer notes
  - `status` (text, default 'received') — order workflow status
  - `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `orders`.
- This is a no-auth public ordering app: allow anon + authenticated to INSERT (so customers can place orders).
- Allow anon + authenticated to SELECT so the confirmation page can look up an order by id.
- UPDATE and DELETE are NOT granted to anon/authenticated (only service role can change status).
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  pickup_time text NOT NULL,
  items jsonb NOT NULL,
  subtotal numeric(10,2) NOT NULL,
  notes text,
  status text NOT NULL DEFAULT 'received',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders" ON orders FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_orders" ON orders;
CREATE POLICY "anon_select_orders" ON orders FOR SELECT
TO anon, authenticated USING (true);
