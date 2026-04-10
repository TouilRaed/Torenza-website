"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  const show = useCallback(() => {
    setFading(false);
    setVisible(true);
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("torenza-entered")) {
      setVisible(false);
    }
    window.addEventListener("torenza-show-preloader", show);
    return () => window.removeEventListener("torenza-show-preloader", show);
  }, [show]);

  function enter() {
    setFading(true);
    sessionStorage.setItem("torenza-entered", "1");
    setTimeout(() => setVisible(false), 600);
  }

  if (!visible) return null;

  return (
    <div
      onClick={enter}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center cursor-pointer transition-opacity duration-500 ${fading ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      style={{ background: "#d9d9d9" }}
    >
      {/* Animated noise background */}
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/></svg>")`,
          animation: "drift 8s linear infinite",
        }}
      />

      <div className="relative flex flex-col items-center gap-6">
        {/* Spinning logo */}
        <div className="logo-spin-scene">
          <div className="logo-spin">
            <Image
              src="/logo.webp"
              alt="Torenza Studio"
              width={150}
              height={150}
              className="w-[150px] h-auto"
              priority
            />
          </div>
        </div>

        {/* Brand text */}
        <p style={{ color: "#9c9c9c", fontFamily: "var(--font-heading), monospace", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          Tunis, Tunisia / 36.8065° N, 10.1815° E
        </p>

        {/* Enter */}
        <button
          onClick={(e) => { e.stopPropagation(); enter(); }}
          className="mt-4 cursor-pointer bg-transparent border-0 outline-none hover:text-black transition-colors"
          style={{ color: "#9c9c9c", fontFamily: "var(--font-heading), monospace", fontSize: "14px", letterSpacing: "0.15em" }}
        >
          [ Enter ]
        </button>

        <p
          className="absolute -bottom-20"
          style={{ color: "#9c9c9c", fontFamily: "var(--font-heading), monospace", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase" }}
        >
          © {new Date().getFullYear()} Torenza Studio
        </p>
      </div>
    </div>
  );
}
