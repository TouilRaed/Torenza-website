"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Product } from "../lib/products";
import { useCart } from "../store/cart";

export function AddToCart({ product }: { product: Product }) {
  const router = useRouter();
  const add = useCart((s) => s.add);
  const [size, setSize] = useState(product.sizes[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd(goToCart: boolean) {
    add({
      slug: product.slug,
      name: product.name,
      price: product.price,
      size,
      qty,
      image: product.images[0] ?? "",
    });
    setAdded(true);
    if (goToCart) router.push("/cart");
    else setTimeout(() => setAdded(false), 4000);
  }

  const soldOut = product.status === "sold-out";

  if (soldOut) {
    return (
      <div className="space-y-4">
        <p className="text-center text-ink font-bold uppercase tracking-tight text-xl">Sold out</p>
        <p className="text-center text-mute text-sm">This piece is no longer available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {product.status === "new-drop" && (
        <p className="kt-label text-accent flex items-center gap-2">
          <span className="dot-live" /> New drop
        </p>
      )}
      <fieldset>
        <div className="flex items-center justify-center gap-4">
          {product.sizes.map((s) => {
            const selected = size === s;
            return (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                aria-pressed={selected}
                className={`select-none w-10 h-10 inline-flex items-center justify-center text-sm tracking-tight transition-all duration-200 ${
                  selected
                    ? "text-ink border border-ink"
                    : "text-mute/70 border border-transparent hover:text-ink"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div>
        <p className="kt-label text-mute mb-3">Quantity</p>
        <div className="inline-flex items-center border border-white/15">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-12 h-12 text-ink text-xl select-none hover:bg-white/5 transition-colors"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <input
            type="number"
            min={1}
            max={20}
            value={qty}
            onChange={(e) => {
              const n = parseInt(e.target.value, 10);
              if (Number.isFinite(n)) setQty(Math.max(1, Math.min(20, n)));
            }}
            className="w-12 h-12 text-center tabular-nums text-base bg-transparent outline-none border-x border-white/15 text-ink appearance-none [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            inputMode="numeric"
          />
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(20, q + 1))}
            className="w-12 h-12 text-ink text-xl select-none hover:bg-white/5 transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex gap-2 pt-2 max-w-xs">
        <button
          type="button"
          onClick={() => handleAdd(false)}
          className="kt-btn kt-btn-primary flex-1"
        >
          {added ? "Added ✓" : "Add to cart"}
        </button>
        <button
          type="button"
          onClick={() => handleAdd(true)}
          className="kt-btn kt-btn-outline"
        >
          Buy now
        </button>
      </div>

      {added && (
        <div className="rise kt-card bg-accent/10 border-accent/20 p-4 flex items-center gap-3" role="status" aria-live="polite">
          <span className="dot-live" />
          <div className="flex-1 text-sm">
            <p className="text-ink font-bold">Added to cart</p>
            <p className="text-mute text-[11px] mt-0.5">Size {size} · ×{qty}</p>
          </div>
          <Link href="/cart" className="kt-btn kt-btn-outline py-2 px-4 text-[10px]">
            View cart →
          </Link>
        </div>
      )}

      <p className="kt-label text-mute/60 pt-1">
        Cash on delivery — pay only when you receive your package.
      </p>
    </div>
  );
}
