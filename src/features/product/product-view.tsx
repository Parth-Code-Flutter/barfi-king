"use client";

import Image from "next/image";
import Link from "next/link";
import { BuyBox } from "@/components/buy-box";
import { CheckIcon, PhoneIcon } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { siteConfig } from "@/config/site";
import { getCategory, productsInCategory } from "@/features/catalog/data";
import { priceLabel } from "@/features/catalog/format";
import type { Product } from "@/features/catalog/types";
import { useLanguage } from "@/features/i18n/language-provider";

export function ProductView({ product }: { product: Product }) {
  const { lang, t, text } = useLanguage();
  const other = lang === "gu" ? "en" : "gu";
  const category = getCategory(product.category);
  const related = productsInCategory(product.category)
    .filter((item) => item.slug !== product.slug)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-12 pt-5">
      <nav className="flex flex-wrap items-center gap-2 text-sm font-bold text-muted" aria-label={t("details")}>
        <Link href="/shop" className="text-gold hover:text-accent">{t("shop")}</Link>
        <span aria-hidden="true">/</span>
        <Link href={`/shop#${product.category}`} className="text-gold hover:text-accent">
          {category ? text(category.name) : t("backToShop")}
        </Link>
        <span aria-hidden="true">/</span>
        <span className="truncate text-foreground">{product.name[lang]}</span>
      </nav>

      <div className="mt-4 overflow-hidden rounded-[2rem] bg-surface ring-1 ring-border lg:grid lg:grid-cols-[minmax(22rem,0.9fr)_1.1fr]">
        <div className="relative min-h-[20rem] bg-accent md:min-h-[28rem]">
          {category ? (
            <Image
              src={category.photo}
              alt={text(product.name)}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          ) : null}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-5 pt-16 text-white md:p-7">
            <p className="inline-flex rounded-full bg-white/90 px-3 py-1 text-sm font-extrabold text-accent backdrop-blur">
              {category ? text(category.name) : t("shop")}
            </p>
            {category ? <p className="mt-3 max-w-lg text-base font-bold leading-relaxed text-white/90">{text(category.promise)}</p> : null}
          </div>
        </div>

        <div className="flex flex-col p-5 md:p-8 lg:p-10">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">{product.name[lang]}</h1>
              <p className="mt-1 text-lg font-bold text-muted">{product.name[other]}</p>
            </div>
            {product.sugarFree ? (
              <span className="rounded-full bg-gold-soft px-3 py-1.5 text-sm font-extrabold text-gold">{t("sugarFree")}</span>
            ) : null}
          </div>

          <div className="mt-6 rounded-[1.4rem] bg-background p-4 ring-1 ring-border">
            <p className="text-sm font-bold text-muted">{t("price")}</p>
            <p className="mt-0.5 text-4xl font-extrabold text-accent">{priceLabel(product, lang)}</p>
            {product.packSize ? <p className="mt-1 font-bold text-muted">{text(product.packSize)}</p> : null}
          </div>

          <section className="mt-6" aria-labelledby="order-product-title">
            <h2 id="order-product-title" className="text-2xl font-extrabold">{t("orderThis")}</h2>
            <p className="mt-1 text-sm font-bold text-muted">{product.unit === "pack" ? t("packHint") : t("weightHint")}</p>
            <div className="mt-3">
              <BuyBox product={product} />
            </div>
          </section>

          <div className="mt-6 grid gap-2 sm:grid-cols-3">
            {[t("trust1"), t("trust3"), t("trust4")].map((label) => (
              <div key={label} className="flex items-center gap-2 rounded-2xl bg-background px-3 py-3 text-sm font-extrabold">
                <CheckIcon className="h-5 w-5 shrink-0 text-gold" />
                {label}
              </div>
            ))}
          </div>

          <a
            href={`tel:${siteConfig.orderPhone.tel}`}
            className="mt-5 flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3.5 text-base font-extrabold text-accent hover:bg-gold-soft"
          >
            <PhoneIcon className="h-5 w-5" />
            {t("call")} · {siteConfig.orderPhone.display}
          </a>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-10 rounded-[2rem] bg-surface/60 p-4 ring-1 ring-border sm:p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-extrabold text-gold">{category ? text(category.name) : t("shop")}</p>
              <h2 className="mt-1 text-3xl font-extrabold">{t("related")}</h2>
            </div>
            <Link
              href={`/shop#${product.category}`}
              className="rounded-full bg-gold-soft px-4 py-2.5 text-sm font-extrabold text-accent"
            >
              {t("seeGoods")} →
            </Link>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
