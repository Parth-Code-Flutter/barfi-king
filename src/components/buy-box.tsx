"use client";

import { useState } from "react";
import { inr, portionAmount, portions } from "@/features/catalog/format";
import type { Product } from "@/features/catalog/types";
import { useLanguage } from "@/features/i18n/language-provider";
import { useOrder } from "@/features/order/order-provider";

export function BuyBox({ product }: { product: Product }) {
  const { lang, t } = useLanguage();
  const { audience, lines, addLine } = useOrder();
  const choices = portions(product, audience);
  const preferred = choices.find((item) => item.id === "500g" || item.id === "pack-1" || item.id === "1kg");
  const [choiceId, setChoiceId] = useState(preferred?.id ?? choices[0]?.id ?? "");
  const [justAdded, setJustAdded] = useState(false);
  const choice = choices.find((item) => item.id === choiceId) ?? choices[0];
  const amount = choice ? portionAmount(product, choice.factor) : null;
  const lineId = choice ? `${product.slug}-${choice.id}` : "";
  const inCart = lines.find((line) => line.id === lineId)?.count ?? 0;

  function add() {
    if (!choice) return;
    addLine({
      id: `${product.slug}-${choice.id}`,
      slug: product.slug,
      name: product.name,
      qty: choice.label,
      amount,
    });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 900);
  }

  return (
    <div>
      <div className="mt-3 flex flex-wrap gap-2">
        {choices.map((item) => {
          const itemAmount = portionAmount(product, item.factor);
          const selected = item.id === choice?.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={selected}
              className={`rounded-full px-3 py-2 text-sm font-extrabold ${selected ? "bg-accent text-accent-foreground" : "bg-background text-foreground ring-1 ring-border"}`}
              onClick={() => setChoiceId(item.id)}
            >
              {item.label[lang]}
              <span className="ml-1 font-bold opacity-80">{itemAmount == null ? "" : inr(itemAmount)}</span>
            </button>
          );
        })}
      </div>
      <button
        type="button"
        className={`mt-3 w-full rounded-full px-4 py-3 text-base font-extrabold ${justAdded ? "bg-gold text-white" : "bg-accent text-accent-foreground"}`}
        onClick={add}
      >
        {justAdded ? t("added") : t("add")}
        {inCart > 0 ? ` · ${inCart}` : ""}
      </button>
    </div>
  );
}
