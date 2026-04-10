"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "../lib/products";
import { formatPrice } from "../lib/products";

export function ProductScroll({ products }: { products: Product[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.7;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }

  return (
    <section className="relative py-8 md:py-12">
      <div className="flex items-center justify-between px-4 md:px-8 mb-4">
        <p className="kt-label text-mute/70 tracking-[0.25em]">Products</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            className="kt-pill py-1.5 px-3 text-[9px]"
            aria-label="Scroll left"
          >
            ←
          </button>
          <button
            onClick={() => scroll("right")}
            className="kt-pill py-1.5 px-3 text-[9px]"
            aria-label="Scroll right"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-[2px] overflow-x-auto scroll-smooth px-4 md:px-8 scrollbar-hide"
      >
        {products.map((p) => (
          <Link
            key={p.slug}
            href={p.status === "sold-out" ? "#" : `/shop/${p.slug}`}
            className={`group shrink-0 w-[80vw] sm:w-[50vw] md:w-[33vw] overflow-hidden ${p.status === "sold-out" ? "pointer-events-none" : ""}`}
          >
            <div className="relative aspect-[3/4]">
              {p.images?.[0] ? (
                <Image
                  src={p.images[0]}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 80vw, 33vw"
                  className="object-cover transition-transform duration-[1500ms] ease-[var(--ease-soft)] group-hover:scale-[1.04]"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]">
                  <span className="text-4xl text-ink/5 font-bold uppercase">{p.name.split(" ")[0]}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              {p.status === "sold-out" && <div className="absolute inset-0 bg-black/60 z-[1]" />}
              {p.status === "sold-out" && (
                <span className="absolute top-4 right-4 z-[2] kt-pill text-[9px] py-1 px-3">Sold out</span>
              )}
              {p.status === "new-drop" && (
                <span className="absolute top-4 right-4 z-[2] rounded-full bg-accent text-black px-3 py-1 text-[9px] font-bold uppercase tracking-[0.1em]" style={{ fontFamily: "var(--font-heading), monospace" }}>New</span>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-[1]">
                <p className="text-white/60 text-[10px] uppercase tracking-[0.15em]" style={{ fontFamily: "var(--font-heading), monospace" }}>{p.category}</p>
                <h3 className="text-white font-bold uppercase tracking-tight text-base md:text-lg mt-1 leading-tight">
                  {p.name}
                </h3>
                <span className="text-white/70 text-sm tabular-nums mt-1 block">{formatPrice(p.price, p.currency)}</span>
              </div>
            </div>
          </Link>
        ))}

        <Link
          href="/shop"
          className="group shrink-0 w-[80vw] sm:w-[50vw] md:w-[33vw] flex flex-col items-center justify-center aspect-[3/4] bg-[#0a0a0a] hover:bg-[#111] transition-colors"
        >
          <p className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-ink/40 group-hover:text-accent transition-colors">
            View all →
          </p>
          <p className="kt-label text-mute/60 mt-3">Browse collection</p>
        </Link>
      </div>
    </section>
  );
}
