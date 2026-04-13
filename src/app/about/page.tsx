export const metadata = { title: "Studio — Torenza Studio" };

export default function AboutPage() {
  return (
    <section className="pb-28 px-4 md:px-8">
      <div className="max-w-[140rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
          <div className="rise">
            <p className="kt-label text-accent flex items-center gap-2">
              <span className="dot-live" /> The Studio
            </p>
            <h1 className="mt-4 text-4xl md:text-[6rem] leading-[0.84] tracking-[-0.03em] font-bold uppercase text-ink">
              We build
              <br />
              honest gear.
            </h1>
          </div>
          <div className="rise" style={{ animationDelay: "120ms" }}>
            <p className="text-mute leading-relaxed">
              Torenza Studio is a small streetwear label based in Sousse. We
              design and produce in tight runs — usually under a hundred pieces
              per drop — so every garment gets the attention it deserves.
            </p>
            <p className="mt-4 text-mute leading-relaxed">
              No flashy logos. No restocks. Just heavyweight cottons, washed
              twills, and silhouettes that age with you.
            </p>
          </div>
        </div>

        <div className="kt-divider mt-16 mb-0" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-white/[0.12] mt-[1px]">
          {[
            ["01", "Design", "Sketched and patterned in-house in Sousse."],
            ["02", "Make", "Cut and sewn in small partner workshops."],
            ["03", "Deliver", "Shipped to your door — paid in cash on arrival."],
          ].map(([n, t, b]) => (
            <div key={n} className="bg-black p-8 md:p-10">
              <p className="kt-label text-accent">{n}</p>
              <h3 className="mt-4 text-2xl text-ink font-bold uppercase tracking-tight">
                {t}
              </h3>
              <p className="mt-3 text-sm text-mute leading-relaxed">{b}</p>
            </div>
          ))}
        </div>

        <div className="kt-divider mt-16 mb-0" />

        <div className="mt-[1px] bg-[#0a0a0a] p-10 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
          <h2 className="text-3xl md:text-5xl leading-[0.9] tracking-tight font-bold uppercase text-ink">
            Have a question?
          </h2>
          <div className="space-y-2 text-sm">
            <p className="kt-label text-mute">Reach us</p>
            <p className="text-ink">hello@torenza.studio</p>
            <p className="text-ink">Sousse, Tunisia</p>
            <p className="text-mute">Mon — Sat · 10:00 — 18:00</p>
            <p className="pt-2">
              <a
                href="https://www.instagram.com/torenza_studio/"
                target="_blank"
                rel="noreferrer noopener"
                className="kt-pill text-[9px] gap-2"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
                </svg>
                @torenza_studio
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
