import Link from "next/link";
import Image from "next/image";
import type { Product } from "../lib/products";
import { formatPrice } from "../lib/products";

export function ProductCard({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const soldOut = product.status === "sold-out";
  const catalogImage = product.images.length > 1
    ? product.images[product.images.length - 1]
    : product.images[0];

  return (
    <Link
      href={soldOut ? "#" : `/shop/${product.slug}`}
      className={`group block text-center ${soldOut ? "pointer-events-none" : ""} ${className}`}
    >
      <div className="relative aspect-[4/5] bg-[#f0eeec] overflow-hidden">
        {catalogImage ? (
          <Image
            src={catalogImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-soft)] group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl text-black/10 font-bold uppercase tracking-tight">
              {product.name.split(" ")[0]}
            </span>
          </div>
        )}
        {product.status === "new-drop" && (
          <span className="absolute top-3 left-3 z-[2] rounded-full bg-accent text-black px-3 py-1 text-[9px] font-bold uppercase tracking-[0.1em]" style={{ fontFamily: "var(--font-heading), monospace" }}>New</span>
        )}
      </div>
      <div className="pt-3 pb-1 px-1">
        <h3 className="text-ink text-xs font-bold uppercase tracking-[0.06em] leading-snug">
          {product.name}
        </h3>
        <p className="mt-1 text-mute text-xs tabular-nums">
          {formatPrice(product.price, product.currency)}
          {soldOut && <span className="text-mute/70"> — Sold Out</span>}
        </p>
      </div>
    </Link>
  );
}
