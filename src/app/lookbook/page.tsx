import Image from "next/image";

export const metadata = { title: "Lookbook — Torenza Studio" };

export default function LookbookPage() {
  const images = [
    "/lookbook/look-1.jpg",
    "/lookbook/look-2.jpg",
  ];

  return (
    <section className="pb-28">
      <div className="px-4 md:px-8 rise">
        <p className="kt-label text-accent flex items-center gap-2">
          <span className="dot-live" /> Lookbook
        </p>
        <h1 className="mt-4 text-4xl md:text-[7rem] leading-[0.84] tracking-[-0.03em] font-bold uppercase text-ink">
          Lookbook.
        </h1>
        <p className="mt-4 text-sm text-mute leading-relaxed max-w-lg">
          Inspired by street culture, underground art, and the energy of a new generation.
        </p>
      </div>

      <div className="mt-10 space-y-[2px]">
        {images.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt={`Torenza Studio lookbook ${i + 1}`}
            width={1920}
            height={1080}
            sizes="100vw"
            className="w-full h-auto"
          />
        ))}
      </div>
    </section>
  );
}
