"use client";

import Image from "next/image";
import Link from "next/link";
import { siteConfig, whatsappHref } from "@/config/site";
import { categories, featuredSlugs, getProduct } from "@/features/catalog/data";
import { priceLabel } from "@/features/catalog/format";
import { useLanguage } from "@/features/i18n/language-provider";

export function HomePage() {
  const { lang, t, text } = useLanguage();
  const featured = featuredSlugs
    .map((slug) => getProduct(slug))
    .filter((product) => product != null);
  const hello = lang === "gu" ? "નમસ્તે, મારે મીઠાઈ જોઈએ છે." : "Hello, I would like to order sweets.";
  const reasons = [
    [t("trust1"), t("trust1b")],
    [t("trust2"), t("trust2b")],
    [t("trust3"), t("trust3b")],
    [t("trust4"), t("trust4b")],
  ];

  return (
    <div>
      <section className="px-4 pt-4 md:pt-6">
        <div className="shop-frame mx-auto grid max-w-6xl items-center gap-8 px-5 py-7 md:grid-cols-[1.15fr_0.85fr] md:px-10 md:py-10">
          <div>
            <p className="inline-flex rounded-full bg-white/10 px-3 py-1 text-sm font-bold text-gold-soft">
              {t("greeting")} · {t("since")}
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.15] md:text-6xl">{t("heroTitle")}</h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-gold-soft">{t("heroBody")}</p>
            <p className="mt-3 max-w-xl text-base font-bold">{t("easeNote")}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="rounded-full bg-gold-soft px-6 py-3 text-lg font-extrabold text-accent"
              >
                {t("seeGoods")}
              </Link>
              <a
                href={`tel:${siteConfig.orderPhone.tel}`}
                className="rounded-full border border-gold-soft px-6 py-3 text-lg font-extrabold"
              >
                {t("call")}
              </a>
            </div>
          </div>
          <figure className="mx-auto w-full max-w-sm">
            <div className="overflow-hidden rounded-[1.6rem] bg-surface shadow-[0_18px_40px_rgb(0_0_0/0.28)]">
              <Image
                src="/menus/peda.jpg"
                alt={`${t("menuCard")}: ${text(categories[0].name)}`}
                width={720}
                height={1280}
                priority
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mt-3 text-center text-sm font-bold text-gold-soft">{t("cardProof")}</figcaption>
          </figure>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-3xl font-extrabold">{t("trustTitle")}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(([title, body]) => (
            <article key={title} className="rounded-3xl border border-gold bg-surface px-4 py-5">
              <h3 className="text-2xl font-extrabold text-accent">{title}</h3>
              <p className="mt-2 text-base leading-relaxed">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-extrabold">{t("categoriesTitle")}</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.id}`}
              className="overflow-hidden rounded-3xl border border-border bg-surface hover:border-gold"
            >
              <Image
                src={category.photo}
                alt=""
                width={480}
                height={320}
                className="h-28 w-full object-cover"
              />
              <span className="block px-4 py-4">
                <span className="block text-2xl font-extrabold leading-tight">{text(category.name)}</span>
                <span className="mt-2 block text-sm leading-relaxed text-muted">{text(category.promise)}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-8 md:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[2rem] border border-border bg-surface p-5 md:p-7">
          <p className="text-sm font-bold text-gold">{t("menuCard")}</p>
          <h2 className="mt-1 text-3xl font-extrabold">{t("famousTitle")}</h2>
          <p className="mt-2 text-muted">{t("famousHint")}</p>
          <ul className="mt-2">
            {featured.map((product) => (
              <li key={product.slug} className="border-b border-dashed border-border last:border-b-0">
                <Link href={`/product/${product.slug}`} className="flex items-baseline justify-between gap-4 py-4">
                  <span className="text-xl font-extrabold">{text(product.name)}</span>
                  <span className="shrink-0 text-lg font-extrabold text-accent">
                    {product.price == null ? t("askPrice") : priceLabel(product, lang)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[2rem] bg-accent p-5 text-accent-foreground md:p-7">
          <h2 className="text-3xl font-extrabold">{t("promiseTitle")}</h2>
          <ul className="mt-4 grid gap-3">
            {categories.slice(0, 4).map((category) => (
              <li key={category.id} className="rounded-2xl bg-white/10 px-4 py-3">
                <span className="block font-extrabold">{text(category.name)}</span>
                <span className="text-sm text-gold-soft">{text(category.promise)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10">
        <h2 className="text-3xl font-extrabold">{t("orderTitle")}</h2>
        <p className="mt-2 text-lg font-bold text-accent">{t("sampleOrder")}</p>
        <ol className="mt-4 grid gap-3 md:grid-cols-3">
          {[t("orderStep1"), t("orderStep2"), t("orderStep3")].map((step, index) => (
            <li key={step} className="rounded-3xl border border-border bg-surface p-5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-extrabold text-accent-foreground">
                {index + 1}
              </span>
              <p className="mt-3 text-2xl font-extrabold">{step}</p>
            </li>
          ))}
        </ol>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <a href={`tel:${siteConfig.orderPhone.tel}`} className="rounded-3xl bg-accent px-5 py-5 text-accent-foreground">
            <span className="block text-sm text-gold-soft">{t("shopPhone")} · {text(siteConfig.shop)}</span>
            <span className="block text-3xl font-extrabold">{siteConfig.orderPhone.display}</span>
          </a>
          <a
            href={whatsappHref(hello)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-3xl border border-accent bg-gold-soft px-5 py-5 text-accent"
          >
            <span className="block text-sm">{t("whatsapp")}</span>
            <span className="block text-3xl font-extrabold">{t("orderThis")}</span>
          </a>
        </div>
      </section>
    </div>
  );
}
