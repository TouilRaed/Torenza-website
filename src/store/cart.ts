"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "../lib/schemas";

type CartState = {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (slug: string, size: string) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  clear: () => void;
  count: () => number;
  subtotal: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.slug === item.slug && i.size === item.size,
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.slug === item.slug && i.size === item.size
                  ? { ...i, qty: Math.min(20, i.qty + item.qty) }
                  : i,
              ),
            };
          }
          return { items: [...state.items, item] };
        }),
      remove: (slug, size) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.slug === slug && i.size === size),
          ),
        })),
      setQty: (slug, size, qty) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.slug === slug && i.size === size
              ? { ...i, qty: Math.max(1, Math.min(20, qty)) }
              : i,
          ),
        })),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((n, i) => n + i.qty, 0),
      subtotal: () => get().items.reduce((s, i) => s + i.price * i.qty, 0),
    }),
    { name: "torenza-cart" },
  ),
);
