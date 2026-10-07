import type { Metadata } from "next";
import { ShopBrowser } from "@/features/shop/shop-browser";

export const metadata: Metadata = {
  title: "મીઠાઈ અને નમકીન",
};

export default function ShopPage() {
  return <ShopBrowser />;
}
