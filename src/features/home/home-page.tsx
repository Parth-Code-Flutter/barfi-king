"use client";

import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { categories, featuredSlugs, getCategory, getProduct } from "@/features/catalog/data";
import { priceLabel } from "@/features/catalog/format";
import { useLanguage } from "@/features/i18n/language-provider";

export function HomePage() {
  const { lang, t, text } = useLanguage();
  const featured = featuredSlugs.map((slug) => getProduct(slug)).filter((product) => product != null);
  const thabdi = getProduct("thabdi-peda");

  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 pt-5">
        <div className="overflow-hidden rounded-[2rem] bg-accent text-accent-foreground">
          <div className="grid items-center gap-6 px-5 py-7 md:grid-cols-[auto_1fr] md:gap-10 md:px-10 md:py-10">
            <div className="relative mx-auto w-fit">
              <Image
                src="/sweets/peda.jpg"
                alt={thabdi ? text(thabdi.name) : ""}
                width={640}
                height={640}
                priority
                className="h-56 w-56 rounded-full object-cover ring-[6px] ring-gold-soft md:h-72 md:w-72"
              />
            </div>
            <div className="pb-2 text-center md:pb-0 md:text-left">
              <p className="text-sm font-extrabold text-gold-soft">
                {t("greeting")} · {t("since")}
              </p>
              <h1 className="mt-3 text-4xl font-extrabold leading-[1.12] md:text-6xl">{t("heroTitle")}</h1>
              <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-gold-soft md:mx-0">{t("heroBody")}</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
                <Link href="/shop" className="rounded-full bg-gold-soft px-6 py-3 text-lg font-extrabold text-accent">
                  {t("seeGoods")}
                </Link>
                <a
                  href={`tel:${siteConfig.orderPhone.tel}`}
                  className="rounded-full border border-gold-soft px-6 py-3 text-lg font-extrabold"
                >
                  {t("call")} · {siteConfig.orderPhone.display}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-8">
        <h2 className="text-3xl font-extrabold">{t("categoriesTitle")}</h2>
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-8 lg:gap-4">
          {categories.map((category) => (
            <Link key={category.id} href={`/shop#${category.id}`} className="w-28 shrink-0 text-center lg:w-auto">
              <Image
                src={category.photo}
                alt=""
                width={320}
                height={320}
                className="mx-auto h-28 w-28 rounded-full object-cover ring-4 ring-surface lg:h-auto lg:w-full"
              />
              <span className="mt-2 block text-base font-extrabold leading-tight">{text(category.name)}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-stretch gap-6 px-4 py-10 lg:grid-cols-2">
        <div className="rounded-[1.8rem] bg-surface p-5 ring-1 ring-border md:p-7">
          <h2 className="text-3xl font-extrabold">{t("famousTitle")}</h2>
          <p className="mt-1 text-muted">{t("famousHint")}</p>
          <ul className="mt-3">
            {featured.map((product) => {
              const category = getCategory(product.category);
              return (
                <li key={product.slug} className="border-b border-dashed border-border last:border-b-0">
                  <Link href={`/product/${product.slug}`} className="flex items-center gap-3 py-3">
                    {category ? (
                      <Image src={category.photo} alt="" width={96} height={96} className="h-14 w-14 shrink-0 rounded-full object-cover" />
                    ) : null}
                    <span className="min-w-0 flex-1">
                      <span className="block text-xl font-extrabold">{product.name.gu}</span>
                      <span className="text-sm font-bold text-muted">{product.name.en}</span>
                    </span>
                    <span className="shrink-0 text-right text-lg font-extrabold text-accent">
                      {product.price == null ? t("askPrice") : priceLabel(product, lang)}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <aside className="flex flex-col rounded-[1.8rem] bg-accent p-5 text-accent-foreground md:p-6">
          <p className="text-sm font-bold text-gold-soft">{t("menuCard")}</p>
          <h2 className="mt-1 text-2xl font-extrabold leading-snug">{t("cardProof")}</h2>
          <div className="mt-4 flex flex-1 items-center justify-center">
            <Image
              src="/menus/peda.jpg"
              alt={t("menuCard")}
              width={720}
              height={1280}
              className="h-auto max-h-[28rem] w-auto max-w-full rounded-2xl"
            />
          </div>
          <a href={`tel:${siteConfig.orderPhone.tel}`} className="mt-4 block text-center text-3xl font-extrabold">
            {siteConfig.orderPhone.display}
          </a>
        </aside>
      </section>
    </div>
  );
}
