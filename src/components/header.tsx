"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../store/cart";

export function Header() {
  const [mounted, setMounted] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const count = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));
  const badgeRef = useRef<HTMLSpanElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const prev = useRef(0);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!mounted) { prev.current = count; return; }
    if (count > prev.current && badgeRef.current) {
      const el = badgeRef.current;
      el.classList.remove("pop");
      void el.offsetWidth;
      el.classList.add("pop");
    }
    prev.current = count;
  }, [count, mounted]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setExploreOpen(false);
      }
    }
    if (exploreOpen) document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [exploreOpen]);

  return (
    <header className="fixed inset-x-0 top-[31px] z-40 bg-black/90 backdrop-blur-sm">
      {/* Mobile: title on top, buttons below */}
      <div className="md:hidden">
        <button
          onClick={() => {
            sessionStorage.removeItem("torenza-entered");
            window.dispatchEvent(new Event("torenza-show-preloader"));
          }}
          className="w-full py-2 text-center text-ink/30 font-bold text-lg tracking-[0.15em] uppercase bg-transparent border-0 cursor-pointer hover:text-ink/50 transition-colors"
          style={{ fontFamily: "var(--font-heading), monospace" }}
        >
          Torenza
        </button>
        <div className="flex items-center justify-between px-3 pb-2">
          <div className="flex items-center gap-1.5">
            <div ref={dropRef} className="relative">
              <button
                type="button"
                onClick={() => setExploreOpen((o) => !o)}
                className="kt-pill text-[8px] px-3 py-1.5"
              >
                Explore
              </button>
              {exploreOpen && (
                <div className="absolute top-full left-0 mt-2 bg-black border border-white/15 rounded-lg overflow-hidden min-w-[160px] shadow-xl shadow-black/50 z-50">
                  <Link href="/lookbook" onClick={() => setExploreOpen(false)} className="block px-5 py-3 text-[11px] uppercase tracking-[0.12em] text-ink/80 hover:text-ink hover:bg-white/5 transition-colors" style={{ fontFamily: "var(--font-heading), monospace" }}>Lookbook</Link>
                  <div className="h-[1px] bg-white/10" />
                  <Link href="/shop" onClick={() => setExploreOpen(false)} className="block px-5 py-3 text-[11px] uppercase tracking-[0.12em] text-ink/80 hover:text-ink hover:bg-white/5 transition-colors" style={{ fontFamily: "var(--font-heading), monospace" }}>Archive</Link>
                </div>
              )}
            </div>
            <Link href="/about" className="kt-pill text-[8px] px-3 py-1.5">Info</Link>
          </div>
          <Link href="/cart" className="kt-pill text-[8px] px-3 py-1.5" aria-label="View cart">
            <span ref={badgeRef}>Cart [{mounted ? count : 0}]</span>
          </Link>
        </div>
      </div>

      {/* Desktop: single row */}
      <div className="hidden md:flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-2 z-10">
          <div ref={dropRef} className="relative">
            <button
              type="button"
              onClick={() => setExploreOpen((o) => !o)}
              className="kt-pill"
            >
              Explore
            </button>
            {exploreOpen && (
              <div className="absolute top-full left-0 mt-2 bg-black border border-white/15 rounded-lg overflow-hidden min-w-[160px] shadow-xl shadow-black/50 z-50">
                <Link href="/lookbook" onClick={() => setExploreOpen(false)} className="block px-5 py-3 text-[11px] uppercase tracking-[0.12em] text-ink/80 hover:text-ink hover:bg-white/5 transition-colors" style={{ fontFamily: "var(--font-heading), monospace" }}>Lookbook</Link>
                <div className="h-[1px] bg-white/10" />
                <Link href="/shop" onClick={() => setExploreOpen(false)} className="block px-5 py-3 text-[11px] uppercase tracking-[0.12em] text-ink/80 hover:text-ink hover:bg-white/5 transition-colors" style={{ fontFamily: "var(--font-heading), monospace" }}>Archive</Link>
              </div>
            )}
          </div>
          <Link href="/about" className="kt-pill">Info</Link>
        </div>

        <button
          onClick={() => {
            sessionStorage.removeItem("torenza-entered");
            window.dispatchEvent(new Event("torenza-show-preloader"));
          }}
          className="absolute left-1/2 -translate-x-1/2 text-ink/30 font-bold text-4xl tracking-[0.2em] uppercase bg-transparent border-0 cursor-pointer hover:text-ink/50 transition-colors"
          style={{ fontFamily: "var(--font-heading), monospace" }}
        >
          Torenza
        </button>

        <div className="flex items-center gap-2 z-10">
          <Link href="/cart" className="kt-pill" aria-label="View cart">
            <span ref={badgeRef}>Cart [{mounted ? count : 0}]</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
