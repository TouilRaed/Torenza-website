import { CheckoutForm } from "../../components/checkout-form";

export const metadata = { title: "Checkout — Torenza Studio" };

export default function CheckoutPage() {
  return (
    <section className="pb-28 px-5 md:px-8">
      <div className="max-w-[140rem] mx-auto">
        <p className="kt-label text-accent flex items-center gap-2">
          <span className="dot-live" /> Secure channel
        </p>
        <h1 className="mt-4 mb-10 text-5xl md:text-[8rem] leading-[0.84] tracking-[-0.03em] font-bold uppercase text-ink">
          Checkout.
        </h1>
        <CheckoutForm />
      </div>
    </section>
  );
}
