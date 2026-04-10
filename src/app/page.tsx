import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Statement */}
      <section className="py-20 md:py-32 px-6 text-center">
        <h2 className="text-3xl md:text-6xl font-bold uppercase tracking-tight text-ink leading-[1.1]">
          Stay bold. Stay rare.
        </h2>
        <p className="mt-4 text-base md:text-lg text-mute tracking-wide">
          Torenza isn&apos;t fashion — it&apos;s a lifestyle.
        </p>
        <p className="mt-6 text-sm text-mute/70 leading-relaxed max-w-xl mx-auto">
          Inspired by street culture, underground art, and the energy of a new generation, Torenza transforms clothing into wearable art. Every design tells a story, every detail has a purpose.
        </p>
      </section>

      <div className="kt-divider" />

      {/* Lookbook */}
      <section className="py-12 md:py-20">
        <p className="kt-label text-mute/70 tracking-[0.25em] text-center mb-8">Lookbook</p>
        <div className="space-y-[2px]">
          <Image
            src="/lookbook/look-1.jpg"
            alt="Torenza Studio lookbook"
            width={1920}
            height={1080}
            sizes="100vw"
            className="w-full h-auto"
          />
          <Image
            src="/lookbook/look-2.jpg"
            alt="Torenza Studio lookbook"
            width={1920}
            height={1080}
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>
      </section>

      <div className="kt-divider" />

      {/* Promises */}
      <section className="px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-white/[0.12]">
          {[
            { t: "Cash on delivery", b: "Pay only when your order is in your hands. No card, no risk." },
            { t: "Limited runs", b: "We do not restock. When a piece is gone, it stays archived." },
            { t: "Honest materials", b: "Heavyweight cottons, deep black finishes. Built to age with you." },
          ].map((c, i) => (
            <div key={i} className="bg-black p-8 md:p-10">
              <p className="kt-label text-accent">0{i + 1}</p>
              <h3 className="mt-4 text-xl md:text-2xl text-ink font-bold uppercase tracking-tight">
                {c.t}
              </h3>
              <p className="mt-3 text-sm text-mute leading-relaxed">{c.b}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
