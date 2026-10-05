import type { Lang } from "@/features/i18n/copy";
import type { Product } from "@/features/catalog/types";
import { copy } from "@/features/i18n/copy";

export function inr(amount: number) {
  const body = Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `₹${body}`;
}

export type Portion = {
  id: string;
  label: { gu: string; en: string };
  factor: number;
};

export function portions(product: Product, audience: "home" | "trade"): Portion[] {
  if (product.unit === "pack") {
    const counts = audience === "trade" ? [5, 10, 20] : [1, 2, 5];
    return counts.map((count) => ({
      id: `pack-${count}`,
      label: {
        gu: count === 1 ? "1 પેકેટ" : `${count} પેકેટ`,
        en: count === 1 ? "1 packet" : `${count} packets`,
      },
      factor: count,
    }));
  }

  if (audience === "trade") {
    return [
      { id: "1kg", label: { gu: "1 કિલો", en: "1 kg" }, factor: 1 },
      { id: "2kg", label: { gu: "2 કિલો", en: "2 kg" }, factor: 2 },
      { id: "5kg", label: { gu: "5 કિલો", en: "5 kg" }, factor: 5 },
    ];
  }

  return [
    { id: "250g", label: { gu: "250 ગ્રામ", en: "250 gram" }, factor: 0.25 },
    { id: "500g", label: { gu: "500 ગ્રામ", en: "500 gram" }, factor: 0.5 },
    { id: "1kg", label: { gu: "1 કિલો", en: "1 kg" }, factor: 1 },
  ];
}

export function portionAmount(product: Product, factor: number) {
  if (product.price == null) return null;
  return Math.round(product.price * factor);
}

export function priceLabel(product: Product, lang: Lang) {
  if (product.price == null) return copy[lang].askPrice;
  const unit = product.unit === "kg" ? copy[lang].perKg : copy[lang].perPack;
  return `${inr(product.price)} · ${unit}`;
}

export function orderScript(product: Product, lang: Lang) {
  const name = product.name[lang];
  if (lang === "gu") {
    return product.unit === "pack" ? `${name}, એક પેકેટ` : `${name}, 500 ગ્રામ`;
  }
  return product.unit === "pack" ? `${name}, one packet` : `${name}, 500 grams`;
}

export function orderMessage(product: Product, lang: Lang) {
  const script = orderScript(product, lang);
  return lang === "gu" ? `નમસ્તે, મારે ${script} જોઈએ છે.` : `Hello, I would like ${script}.`;
}
