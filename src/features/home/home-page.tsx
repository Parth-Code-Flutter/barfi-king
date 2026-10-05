"use client";

import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { categories, featuredSlugs, getCategory, getProduct } from "@/features/catalog/data";
import { inr, priceLabel } from "@/features/catalog/format";
import { useLanguage } from "@/features/i18n/language-provider";

export function HomePage() {
  const { lang, t, text } = useLanguage();
  const featured = featuredSlugs.map((slug) => getProduct(slug)).filter((product) => product != null);
  const thabdi = getProduct("thabdi-peda");

  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 pt-5">
        <div className="overflow-hidden rounded-[2rem] bg-[#6e1830] text-[#fff8ee]">
          <div className="grid items-center gap-6 px-5 py-7 md:grid-cols-[auto_1fr] md:gap-10 md:px-10 md:py-10">
            <div className="relative mx-auto w-fit">
              <Image
                src="/sweets/peda.jpg"
                alt={thabdi ? text(thabdi.name) : ""}
                width={640}
                height={640}
                priority
                className="h-56 w-56 rounded-full object-cover ring-[6px] ring-[#e2b045] md:h-72 md:w-72"
              />
              {thabdi?.price != null ? (
                <p className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#fff6e8] px-4 py-2 text-lg font-extrabold text-[#7a1d38] shadow-md">
                  {inr(thabdi.price)} · {t("perKg")}
                </p>
              ) : null}
            </div>
            <div className="pb-2 text-center md:pb-0 md:text-left">
              <p className="text-sm font-extrabold text-[#f3e2bc]">
                {t("greeting")} · {t("since")}
              </p>
              <h1 className="mt-3 text-4xl font-extrabold leading-[1.12] md:text-6xl">{t("heroTitle")}</h1>
              <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-[#f3e2bc] md:mx-0">{t("heroBody")}</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
                <Link href="/shop" className="rounded-full bg-[#fff6e8] px-6 py-3 text-lg font-extrabold text-[#7a1d38]">
                  {t("seeGoods")}
                </Link>
                <a
                  href={`tel:${siteConfig.orderPhone.tel}`}
                  className="rounded-full border border-[#f3e2bc] px-6 py-3 text-lg font-extrabold"
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
            <Link key={category.id} href={`/shop?category=${category.id}`} className="w-28 shrink-0 text-center lg:w-auto">
              <Image
                src={category.photo}
                alt=""
                width={320}
                height={320}
                className="mx-auto h-28 w-28 rounded-full object-cover ring-4 ring-[#f3e2bc] lg:h-auto lg:w-full"
              />
              <span className="mt-2 block text-base font-extrabold leading-tight">{text(category.name)}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-start gap-6 px-4 py-10 lg:grid-cols-[1.15fr_0.85fr]">
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

        <aside className="rounded-[1.8rem] bg-[#6e1830] p-5 text-[#fff8ee] md:p-6">
          <p className="text-sm font-bold text-[#f3e2bc]">{t("menuCard")}</p>
          <h2 className="mt-1 text-2xl font-extrabold leading-snug">{t("cardProof")}</h2>
          <Image
            src="/menus/peda.jpg"
            alt={t("menuCard")}
            width={720}
            height={1280}
            className="mt-4 h-auto w-full rounded-2xl"
          />
          <a href={`tel:${siteConfig.orderPhone.tel}`} className="mt-4 block text-3xl font-extrabold">
            {siteConfig.orderPhone.display}
          </a>
        </aside>
      </section>
    </div>
  );
}
