"use client";

import Image from "next/image";
import Link from "next/link";
import { BuyBox } from "@/components/buy-box";
import { ProductCard } from "@/components/product-card";
import { siteConfig } from "@/config/site";
import { getCategory, productsInCategory } from "@/features/catalog/data";
import { priceLabel } from "@/features/catalog/format";
import type { Product } from "@/features/catalog/types";
import { useLanguage } from "@/features/i18n/language-provider";

export function ProductView({ product }: { product: Product }) {
  const { lang, t, text } = useLanguage();
  const category = getCategory(product.category);
  const related = productsInCategory(product.category)
    .filter((item) => item.slug !== product.slug)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <Link href={`/shop?category=${product.category}`} className="text-sm font-bold text-gold">
        {t("backToShop")}
      </Link>
      <div className="mt-4 grid items-start gap-6 md:grid-cols-[320px_1fr]">
        {category ? (
          <Image
            src={category.photo}
            alt={text(product.name)}
            width={640}
            height={640}
            priority
            className="h-72 w-full rounded-[1.8rem] object-cover"
          />
        ) : null}
        <div className="rounded-[1.8rem] bg-surface p-5 ring-1 ring-border md:p-7">
          <p className="text-sm font-bold text-muted">{category ? text(category.name) : null}</p>
          <h1 className="mt-1 text-4xl font-extrabold leading-tight">{product.name.gu}</h1>
          <p className="mt-1 text-lg font-bold text-muted">{product.name.en}</p>
          {product.sugarFree ? <p className="mt-3 font-bold text-gold">{t("sugarFree")}</p> : null}
          <p className="mt-4 text-3xl font-extrabold text-accent">{priceLabel(product, lang)}</p>
          {product.packSize ? <p className="mt-1 text-lg">{text(product.packSize)}</p> : null}
          {category ? <p className="mt-3 max-w-xl text-lg leading-relaxed">{text(category.promise)}</p> : null}
          <BuyBox product={product} />
          <a
            href={`tel:${siteConfig.orderPhone.tel}`}
            className="mt-3 block text-center text-base font-bold text-accent"
          >
            {t("call")} · {siteConfig.orderPhone.display}
          </a>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-2xl font-extrabold">{t("related")}</h2>
          <div className="mt-3 grid gap-3">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
