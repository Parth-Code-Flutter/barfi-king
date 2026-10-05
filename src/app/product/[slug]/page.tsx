import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/features/catalog/data";
import { ProductView } from "@/features/product/product-view";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "મીઠાઈ" };
  return { title: product.name.gu, description: product.name.en };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return <ProductView product={product} />;
}
