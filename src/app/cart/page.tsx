"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "../../store/cart";
import { formatPrice } from "../../lib/products";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <section className="pb-28 px-4 md:px-8">
      <div className="max-w-[140rem] mx-auto">
        <p className="kt-label text-accent flex items-center gap-2">
          <span className="dot-live" /> Your cart
        </p>
        <h1 className="mt-4 text-4xl md:text-[7rem] leading-[0.84] tracking-[-0.03em] font-bold uppercase text-ink">
          Cart.
        </h1>

        {!mounted ? null : items.length === 0 ? (
          <div className="mt-14 text-center max-w-lg mx-auto">
            <p className="text-xl text-ink font-bold uppercase">Your cart is empty</p>
            <p className="mt-2 text-mute text-sm">The collection is small but considered.</p>
            <Link href="/shop" className="kt-btn kt-btn-primary mt-8">
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8 space-y-0">
              <div className="kt-divider" />
              {items.map((it) => (
                <div key={`${it.slug}-${it.size}`}>
                  <div className="py-5 flex gap-4 items-center">
                    <div className="relative w-20 h-24 overflow-hidden bg-[#0a0a0a] shrink-0">
                      {it.image && (
                        <Image src={it.image} alt={it.name} fill sizes="80px" className="object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link href={`/shop/${it.slug}`} className="text-ink font-bold uppercase tracking-tight text-sm hover:text-accent transition-colors">
                        {it.name}
                      </Link>
                      <p className="kt-label text-mute mt-1">Size {it.size}</p>
                      <div className="mt-2 flex items-center gap-3">
                        <div className="inline-flex items-center border border-white/[0.15] rounded-full overflow-hidden">
                          <button onClick={() => setQty(it.slug, it.size, it.qty - 1)} className="w-8 h-8 hover:bg-white/5 transition-colors text-sm" aria-label="Decrease">–</button>
                          <span className="w-6 text-center text-sm tabular-nums text-ink">{it.qty}</span>
                          <button onClick={() => setQty(it.slug, it.size, it.qty + 1)} className="w-8 h-8 hover:bg-white/5 transition-colors text-sm" aria-label="Increase">+</button>
                        </div>
                        <button onClick={() => remove(it.slug, it.size)} className="kt-label text-mute hover:text-accent transition-colors">
                          Remove
                        </button>
                      </div>
                    </div>
                    <p className="text-sm tabular-nums text-ink">{formatPrice(it.price * it.qty)}</p>
                  </div>
                  <div className="kt-divider" />
                </div>
              ))}
            </div>

            <aside className="md:col-span-4">
              <div className="md:sticky md:top-24 space-y-5">
                <h2 className="text-xl text-ink font-bold uppercase">Summary</h2>
                <div className="kt-divider" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-mute">
                    <span>Subtotal</span>
                    <span className="tabular-nums">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-mute">
                    <span>Shipping</span>
                    <span>On delivery</span>
                  </div>
                </div>
                <div className="kt-divider" />
                <div className="flex justify-between items-end">
                  <span className="kt-label text-mute">Total</span>
                  <span className="text-xl text-ink font-bold tabular-nums">{formatPrice(subtotal)}</span>
                </div>
                <Link href="/checkout" className="kt-btn kt-btn-primary w-full text-center">
                  Checkout
                </Link>
                <p className="kt-label text-mute/70 text-center">Cash on delivery — no payment now.</p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
