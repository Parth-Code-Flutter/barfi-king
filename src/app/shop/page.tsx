import type { Metadata } from "next";
import { ShopBrowser } from "@/features/shop/shop-browser";

export const metadata: Metadata = {
  title: "મીઠાઈ અને નમકીન",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  return <ShopBrowser initialCategory={category} />;
}
