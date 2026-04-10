"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";

export function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    setActive(idx);
  }, []);

  function goTo(idx: number) {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      left: idx * scrollRef.current.clientWidth,
      behavior: "smooth",
    });
  }

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-[#0a0a0a] flex items-center justify-center">
        <span className="text-3xl text-ink/10 font-bold uppercase">{name}</span>
      </div>
    );
  }

  return (
    <div>
      {/* Swipeable carousel */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
      >
        {images.map((src, i) => (
          <div key={i} className="shrink-0 w-full snap-center">
            <div className="relative aspect-square bg-[#f0eeec] overflow-hidden">
              <Image
                src={src}
                alt={`${name} — view ${i + 1}`}
                fill
                sizes="(max-width: 768px) 80vw, 400px"
                className="object-contain p-4"
                priority={i === 0}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Arrows + Dots row */}
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            type="button"
            onClick={() => goTo(Math.max(0, active - 1))}
            className={`text-ink/60 hover:text-ink text-lg transition-colors ${active === 0 ? "opacity-30 pointer-events-none" : ""}`}
            aria-label="Previous image"
          >
            ←
          </button>
          <div className="flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`View image ${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  active === i
                    ? "bg-ink"
                    : "bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => goTo(Math.min(images.length - 1, active + 1))}
            className={`text-ink/60 hover:text-ink text-lg transition-colors ${active === images.length - 1 ? "opacity-30 pointer-events-none" : ""}`}
            aria-label="Next image"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
