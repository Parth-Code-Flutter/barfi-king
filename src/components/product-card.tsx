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
    <article className="flex flex-col rounded-[1.8rem] bg-surface px-4 pb-4 pt-14 ring-1 ring-border">
      <Link href={`/product/${product.slug}`} className="mx-auto -mt-24 block w-fit">
        {category ? (
          <Image
            src={category.photo}
            alt=""
            width={240}
            height={240}
            className="h-28 w-28 rounded-full object-cover ring-[6px] ring-background"
          />
        ) : null}
      </Link>
      <Link href={`/product/${product.slug}`} className="mt-3 block text-center">
        <span className="block text-2xl font-extrabold leading-tight">{product.name.gu}</span>
        <span className="mt-1 block text-sm font-bold text-muted">{product.name.en}</span>
      </Link>
      {product.sugarFree ? <p className="mt-2 text-center text-sm font-bold text-gold">{t("sugarFree")}</p> : null}
      <div className="mt-auto pt-3">
        <BuyBox product={product} />
      </div>
    </article>
  );
}
