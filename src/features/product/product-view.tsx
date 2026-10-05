"use client";

import Image from "next/image";
import Link from "next/link";
import { siteConfig, whatsappHref } from "@/config/site";
import { getCategory, productsInCategory } from "@/features/catalog/data";
import { orderMessage, orderScript, priceLabel } from "@/features/catalog/format";
import type { Product } from "@/features/catalog/types";
import { useLanguage } from "@/features/i18n/language-provider";
import { ProductCard } from "@/components/product-card";

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
      <div className="mt-4 grid items-center gap-6 md:grid-cols-[280px_1fr]">
        {category ? (
          <Image
            src={category.photo}
            alt={text(product.name)}
            width={640}
            height={640}
            priority
            className="h-64 w-full rounded-[1.6rem] object-cover md:h-72"
          />
        ) : null}
        <div>
      <p className="text-sm font-bold text-muted">{category ? text(category.name) : null}</p>
      <h1 className="mt-1 text-4xl font-extrabold leading-tight md:text-5xl">{text(product.name)}</h1>
      {product.sugarFree ? <p className="mt-3 font-bold text-gold">{t("sugarFree")}</p> : null}
      <p className="mt-4 text-3xl font-extrabold text-accent">{priceLabel(product, lang)}</p>
      {product.packSize ? <p className="mt-1 text-lg">{text(product.packSize)}</p> : null}
      {category ? <p className="mt-4 max-w-2xl text-lg">{text(category.promise)}</p> : null}
        </div>
      </div>

      <div className="mt-6 rounded-[2rem] bg-gold-soft p-5">
        <p className="text-sm font-bold text-accent">{t("sayThis")}</p>
        <p className="mt-1 text-2xl font-extrabold">{orderScript(product, lang)}</p>
        <p className="mt-1 text-sm text-muted">{product.unit === "pack" ? t("packHint") : t("weightHint")}</p>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <a
          href={`tel:${siteConfig.orderPhone.tel}`}
          className="rounded-2xl bg-accent px-5 py-4 text-center text-lg font-extrabold text-accent-foreground"
        >
          {t("call")} · {siteConfig.orderPhone.display}
        </a>
        <a
          href={whatsappHref(orderMessage(product, lang))}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl border border-accent px-5 py-4 text-center text-lg font-extrabold text-accent"
        >
          {t("whatsapp")}
        </a>
      </div>

      {related.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-2xl font-extrabold">{t("related")}</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
