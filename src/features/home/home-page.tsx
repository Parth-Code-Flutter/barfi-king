"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { siteConfig, whatsappHref } from "@/config/site";
import { categories, featuredSlugs, getCategory, getProduct } from "@/features/catalog/data";
import { priceLabel } from "@/features/catalog/format";
import { useLanguage } from "@/features/i18n/language-provider";

export function HomePage() {
  const { lang, t, text } = useLanguage();
  const featured = featuredSlugs.map((slug) => getProduct(slug)).filter((product) => product != null);
  const thabdi = getProduct("thabdi-peda");
  const hello = lang === "gu" ? "નમસ્તે, મારે મીઠાઈનો ઓર્ડર કરવો છે." : "Hello, I would like to order sweets.";
  const trust = [
    [t("trust1"), t("trust1b")],
    [t("trust2"), t("trust2b")],
    [t("trust3"), t("trust3b")],
    [t("trust4"), t("trust4b")],
  ];

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
              <div className="mt-6 grid gap-3 sm:grid-cols-2 md:flex md:flex-wrap md:justify-start">
                <Link href="/shop" className="rounded-full bg-gold-soft px-6 py-3 text-center text-lg font-extrabold text-accent">
                  {t("seeGoods")}
                </Link>
                <a
                  href={whatsappHref(hello)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-[#1e8e4e] px-6 py-3 text-lg font-extrabold text-white"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  {t("whatsapp")}
                </a>
              </div>
              <a href={`tel:${siteConfig.orderPhone.tel}`} className="mt-4 inline-flex items-center gap-2 font-extrabold text-gold-soft">
                <PhoneIcon className="h-5 w-5" />
                {t("call")} · {siteConfig.orderPhone.display}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-8">
        <h2 className="text-3xl font-extrabold">{t("categoriesTitle")}</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8 lg:gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop#${category.id}`}
              className="rounded-[1.4rem] bg-surface p-3 text-center ring-1 ring-border transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <Image
                src={category.photo}
                alt=""
                width={320}
                height={320}
                className="mx-auto aspect-square w-full rounded-full object-cover ring-4 ring-background"
              />
              <span className="mt-2 block text-base font-extrabold leading-tight">{text(category.name)}</span>
            </Link>
          ))}
        </div>
        <Link href="/shop" className="mt-5 block rounded-full bg-accent px-6 py-3.5 text-center text-lg font-extrabold text-accent-foreground sm:mx-auto sm:w-fit">
          {t("seeGoods")} →
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-10">
        <div className="rounded-[2rem] bg-surface p-5 ring-1 ring-border md:p-8">
          <h2 className="text-3xl font-extrabold">{t("trustTitle")}</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {trust.map(([title, body]) => (
              <div key={title} className="flex gap-3 rounded-[1.4rem] bg-background p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold-soft text-accent">
                  <CheckIcon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-lg font-extrabold">{title}</span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-muted">{body}</span>
                </span>
              </div>
            ))}
          </div>
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
