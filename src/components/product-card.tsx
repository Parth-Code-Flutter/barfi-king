"use client";

import Image from "next/image";
import Link from "next/link";
import { getCategory } from "@/features/catalog/data";
import { priceLabel } from "@/features/catalog/format";
import type { Product } from "@/features/catalog/types";
import { useLanguage } from "@/features/i18n/language-provider";

export function ProductCard({ product }: { product: Product }) {
  const { lang, t, text } = useLanguage();
  const other = lang === "gu" ? "en" : "gu";
  const category = getCategory(product.category);

  return (
    <article className="group flex overflow-hidden rounded-[1.7rem] bg-surface ring-1 ring-border transition hover:-translate-y-1 hover:shadow-xl sm:flex-col">
      <Link href={`/product/${product.slug}`} className="relative block w-32 shrink-0 overflow-hidden bg-background sm:aspect-[4/3] sm:w-full">
        {category ? (
          <Image
            src={category.photo}
            alt={text(product.name)}
            fill
            sizes="(max-width: 640px) 128px, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : null}
        <span className="absolute left-2 top-2 hidden rounded-full bg-surface/95 px-2.5 py-1 text-xs font-extrabold text-accent backdrop-blur sm:block">
          {category ? text(category.name) : t("shop")}
        </span>
      </Link>

      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <Link href={`/product/${product.slug}`} className="min-w-0 hover:text-accent">
            <span className="block text-xl font-extrabold leading-tight sm:text-2xl">{product.name[lang]}</span>
            <span className="mt-1 block text-sm font-bold text-muted">{product.name[other]}</span>
          </Link>
          {product.sugarFree ? <span className="rounded-full bg-gold-soft px-2 py-1 text-xs font-extrabold text-gold">{t("sugarFree")}</span> : null}
        </div>
        <p className="mt-3 text-lg font-extrabold text-accent">{priceLabel(product, lang)}</p>
        {product.packSize ? <p className="mt-0.5 text-sm font-bold text-muted">{text(product.packSize)}</p> : null}
        <Link
          href={`/product/${product.slug}`}
          className="mt-auto pt-4 text-sm font-extrabold text-gold transition group-hover:text-accent"
        >
          {t("details")} →
        </Link>
      </div>
    </article>
  );
}
