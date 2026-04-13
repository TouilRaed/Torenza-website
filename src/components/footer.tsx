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
              Small-batch streetwear from Sousse. Cash on delivery.
            </p>
          </div>

          <div>
            <p className="kt-label text-mute/80 mb-4">Navigate</p>
            <ul className="space-y-2 text-sm">
              {[
                ["/", "Home"],
                ["/lookbook", "Explore"],
                ["/shop", "Shop"],
                ["/about", "Info"],
                ["/cart", "Cart"],
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
            <div className="flex flex-wrap gap-2">
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
              <a
                href="https://www.tiktok.com/@torenzastudio"
                target="_blank"
                rel="noreferrer noopener"
                className="kt-pill text-[9px] gap-2"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M14 5c.7 1.9 2 3.1 4 3.6v2.2c-1.5-.1-2.8-.6-4-1.4v5.5a5 5 0 1 1-4.2-4.9" />
                </svg>
                TikTok
              </a>
            </div>
          </div>
          
          

          <div>
            <p className="kt-label text-mute/80 mb-4">Contact</p>
            <ul className="space-y-2 text-sm text-mute">
              <li>hello@torenza.studio</li>
              <li>Sousse, TN</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="kt-divider" />
      <div className="max-w-[140rem] mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row justify-between gap-2 kt-label text-mute/60">
        <p>© {new Date().getFullYear()} Torenza Studio</p>
        <p>35.8256° N, 10.6369° E</p>
      </div>
    </footer>
  );
}
