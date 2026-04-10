import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16">
      <div className="kt-divider" />
      <div className="max-w-[140rem] mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <p className="text-ink font-bold tracking-[0.2em] uppercase text-sm">Torenza</p>
            <p className="mt-3 text-mute text-sm leading-relaxed max-w-[28ch]">
              Small-batch streetwear from Tunis. Cash on delivery.
            </p>
          </div>

          <div>
            <p className="kt-label text-mute/80 mb-4">Navigate</p>
            <ul className="space-y-2 text-sm">
              {[
                ["/", "Home"],
                ["/lookbook", "Lookbook"],
                ["/shop", "Archive"],
                ["/cart", "Cart"],
                ["/about", "Info"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-mute hover:text-ink transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="kt-label text-mute/80 mb-4">Follow us</p>
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
              Instagram
            </a>
          </div>

          <div>
            <p className="kt-label text-mute/80 mb-4">Contact</p>
            <ul className="space-y-2 text-sm text-mute">
              <li>hello@torenza.studio</li>
              <li>Tunis, TN</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="kt-divider" />
      <div className="max-w-[140rem] mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row justify-between gap-2 kt-label text-mute/60">
        <p>© {new Date().getFullYear()} Torenza Studio</p>
        <p>36.8065° N, 10.1815° E</p>
      </div>
    </footer>
  );
}
