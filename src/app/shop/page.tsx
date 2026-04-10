import { ProductCard } from "../../components/product-card";
import { getAllProducts } from "../../lib/products";

export const metadata = { title: "Archive — Torenza Studio" };

export default function ShopPage() {
  const products = getAllProducts();

  return (
    <section className="pb-28 px-4 md:px-8">
      <div className="max-w-[140rem] mx-auto">
        <div className="rise">
          <p className="kt-label text-accent flex items-center gap-2">
            <span className="dot-live" /> {products.length} active pieces
          </p>
          <h1 className="mt-4 text-4xl md:text-[7rem] leading-[0.84] tracking-[-0.03em] font-bold uppercase text-ink">
            Archive.
          </h1>
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-5 md:gap-x-4 md:gap-y-6">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
