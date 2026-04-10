"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomerSchema, type Customer } from "../lib/schemas";
import { useCart } from "../store/cart";
import { formatPrice } from "../lib/products";

export function CheckoutForm() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  useEffect(() => setMounted(true), []);

  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Customer>({ resolver: zodResolver(CustomerSchema) });

  async function onSubmit(customer: Customer) {
    setServerError(null);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, customer, subtotal, currency: "DT" }),
      });
      if (!res.ok) throw new Error("failed");
      clear();
      router.push("/checkout/success");
    } catch {
      setServerError("Something went wrong. Please try again or contact us.");
    }
  }

  if (mounted && items.length === 0) {
    return (
      <div className="text-center max-w-lg mx-auto py-12">
        <p className="text-xl text-ink font-bold uppercase">Your cart is empty.</p>
        <Link href="/shop" className="kt-btn kt-btn-primary mt-6">
          Continue shopping
        </Link>
      </div>
    );
  }

  const field =
    "w-full bg-transparent border-0 border-b border-white/[0.15] focus:border-accent/50 focus:outline-none transition-all duration-300 px-0 py-4 text-sm text-ink placeholder:text-mute/50";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-12 gap-8"
      noValidate
    >
      <div className="md:col-span-7 space-y-1">
        <h2 className="text-xl text-ink font-bold uppercase mb-6">Delivery details</h2>
        <p className="kt-label text-mute mb-8">We will call you to confirm before dispatch.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <div>
            <label className="kt-label text-mute">Full name</label>
            <input {...register("fullName")} className={field} placeholder="Your name" />
            {errors.fullName && <p className="mt-1 text-xs text-accent">{errors.fullName.message}</p>}
          </div>
          <div>
            <label className="kt-label text-mute">Phone</label>
            <input {...register("phone")} className={field} placeholder="+216 ..." inputMode="tel" />
            {errors.phone && <p className="mt-1 text-xs text-accent">{errors.phone.message}</p>}
          </div>
        </div>

        <div>
          <label className="kt-label text-mute">Gouvernorat</label>
          <select {...register("city")} defaultValue="" className={`${field} appearance-none`}>
            <option value="" disabled>Select your city...</option>
            {[
              "Ariana", "Beja", "Ben Arous", "Bizerte", "Gabes", "Gafsa",
              "Jendouba", "Kasserine", "Kebili", "Kef", "Mahdia", "Manouba",
              "Medenine", "Monastir", "Nabeul", "Sfax", "Sidi Bouzid",
              "Siliana", "Sousse", "Tataouine", "Tozeur", "Tunis", "Zaghouan",
              "Kairouan",
            ].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.city && <p className="mt-1 text-xs text-accent">{errors.city.message}</p>}
        </div>

        <div>
          <label className="kt-label text-mute">Full address</label>
          <textarea {...register("address")} rows={2} className={`${field} resize-none`} placeholder="Street, building, apartment..." />
          {errors.address && <p className="mt-1 text-xs text-accent">{errors.address.message}</p>}
        </div>

        <div>
          <label className="kt-label text-mute">Notes (optional)</label>
          <textarea {...register("notes")} rows={2} className={`${field} resize-none`} placeholder="Anything we should know?" />
        </div>

        {serverError && <p className="text-sm text-accent">{serverError}</p>}
      </div>

      <aside className="md:col-span-5">
        <div className="md:sticky md:top-24 space-y-5">
          <h2 className="text-xl text-ink font-bold uppercase">Your order</h2>
          <div className="kt-divider" />
          <ul className="space-y-3 max-h-72 overflow-auto pr-1">
            {items.map((it) => (
              <li key={`${it.slug}-${it.size}`} className="flex justify-between items-start gap-4 text-sm">
                <div>
                  <p className="text-ink">{it.name}</p>
                  <p className="kt-label text-mute">{it.size} · ×{it.qty}</p>
                </div>
                <span className="tabular-nums text-ink whitespace-nowrap">{formatPrice(it.price * it.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="kt-divider" />
          <div className="flex justify-between items-end">
            <span className="kt-label text-mute">Total</span>
            <span className="text-xl text-ink font-bold tabular-nums">{formatPrice(subtotal)}</span>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="kt-btn kt-btn-primary w-full disabled:opacity-60"
          >
            {isSubmitting ? "Placing order..." : "Place order"}
          </button>
          <p className="kt-label text-mute/70 text-center">
            Cash on delivery — pay when your package arrives.
          </p>
        </div>
      </aside>
    </form>
  );
}
