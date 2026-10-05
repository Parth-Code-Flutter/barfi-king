"use client";

import Image from "next/image";
import Link from "next/link";
import { BuyBox } from "@/components/buy-box";
import { getCategory } from "@/features/catalog/data";
import type { Product } from "@/features/catalog/types";
import { useLanguage } from "@/features/i18n/language-provider";

export function ProductCard({ product }: { product: Product }) {
  const { t } = useLanguage();
  const category = getCategory(product.category);

  return (
    <article className="flex gap-3 rounded-[1.6rem] bg-surface p-3 ring-1 ring-border">
      <Link href={`/product/${product.slug}`} className="shrink-0">
        {category ? (
          <Image
            src={category.photo}
            alt=""
            width={320}
            height={320}
            className="h-28 w-28 rounded-2xl object-cover"
          />
        ) : null}
      </Link>
      <div className="min-w-0 flex-1">
        <Link href={`/product/${product.slug}`} className="block">
          <span className="block text-xl font-extrabold leading-tight">{product.name.gu}</span>
          <span className="mt-0.5 block text-sm font-bold text-muted">{product.name.en}</span>
        </Link>
        {product.sugarFree ? <p className="mt-1 text-sm font-bold text-gold">{t("sugarFree")}</p> : null}
        <BuyBox product={product} />
      </div>
    </article>
  );
}
