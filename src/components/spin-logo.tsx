import Link from "next/link";
import Image from "next/image";

export function SpinLogo() {
  return (
    <div className="pt-[110px] md:pt-[85px] flex flex-col items-center py-10 md:py-14">
      <Link href="/" className="logo-spin-scene cursor-pointer">
        <div className="logo-spin">
          <Image
            src="/logo.webp"
            alt="Torenza Studio"
            width={120}
            height={120}
            className="w-[90px] md:w-[120px] h-auto invert opacity-30 hover:opacity-50 transition-opacity"
          />
        </div>
      </Link>
    </div>
  );
}
