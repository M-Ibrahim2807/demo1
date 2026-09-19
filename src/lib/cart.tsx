import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { MenuItem } from '@/data/menu';
import type { OrderItem } from '@/lib/supabase';

export type CartLine = OrderItem & { id: string };

type CartContextValue = {
  lines: CartLine[];
  add: (item: MenuItem) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const value = useMemo<CartContextValue>(() => {
    const add = (item: MenuItem) => {
      setLines((prev) => {
        const existing = prev.find((l) => l.id === item.id);
        if (existing) {
          return prev.map((l) => (l.id === item.id ? { ...l, quantity: l.quantity + 1 } : l));
        }
        return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
      });
    };
    const setQty = (id: string, qty: number) => {
      setLines((prev) =>
        qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, quantity: qty } : l)),
      );
    };
    const remove = (id: string) => setLines((prev) => prev.filter((l) => l.id !== id));
    const clear = () => setLines([]);
    const count = lines.reduce((s, l) => s + l.quantity, 0);
    const subtotal = lines.reduce((s, l) => s + l.price * l.quantity, 0);
    return { lines, add, remove, setQty, clear, count, subtotal };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
