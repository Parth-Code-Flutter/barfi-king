"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getCategory } from "@/features/catalog/data";
import { inr, portionAmount, portions } from "@/features/catalog/format";
import type { Product } from "@/features/catalog/types";
import { useLanguage } from "@/features/i18n/language-provider";
import { useOrder } from "@/features/order/order-provider";

export function ProductCard({ product }: { product: Product }) {
  const { lang, t } = useLanguage();
  const { audience, addLine } = useOrder();
  const category = getCategory(product.category);
  const choices = portions(product, audience);
  const [choiceId, setChoiceId] = useState(choices[0]?.id ?? "");
  const choice = choices.find((item) => item.id === choiceId) ?? choices[0];
  const amount = choice ? portionAmount(product, choice.factor) : null;

  function add() {
    if (!choice) return;
    addLine({
      id: `${product.slug}-${choice.id}`,
      slug: product.slug,
      name: product.name,
      qty: choice.label,
      amount,
    });
  }

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-border bg-surface">
      <Link href={`/product/${product.slug}`} className="block">
        {category ? (
          <Image
            src={category.photo}
            alt=""
            width={640}
            height={640}
            className="h-40 w-full object-cover"
          />
        ) : null}
        <span className="block px-4 pt-4">
          <span className="block text-xl font-extrabold leading-snug">{product.name.gu}</span>
          <span className="mt-1 block text-sm font-bold text-muted">{product.name.en}</span>
        </span>
      </Link>
      {product.sugarFree ? <span className="px-4 pt-2 text-sm font-bold text-gold">{t("sugarFree")}</span> : null}
      <div className="mt-3 grid grid-cols-3 gap-2 px-4">
        {choices.map((item) => {
          const itemAmount = portionAmount(product, item.factor);
          const selected = item.id === choice?.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={selected}
              className={`rounded-2xl px-2 py-2 text-center ${selected ? "bg-accent text-accent-foreground" : "bg-background text-foreground"}`}
              onClick={() => setChoiceId(item.id)}
            >
              <span className="block text-sm font-extrabold leading-tight">{item.label[lang]}</span>
              <span className="mt-1 block text-xs font-bold">{itemAmount == null ? "—" : inr(itemAmount)}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-auto grid grid-cols-[1fr_auto] gap-2 p-4">
        <button
          type="button"
          className="rounded-2xl bg-accent px-3 py-3 text-base font-extrabold text-accent-foreground"
          onClick={add}
        >
          {t("add")}
        </button>
        <Link
          href={`/product/${product.slug}`}
          className="rounded-2xl bg-gold-soft px-4 py-3 text-center text-base font-extrabold text-accent"
        >
          {t("details")}
        </Link>
      </div>
    </article>
  );
}
