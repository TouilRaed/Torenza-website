"use client";

export function Marquee() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 bg-black">
      <div aria-hidden className="overflow-hidden py-2">
        <div
          className="flex whitespace-nowrap marquee gap-12 text-[11px] md:text-[13px] text-mute/80 tracking-[0.2em] uppercase"
          style={{ fontFamily: "var(--font-heading), monospace" }}
        >
          {Array.from({ length: 3 }).map((_, k) => (
            <div key={k} className="flex gap-12 shrink-0 items-center">
              {[
                "Torenza",
                "✦",
                "Tunis, Tunisia",
                "✦",
                "36.8065° N, 10.1815° E",
                "✦",
                "Torenza Studio®",
                "✦",
                "Stay bold. Stay rare.",
                "✦",
                "Not fashion — a lifestyle",
                "✦",
              ].map((w, i) => (
                <span key={i}>{w}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="kt-divider" />
    </div>
  );
}
