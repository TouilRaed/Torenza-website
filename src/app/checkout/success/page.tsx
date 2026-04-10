import Link from "next/link";

export const metadata = { title: "Order received — Torenza Studio" };

export default function SuccessPage() {
  return (
    <section className="pt-40 pb-32 px-6 md:px-12 min-h-[60vh] flex items-center">
      <div className="max-w-3xl mx-auto panel p-1 w-full rise">
        <div className="edge bg-cream inner-glow p-12 md:p-16 text-center">
          <span className="mono-label inline-flex edge border-0 bg-ink/[0.04] px-3 py-1 text-ink/70">
            Order received
          </span>
          <h1 className="mt-6 text-5xl md:text-7xl leading-[0.9] text-ink tracking-tight font-semibold uppercase">
            Thank you.
          </h1>
          <p className="mt-6 text-mute max-w-md mx-auto leading-relaxed">
            We have your order. One of us will give you a call shortly to
            confirm the details. Pay in cash when your package is delivered.
          </p>
          <Link
            href="/shop"
            className="group mt-10 inline-flex items-center gap-2 edge bg-ink text-cream pl-6 pr-1 py-1 text-sm transition-transform duration-500 ease-[var(--ease-soft)] active:scale-[0.98]"
          >
            Continue browsing
            <span className="w-9 h-9 edge border-0 bg-cream/15 flex items-center justify-center transition-transform duration-500 ease-[var(--ease-soft)] group-hover:translate-x-0.5 group-hover:-translate-y-px mono-label text-[9px]">
              GO
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
