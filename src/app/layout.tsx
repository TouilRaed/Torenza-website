import type { Metadata } from "next";
import { Anonymous_Pro, Space_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Preloader } from "../components/preloader";
import { SpinLogo } from "../components/spin-logo";
import { Marquee } from "../components/marquee";

const body = Anonymous_Pro({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const heading = Space_Mono({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Torenza Studio — Bold streetwear, made with purpose",
  description:
    "Bold streetwear crafted for those who move differently and dress with purpose. Cash on delivery across the country.",
  metadataBase: new URL("https://torenza.studio"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${heading.variable} h-full`}
    >
      <body className="grain min-h-full flex flex-col bg-background text-foreground">
        <Preloader />
        <Marquee />
        <Header />
        <SpinLogo />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
