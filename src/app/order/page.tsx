import type { Metadata } from "next";
import { OrderSheet } from "@/features/order/order-sheet";

export const metadata: Metadata = {
  title: "ઓર્ડર",
};

export default function Page() {
  return <OrderSheet />;
}
