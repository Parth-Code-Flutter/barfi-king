"use client";

import Image from "next/image";
import Link from "next/link";
import { getCategory } from "@/features/catalog/data";
import { inr } from "@/features/catalog/format";
import type { Product } from "@/features/catalog/types";
import { useLanguage } from "@/features/i18n/language-provider";

export function ProductCard({ product }: { product: Product }) {
  const { lang, t, text } = useLanguage();
  const other = lang === "gu" ? "en" : "gu";
  const category = getCategory(product.category);

  return (
    <article className="group relative flex items-center gap-4 rounded-[1.7rem] bg-surface p-4 ring-1 ring-border transition hover:-translate-y-1 hover:shadow-xl hover:shadow-thabdi/10 hover:ring-kesar/40">
      <span className="relative block h-24 w-24 shrink-0 overflow-hidden rounded-full shadow-md ring-4 ring-butter-soft transition duration-300 group-hover:rotate-6">
        {category ? <Image src={category.photo} alt="" fill sizes="96px" className="object-cover" /> : null}
      </span>
      <div className="min-w-0 flex-1">
        <Link href={`/product/${product.slug}`} className="after:absolute after:inset-0 after:rounded-[1.7rem]">
          <span className="block font-display text-2xl font-extrabold leading-tight text-thabdi group-hover:text-accent">{product.name[lang]}</span>
        </Link>
        <span className="block text-sm font-bold text-muted">{product.name[other]}</span>
        <span className="mt-2 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-kesar-soft px-3 py-1 text-sm font-extrabold text-accent">
            {product.price == null ? t("askPrice") : inr(product.price)}
            {product.price != null ? <span className="ml-1 text-xs font-bold text-muted">{product.unit === "pack" ? t("perPack") : t("perKg")}</span> : null}
          </span>
          {product.packSize ? <span className="text-xs font-bold text-muted">{text(product.packSize)}</span> : null}
          {product.sugarFree ? <span className="rounded-full bg-pista-soft px-2 py-1 text-xs font-extrabold text-pista-deep">{t("sugarFree")}</span> : null}
        </span>
      </div>
      <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent font-extrabold text-accent-foreground transition group-hover:translate-x-1">→</span>
    </article>
  );
}
