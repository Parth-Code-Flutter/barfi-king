"use client";

import { MinusIcon, PlusIcon } from "@/components/icons";
import { inr, portionAmount, portions } from "@/features/catalog/format";
import type { Product } from "@/features/catalog/types";
import { useLanguage } from "@/features/i18n/language-provider";
import { useOrder } from "@/features/order/order-provider";

export function PortionPicker({ product }: { product: Product }) {
  const { lang, t, text } = useLanguage();
  const { audience, lines, addLine, setCount } = useOrder();

  return (
    <div className="grid grid-cols-3 gap-2">
      {portions(product, audience).map((portion) => {
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
    </div>
  );
}
