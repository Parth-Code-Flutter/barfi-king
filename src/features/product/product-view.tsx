"use client";

import Link from "next/link";
import { useState } from "react";
import { BuyBox } from "@/components/buy-box";
import { CheckIcon, PhoneIcon } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { siteConfig } from "@/config/site";
import { getCategory, productsInCategory } from "@/features/catalog/data";
import { priceLabel, portions } from "@/features/catalog/format";
import type { Product } from "@/features/catalog/types";
import { useLanguage } from "@/features/i18n/language-provider";
import { CounterScale } from "@/features/product/counter-scale";

export function ProductView({ product }: { product: Product }) {
  const { lang, t, text } = useLanguage();
  const other = lang === "gu" ? "en" : "gu";
  const category = getCategory(product.category);
  const related = productsInCategory(product.category)
    .filter((item) => item.slug !== product.slug)
    .slice(0, 4);
  const choices = portions(product, "home");
  const preferred = choices.find((item) => item.id === "500g" || item.id === "pack-1") ?? choices[0];
  const [choiceId, setChoiceId] = useState(preferred.id);
  const choice = choices.find((item) => item.id === choiceId) ?? preferred;

  return (
    <div className="mx-auto max-w-6xl px-4 pb-12 pt-5">
      <nav className="flex flex-wrap items-center gap-2 text-sm font-bold text-muted" aria-label={t("details")}>
        <Link href="/shop" className="text-accent hover:underline">{t("shop")}</Link>
        <span aria-hidden="true">/</span>
        <Link href={`/shop#${product.category}`} className="text-accent hover:underline">
          {category ? text(category.name) : t("backToShop")}
        </Link>
        <span aria-hidden="true">/</span>
        <span className="truncate text-foreground">{product.name[lang]}</span>
      </nav>

      <div className="mt-4 grid items-start gap-6 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
        <div className="kesar-strands rounded-[2.2rem] bg-butter-soft px-5 pb-6 pt-8 ring-1 ring-butter sm:px-8 lg:sticky lg:top-[calc(var(--header-h)+1rem)]">
          <CounterScale product={product} choice={choice} photo={category?.photo ?? "/sweets/peda.jpg"} />
        </div>

        <div className="flex flex-col lg:pt-4">
          <div className="flex flex-wrap items-center gap-2">
            {category ? (
              <Link href={`/shop#${product.category}`} className="rounded-full bg-kesar-soft px-3 py-1 text-sm font-extrabold text-accent">
                {text(category.name)}
              </Link>
            ) : null}
            {product.sugarFree ? (
              <span className="rounded-full bg-pista-soft px-3 py-1 text-sm font-extrabold text-pista-deep">{t("sugarFree")}</span>
            ) : null}
          </div>
          <h1 className="mt-3 text-5xl font-extrabold leading-[1.1] text-thabdi md:text-6xl">{product.name[lang]}</h1>
          <p className="mt-1 text-lg font-bold text-muted">{product.name[other]}</p>
          {category ? <p className="mt-4 max-w-lg text-lg leading-relaxed text-foreground/80">{text(category.promise)}</p> : null}

          <p className="mt-5 inline-flex w-fit -rotate-1 items-baseline gap-2 rounded-2xl bg-surface px-4 py-2 shadow-sm ring-1 ring-border">
            <span className="text-sm font-bold text-muted">{t("price")}</span>
            <span className="font-display text-3xl font-extrabold text-accent">{priceLabel(product, lang)}</span>
            {product.packSize ? <span className="text-sm font-bold text-muted">· {text(product.packSize)}</span> : null}
          </p>

          <section className="mt-7" aria-labelledby="order-product-title">
            <h2 id="order-product-title" className="text-2xl font-extrabold text-thabdi">{t("orderThis")}</h2>
            <p className="mt-1 text-sm font-bold text-muted">{product.unit === "pack" ? t("packHint") : t("weightHint")}</p>
            <div className="mt-3">
              <BuyBox product={product} choices={choices} choice={choice} onChoose={setChoiceId} />
            </div>
          </section>

          <ul className="mt-6 grid gap-2 sm:grid-cols-3">
            {[t("trust1"), t("trust3"), t("trust4")].map((label) => (
              <li key={label} className="flex items-center gap-2 rounded-2xl bg-pista-soft/70 px-3 py-3 text-sm font-extrabold text-pista-deep">
                <CheckIcon className="h-5 w-5 shrink-0 text-pista" />
                {label}
              </li>
            ))}
          </ul>

          <a
            href={`tel:${siteConfig.orderPhone.tel}`}
            className="mt-5 flex items-center justify-center gap-2 rounded-full bg-surface px-5 py-3.5 text-base font-extrabold text-thabdi ring-2 ring-butter transition hover:bg-butter-soft"
          >
            <PhoneIcon className="h-5 w-5" />
            {t("call")} · {siteConfig.orderPhone.display}
          </a>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-14">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="section-kicker">{category ? text(category.name) : t("shop")}</p>
              <h2 className="mt-1 text-4xl font-extrabold text-thabdi">{t("related")}</h2>
            </div>
            <Link href={`/shop#${product.category}`} className="rounded-full bg-butter px-4 py-2.5 text-sm font-extrabold text-thabdi">
              {t("seeGoods")} →
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
