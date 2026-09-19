import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(url, anonKey);

export type OrderItem = {
  name: string;
  price: number;
  quantity: number;
};

export type Order = {
  id: string;
  customer_name: string;
  customer_phone: string;
  pickup_time: string;
  items: OrderItem[];
  subtotal: number;
  notes?: string | null;
  status: string;
  created_at: string;
};

export async function submitOrder(payload: {
  customer_name: string;
  customer_phone: string;
  pickup_time: string;
  items: OrderItem[];
  subtotal: number;
  notes?: string;
}): Promise<{ data: Order | null; error: string | null }> {
  const { data, error } = await supabase
    .from('orders')
    .insert(payload)
    .select()
    .maybeSingle();
  if (error) return { data: null, error: error.message };
  return { data: data as Order | null, error: null };
}
