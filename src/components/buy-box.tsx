"use client";

import { useState } from "react";
import { CheckIcon, PlusIcon } from "@/components/icons";
import { inr, portionAmount, type Portion } from "@/features/catalog/format";
import type { Product } from "@/features/catalog/types";
import { useLanguage } from "@/features/i18n/language-provider";
import { useOrder } from "@/features/order/order-provider";

type BuyBoxProps = {
  product: Product;
  choices: Portion[];
  choice: Portion;
  onChoose: (id: string) => void;
};

export function BuyBox({ product, choices, choice, onChoose }: BuyBoxProps) {
  const { lang, t } = useLanguage();
  const { lines, addLine } = useOrder();
  const [justAdded, setJustAdded] = useState(false);
  const amount = portionAmount(product, choice.factor);
  const lineId = `${product.slug}-${choice.id}`;
  const inCart = lines.find((line) => line.id === lineId)?.count ?? 0;

  function add() {
    addLine({ id: lineId, slug: product.slug, name: product.name, qty: choice.label, amount });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 900);
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label={t("orderThis")}>
        {choices.map((item) => {
          const itemAmount = portionAmount(product, item.factor);
          const selected = item.id === choice.id;
          return (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={selected}
              className={`rounded-2xl px-2 py-3 text-center leading-tight transition ${selected ? "bg-thabdi text-butter-soft shadow-lg shadow-thabdi/25" : "bg-surface text-foreground ring-1 ring-border hover:bg-butter-soft hover:ring-kesar/50"}`}
              onClick={() => onChoose(item.id)}
            >
              <span className="block font-extrabold">{item.label[lang]}</span>
              <span className={`mt-0.5 block text-sm font-bold ${selected ? "text-butter" : "text-muted"}`}>{itemAmount == null ? "—" : inr(itemAmount)}</span>
            </button>
          );
        })}
      </div>
      <button
        type="button"
        className={`mt-3 flex w-full items-center justify-center gap-2 rounded-full px-5 py-4 text-lg font-extrabold shadow-lg transition hover:-translate-y-0.5 ${justAdded ? "bg-pista text-white shadow-pista/30" : "bg-accent text-accent-foreground shadow-accent/30"}`}
        onClick={add}
      >
        {justAdded ? <CheckIcon className="h-5 w-5" /> : <PlusIcon className="h-5 w-5" />}
        {justAdded ? t("added") : t("add")} · {choice.label[lang]}
        {inCart > 0 ? <span className="rounded-full bg-white/20 px-2 py-0.5 text-sm">{inCart}</span> : null}
      </button>
    </div>
  );
}
