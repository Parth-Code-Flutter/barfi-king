"use client";

import { useState } from "react";
import { MinusIcon, PlusIcon } from "@/components/icons";
import { inr, portionAmount, portions } from "@/features/catalog/format";
import type { Product } from "@/features/catalog/types";
import { useLanguage } from "@/features/i18n/language-provider";
import { useOrder } from "@/features/order/order-provider";

export function PortionPicker({ product }: { product: Product }) {
  const { lang, t, text } = useLanguage();
  const { lines, addLine, setCount } = useOrder();
  const [customOpen, setCustomOpen] = useState(false);
  const [customValue, setCustomValue] = useState(product.unit === "kg" ? 750 : 3);

  const customFactor = product.unit === "kg" ? customValue / 1000 : customValue;
  const customAmount = portionAmount(product, customFactor);
  const customId = `${product.slug}-custom-${customValue}${product.unit === "kg" ? "g" : "pack"}`;
  const customLabel = product.unit === "kg"
    ? { gu: `${customValue} ગ્રામ`, en: `${customValue} grams` }
    : { gu: `${customValue} પેકેટ`, en: `${customValue} packets` };

  function addCustom() {
    const minimum = product.unit === "kg" ? 50 : 1;
    if (!Number.isFinite(customValue) || customValue < minimum) return;
    addLine({ id: customId, slug: product.slug, name: product.name, qty: customLabel, amount: customAmount });
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {portions(product, "home").map((portion) => {
        const id = `${product.slug}-${portion.id}`;
        const amount = portionAmount(product, portion.factor);
        const inOrder = lines.find((line) => line.id === id)?.count ?? 0;
        const what = `${text(product.name)}, ${portion.label[lang]}`;
        const add = () => addLine({ id, slug: product.slug, name: product.name, qty: portion.label, amount });

        if (inOrder > 0) {
          return (
            <div
              key={portion.id}
              className="flex min-h-[4.25rem] flex-col items-center justify-center rounded-2xl bg-accent px-1 py-1.5 leading-tight text-accent-foreground"
            >
              <span className="text-sm font-extrabold">{portion.label[lang]}</span>
              <div className="mt-1 flex w-full items-center justify-between gap-1">
                <button
                  type="button"
                  onClick={() => setCount(id, inOrder - 1)}
                  aria-label={`${t("oneLess")}: ${what}`}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold-soft text-accent transition active:scale-90"
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
                <span key={inOrder} className="bump text-lg font-extrabold" aria-live="polite">
                  {inOrder}
                </span>
                <button
                  type="button"
                  onClick={add}
                  aria-label={`${t("oneMore")}: ${what}`}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold text-white transition active:scale-90"
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        }

        return (
          <button
            key={portion.id}
            type="button"
            onClick={add}
            aria-label={`${t("add")}: ${what}${amount == null ? "" : `, ${inr(amount)}`}`}
            className="flex min-h-[4.25rem] flex-col items-center justify-center rounded-2xl bg-background px-1.5 py-2 leading-tight text-foreground ring-1 ring-border transition hover:ring-2 hover:ring-gold active:scale-95"
          >
            <span className="flex items-center gap-1 text-sm font-extrabold">
              <PlusIcon className="h-3.5 w-3.5 opacity-70" />
              {portion.label[lang]}
            </span>
            <span className="mt-0.5 text-xs font-bold text-muted">{amount == null ? t("priceOnCall") : inr(amount)}</span>
          </button>
        );
      })}
      <button
        type="button"
        onClick={() => setCustomOpen((value) => !value)}
        aria-expanded={customOpen}
        className="col-span-3 flex items-center justify-center gap-2 rounded-xl border border-dashed border-[#cf9dab] bg-rose-soft/60 px-3 py-2 text-sm font-extrabold text-rose-deep transition hover:bg-rose-soft"
      >
        <PlusIcon className="h-4 w-4" />{t("customQuantity")}
      </button>
      {customOpen ? (
        <div className="col-span-3 grid grid-cols-[1fr_auto] gap-2 rounded-2xl bg-background p-2 ring-1 ring-border">
          <label className="flex min-w-0 items-center rounded-xl bg-surface px-3 ring-1 ring-border focus-within:ring-2 focus-within:ring-rose">
            <input
              type="number"
              min={product.unit === "kg" ? 50 : 1}
              max={product.unit === "kg" ? 10000 : 100}
              step={product.unit === "kg" ? 50 : 1}
              value={customValue}
              onChange={(event) => setCustomValue(Number(event.target.value))}
              className="min-w-0 flex-1 bg-transparent py-2 font-extrabold outline-none"
              aria-label={t("customQuantity")}
            />
            <span className="text-xs font-bold text-muted">{product.unit === "kg" ? t("grams") : t("packets")}</span>
          </label>
          <button type="button" onClick={addCustom} className="rounded-xl bg-rose-deep px-4 py-2 text-sm font-extrabold text-white">
            <span className="block">{t("add")}</span>
            <span className="block text-[11px] text-white/75">{customAmount == null ? t("priceOnCall") : inr(customAmount)}</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
