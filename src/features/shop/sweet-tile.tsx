"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckIcon, MinusIcon, PlusIcon } from "@/components/icons";
import { inr, portionAmount, portions } from "@/features/catalog/format";
import { MithaiArt, mithaiTint } from "@/features/catalog/mithai-art";
import type { Product } from "@/features/catalog/types";
import { useLanguage } from "@/features/i18n/language-provider";
import { useOrder } from "@/features/order/order-provider";
import { shopCopy } from "@/features/shop/shop-copy";

const CUSTOM = "custom";

export function SweetTile({ product }: { product: Product }) {
  const { lang, t, text } = useLanguage();
  const { lines, addLine, setCount } = useOrder();
  const byKg = product.unit === "kg";
  const choices = portions(product, "home");
  const [choice, setChoice] = useState(byKg ? choices[1].id : choices[0].id);
  const [custom, setCustom] = useState(byKg ? 750 : 3);

  const step = byKg ? 50 : 1;
  const min = byKg ? 50 : 1;
  const max = byKg ? 10000 : 100;
  const isCustom = choice === CUSTOM;
  const portion = choices.find((item) => item.id === choice) ?? choices[0];
  const factor = isCustom ? (byKg ? custom / 1000 : custom) : portion.factor;
  const id = isCustom ? `${product.slug}-custom-${custom}${byKg ? "g" : "pack"}` : `${product.slug}-${portion.id}`;
  const label = isCustom
    ? byKg
      ? { gu: `${custom} ગ્રામ`, en: `${custom} grams` }
      : { gu: `${custom} પેકેટ`, en: `${custom} packets` }
    : portion.label;
  const amount = portionAmount(product, factor);
  const count = lines.find((line) => line.id === id)?.count ?? 0;
  const inBox = lines.filter((line) => line.slug === product.slug).reduce((sum, line) => sum + line.count, 0);
  const name = text(product.name);
  const other = lang === "gu" ? product.name.en : product.name.gu;

  const clamp = (value: number) => (Number.isFinite(value) ? Math.min(max, Math.max(min, Math.round(value))) : min);
  const valid = !isCustom || (Number.isFinite(custom) && custom >= min && custom <= max);
  const add = () => {
    if (valid) addLine({ id, slug: product.slug, name: product.name, qty: label, amount });
  };
  const nudge = (direction: 1 | -1) => setCustom((value) => clamp(value + direction * step));

  return (
    <li className="group relative grid grid-cols-[6.5rem_1fr] gap-x-4 gap-y-3 rounded-[1.75rem] bg-surface p-3 ring-1 ring-border transition hover:shadow-xl hover:shadow-thabdi/10 hover:ring-kesar/40 sm:grid-cols-1 sm:gap-y-0 sm:overflow-hidden sm:p-0">
      <Link
        href={`/product/${product.slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className="relative grid aspect-square place-items-center overflow-hidden rounded-2xl sm:aspect-[16/10] sm:rounded-none"
        style={{ background: mithaiTint(product) }}
      >
        <span className="absolute inset-x-6 bottom-2 h-6 rounded-full bg-thabdi/10 blur-md sm:bottom-4" />
        <MithaiArt
          product={product}
          className="relative h-[92%] w-[92%] transition duration-300 group-hover:-translate-y-1 group-hover:-rotate-2 sm:h-[82%] sm:w-[82%]"
        />
        {product.sugarFree ? (
          <span className="absolute left-2 top-2 rounded-full bg-pista px-2 py-0.5 text-[11px] font-extrabold text-white sm:left-3 sm:top-3 sm:text-xs">
            {t("sugarFree")}
          </span>
        ) : null}
      </Link>

      {inBox > 0 ? (
        <span
          key={inBox}
          className="bump absolute left-2 top-2 z-10 flex items-center gap-1 rounded-full bg-pista-deep px-2 py-1 text-[11px] font-extrabold text-white shadow-md sm:left-auto sm:right-3 sm:top-3 sm:text-xs"
        >
          <CheckIcon className="h-3 w-3" />
          {shopCopy.inBox(inBox, lang)}
        </span>
      ) : null}

      <div className="min-w-0 self-center sm:px-4 sm:pt-4">
        <h3 className="text-xl font-extrabold leading-tight text-thabdi">
          <Link href={`/product/${product.slug}`} className="hover:text-accent">
            {name}
          </Link>
        </h3>
        <p className="mt-0.5 truncate text-sm font-bold text-muted">
          {other}
          {product.packSize ? ` · ${text(product.packSize)}` : ""}
        </p>
        <p className="mt-2 font-display text-2xl font-extrabold leading-none text-accent">
          {product.price == null ? (
            <span className="text-base">{t("priceOnCall")}</span>
          ) : (
            <>
              {inr(product.price)}
              <span className="ml-1 font-sans text-xs font-bold text-muted">/ {byKg ? t("perKg") : t("perPack")}</span>
            </>
          )}
        </p>
      </div>

      <div className="col-span-2 grid gap-2 sm:col-span-1 sm:p-4">
        <div role="radiogroup" aria-label={`${text(shopCopy.weight)}: ${name}`} className="grid grid-cols-4 gap-1 rounded-2xl bg-background p-1 ring-1 ring-border">
          {choices.map((item) => {
            const on = item.id === choice;
            const price = portionAmount(product, item.factor);
            return (
              <button
                key={item.id}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setChoice(item.id)}
                className={`flex min-h-12 flex-col items-center justify-center rounded-xl px-1 leading-tight transition ${
                  on ? "bg-thabdi text-butter-soft shadow-md" : "text-foreground hover:bg-butter-soft"
                }`}
              >
                <span className="text-[13px] font-extrabold">{item.label[lang]}</span>
                <span className={`text-[11px] font-bold ${on ? "text-butter" : "text-muted"}`}>{price == null ? "—" : inr(price)}</span>
              </button>
            );
          })}
          <button
            type="button"
            role="radio"
            aria-checked={isCustom}
            onClick={() => setChoice(CUSTOM)}
            className={`flex min-h-12 flex-col items-center justify-center rounded-xl px-1 leading-tight transition ${
              isCustom ? "bg-thabdi text-butter-soft shadow-md" : "text-accent hover:bg-butter-soft"
            }`}
          >
            <span className="text-[13px] font-extrabold">{text(shopCopy.other)}</span>
            <span className={`text-[11px] font-bold ${isCustom ? "text-butter" : "text-muted"}`}>{byKg ? t("grams") : t("packets")}</span>
          </button>
        </div>

        {isCustom ? (
          <div className="flex items-center gap-2 rounded-2xl bg-kesar-soft/60 p-1.5 ring-1 ring-kesar/30">
            <button
              type="button"
              onClick={() => nudge(-1)}
              aria-label={t("oneLess")}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-surface text-accent ring-1 ring-border active:scale-90"
            >
              <MinusIcon className="h-4 w-4" />
            </button>
            <label className="flex min-w-0 flex-1 items-baseline justify-center gap-1">
              <input
                type="number"
                inputMode="numeric"
                min={min}
                max={max}
                step={step}
                value={custom}
                onChange={(event) => setCustom(Number(event.target.value))}
                onBlur={() => setCustom((value) => clamp(value))}
                aria-label={t("customQuantity")}
                className="w-16 bg-transparent text-center font-display text-xl font-extrabold text-thabdi outline-none"
              />
              <span className="text-xs font-bold text-muted">{byKg ? t("grams") : t("packets")}</span>
            </label>
            <button
              type="button"
              onClick={() => nudge(1)}
              aria-label={t("oneMore")}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground active:scale-90"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
        ) : null}

        {count > 0 ? (
          <div className="flex items-center justify-between gap-2 rounded-full bg-accent p-1.5 text-accent-foreground shadow-md shadow-accent/25">
            <button
              type="button"
              onClick={() => setCount(id, count - 1)}
              aria-label={`${t("oneLess")}: ${name}, ${label[lang]}`}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/20 transition hover:bg-white/30 active:scale-90"
            >
              <MinusIcon className="h-4 w-4" />
            </button>
            <span className="min-w-0 text-center text-sm font-extrabold leading-tight" aria-live="polite">
              {label[lang]} × <span key={count} className="bump inline-block">{count}</span>
              {amount == null ? null : <span className="block text-xs text-butter-soft/85">{inr(amount * count)}</span>}
            </span>
            <button
              type="button"
              onClick={add}
              aria-label={`${t("oneMore")}: ${name}, ${label[lang]}`}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-butter text-thabdi transition active:scale-90"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={add}
            disabled={!valid}
            aria-label={`${t("add")}: ${name}, ${label[lang]}${amount == null ? "" : `, ${inr(amount)}`}`}
            className="flex min-h-12 items-center justify-between gap-2 rounded-full bg-accent py-1.5 pl-5 pr-1.5 font-extrabold text-accent-foreground shadow-md shadow-accent/20 transition hover:bg-thabdi active:scale-[.98] disabled:opacity-50"
          >
            <span className="flex items-center gap-2">
              <PlusIcon className="h-4 w-4" />
              {t("add")}
            </span>
            <span className="rounded-full bg-butter px-3 py-1.5 text-sm text-thabdi">{amount == null ? label[lang] : inr(amount)}</span>
          </button>
        )}
      </div>
    </li>
  );
}
