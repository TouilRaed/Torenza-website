import { notFound } from "next/navigation";
import Link from "next/link";
import { AddToCart } from "../../../components/add-to-cart";
import { ProductGallery } from "../../../components/product-gallery";
import { getAllProducts, getProductBySlug, formatPrice } from "../../../lib/products";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  return {
    title: p ? `${p.name} — Torenza Studio` : "Torenza Studio",
    description: p?.tagline,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <section className="pb-28 px-5 md:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/shop" className="kt-label text-mute hover:text-accent transition-colors">
          ← Back to archive
        </Link>

        {/* Product name on top */}
        <div className="mt-8 text-center rise">
          <h1 className="text-xl md:text-3xl leading-tight tracking-tight font-bold uppercase text-ink">
            {product.name}
          </h1>
        </div>

        {/* Gallery — centered, compact */}
        <div className="mt-6 rise max-w-sm mx-auto">
          <ProductGallery images={product.images} name={product.name} />
        </div>

        {/* Size + Add to cart */}
        <div className="mt-8 max-w-sm mx-auto">
          <AddToCart product={product} />
        </div>

        {/* Price + details below */}
        <div className="mt-8 max-w-sm mx-auto text-center rise">
          <p className="flex items-center justify-center gap-3">
            <span className="text-xl tabular-nums text-ink font-bold">
              {formatPrice(product.price, product.currency)}
            </span>
            {product.comparePrice && product.comparePrice > product.price && (
              <>
                <span className="text-sm tabular-nums text-mute line-through">
                  {formatPrice(product.comparePrice, product.currency)}
                </span>
                <span className="kt-label bg-accent text-background px-2 py-0.5">
                  −{Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}%
                </span>
              </>
            )}
          </p>
          <p className="mt-4 text-mute text-sm leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>
    </section>
  );
}
