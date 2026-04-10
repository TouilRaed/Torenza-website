import productsData from "../../content/products.json";

export type Product = {
  slug: string;
  name: string;
  price: number;
  comparePrice?: number;
  currency: string;
  category: "tops" | "bottoms" | "outerwear" | "accessories";
  tagline: string;
  description: string;
  sizes: string[];
  images: string[];
  featured: boolean;
  status?: "sold-out" | "new-drop";
};

const products = productsData as Product[];

export function getAllProducts(): Product[] {
  return products;
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCategories(): string[] {
  return Array.from(new Set(products.map((p) => p.category)));
}

export function formatPrice(price: number, currency = "DT"): string {
  return `${price.toLocaleString("en-US")} ${currency}`;
}
