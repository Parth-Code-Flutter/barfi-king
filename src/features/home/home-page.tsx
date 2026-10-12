"use client";

import Image from "next/image";
import Link from "next/link";
import { useId } from "react";
import { MapPinIcon, PhoneIcon } from "@/components/icons";
import { Drip, Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";
import { categories, featuredSlugs, getCategory, getProduct, products, productsInCategory } from "@/features/catalog/data";
import { inr } from "@/features/catalog/format";
import { BoxBuilder } from "@/features/home/box-builder";
import { heroCopy, recipeCopy, shelfCopy, type RecipeIcon } from "@/features/home/home-copy";
import { OccasionTags } from "@/features/home/occasion-tags";
import { SweetMarquee } from "@/features/home/sweet-marquee";
import { useLanguage } from "@/features/i18n/language-provider";

export function HomePage() {
  return (
    <div className="overflow-x-clip">
      <Hero />
      <CategoryStickers />
      <BoxBuilder />
      <SweetMarquee />
      <Recipe />
      <Favourites />
      <OccasionTags />
      <Visit />
    </div>
  );
}

function Hero() {
  const { t, text } = useLanguage();
  const thabdi = getProduct("thabdi-peda");

  return (
    <section className="kesar-strands relative">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 pb-6 pt-8 sm:pt-12 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:pb-10 lg:pt-14">
        <div className="relative z-10">
          <p className="section-kicker">{text(heroCopy.kicker)}</p>
          <h1 className="mt-4 text-[clamp(2.7rem,7.4vw,5.4rem)] font-extrabold leading-[1.12] text-thabdi">
            <span className="block">{text(heroCopy.titleA)}</span>
            <span className="relative inline-block text-accent">
              {text(heroCopy.titleB)}
              <svg viewBox="0 0 300 18" preserveAspectRatio="none" aria-hidden="true" className="absolute -bottom-1 left-0 h-3 w-full text-butter">
                <path d="M3 12C60 3 120 3 160 8s90 6 137-4" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-foreground/80">{text(heroCopy.body)}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#box-builder" className="rounded-full bg-accent px-6 py-3.5 text-lg font-extrabold text-accent-foreground shadow-lg shadow-accent/30 transition hover:-translate-y-0.5">
              {text(heroCopy.fillBox)} ↓
            </a>
            <Link href="/shop" className="rounded-full bg-surface px-6 py-3.5 text-lg font-extrabold text-thabdi ring-2 ring-butter transition hover:bg-butter-soft">
              {text(heroCopy.priceCard)}
            </Link>
          </div>
          <a href={`tel:${siteConfig.orderPhone.tel}`} className="mt-7 inline-flex items-center gap-3 rounded-full bg-surface/80 py-1.5 pl-1.5 pr-5 ring-1 ring-border transition hover:ring-pista">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-pista text-white"><PhoneIcon className="h-5 w-5" /></span>
            <span className="leading-tight">
              <span className="block text-xs font-bold text-muted">{t("directHelp")}</span>
              <span className="font-extrabold">{siteConfig.orderPhone.display}</span>
            </span>
          </a>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[32rem]">
          <div aria-hidden="true" className="absolute inset-[4%] rounded-full bg-butter/70 blur-3xl" />
          <div aria-hidden="true" className="absolute inset-[7%] rounded-full bg-surface shadow-[0_40px_80px_-30px_rgb(90_46_20/0.5)] ring-[12px] ring-butter-soft" />
          <div className="absolute inset-[14%] overflow-hidden rounded-full ring-4 ring-white">
            <Image src="/sweets/peda.jpg" alt={t("heroImageAlt")} fill loading="eager" fetchPriority="high" sizes="(max-width: 1024px) 80vw, 30rem" className="scale-110 object-cover" />
          </div>
          <Stamp label={text(heroCopy.stamp)} className="absolute left-[-2%] top-[-2%] w-[32%]" />
          {thabdi?.price ? (
            <div className="float-y absolute right-[-2%] top-[14%] rotate-6 rounded-2xl bg-surface px-4 py-2.5 shadow-xl ring-1 ring-border">
              <p className="text-xs font-bold text-muted">{text(thabdi.name)}</p>
              <p className="font-display text-2xl font-extrabold leading-tight text-accent">
                {inr(thabdi.price)}<span className="ml-1 text-sm text-muted">{text(heroCopy.perKg)}</span>
              </p>
            </div>
          ) : null}
          <div className="float-y absolute bottom-[10%] left-[-2%] flex -rotate-6 items-center gap-1.5 rounded-full bg-pista px-4 py-2 font-extrabold text-white shadow-lg [animation-delay:-2s]">
            <LeafIcon className="h-5 w-5" />
            {text(heroCopy.natural)}
          </div>
          <div className="absolute bottom-[1%] right-[8%] rotate-3 rounded-2xl bg-kesar px-4 py-2 text-white shadow-lg">
            <span className="font-display text-3xl font-extrabold">{products.length}+</span>
            <span className="ml-1.5 font-extrabold">{text(heroCopy.dishes)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/** A dairy seal: the brand line runs round a spinning ring. */
function Stamp({ label, className = "" }: { label: string; className?: string }) {
  const { lang } = useLanguage();
  const id = useId();
  return (
    <div className={`grid aspect-square place-items-center rounded-full bg-accent text-butter-soft shadow-xl ring-4 ring-background ${className}`}>
      <svg viewBox="0 0 200 200" aria-hidden="true" className="spin-slow absolute inset-0 h-full w-full">
        <defs>
          <path id={id} d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
        </defs>
        <text className="fill-current text-[20px] font-extrabold">
          <textPath href={`#${id}`} textLength="460" lengthAdjust="spacing">{label}</textPath>
        </text>
      </svg>
      <span className="relative grid h-[48%] w-[48%] place-items-center rounded-full bg-butter text-center leading-none text-thabdi">
        <span>
          <span className="block text-[clamp(0.55rem,1.4vw,0.75rem)] font-extrabold">{lang === "gu" ? "સ્થાપના" : "EST."}</span>
          <span className="block font-display text-[clamp(1rem,3vw,1.6rem)] font-extrabold">{siteConfig.since}</span>
        </span>
      </span>
    </div>
  );
}

function LeafIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20 4C11 4 5 8.5 5 15c0 1.5.4 2.8 1 4l-2 2 1.4 1.4 2-2c1.2.6 2.5 1 4 1C17.5 21.4 20 14 20 4Zm-9 13.5c1-4 3.5-7 7-9-2.5 2.5-4.5 5.5-5.5 9.5H11Z" />
    </svg>
  );
}

function CategoryStickers() {
  const { t, text } = useLanguage();

  return (
    <>
      <section className="relative bg-butter-soft">
        <Drip color="var(--background)" />
        <div className="mx-auto max-w-7xl px-4 pb-14 pt-4">
          <div className="text-center">
            <p className="section-kicker">{text(shelfCopy.kicker)}</p>
            <h2 className="mt-2 text-4xl font-extrabold text-thabdi sm:text-5xl">{text(shelfCopy.title)}</h2>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-4">
            {categories.map((category, index) => {
              const items = productsInCategory(category.id);
              const prices = items.map((item) => item.price).filter((price) => price != null);
              const low = prices.length ? Math.min(...prices) : null;
              return (
                <li key={category.id}>
                  <Reveal delay={index * 70}>
                    <Link href={`/shop#${category.id}`} className="group grid justify-items-center text-center">
                      <span className={`relative block aspect-square w-[min(100%,11rem)] rounded-full bg-surface p-2 shadow-lg shadow-thabdi/10 ring-1 ring-border transition duration-300 group-hover:-translate-y-2 group-hover:rotate-0 ${index % 2 ? "rotate-[5deg]" : "-rotate-[5deg]"}`}>
                        <span className="relative block h-full w-full overflow-hidden rounded-full">
                          <Image src={category.photo} alt="" fill sizes="11rem" className="object-cover transition duration-500 group-hover:scale-110" />
                        </span>
                        {low != null ? (
                          <span className="absolute -right-1 top-1 rounded-full bg-kesar px-2.5 py-1 text-xs font-extrabold text-white shadow-md">
                            {inr(low)}+
                          </span>
                        ) : null}
                      </span>
                      <span className="mt-3 font-display text-2xl font-extrabold leading-tight text-thabdi transition group-hover:text-accent">{text(category.name)}</span>
                      <span className="text-xs font-bold text-muted">{items.length} {t("results")}</span>
                    </Link>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <Drip color="var(--butter-soft)" />
    </>
  );
}

function RecipeGlyph({ icon }: { icon: RecipeIcon }) {
  if (icon === "milk") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="h-14 w-14">
        <path d="M17 5h14v6l4 5v24a4 4 0 0 1-4 4H17a4 4 0 0 1-4-4V16l4-5V5Z" fill="#fffdf8" stroke="#5a2e14" strokeWidth="2.4" strokeLinejoin="round" />
        <path d="M13.5 24h21v16a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V24Z" fill="#fdf1cc" />
        <path d="M15 5h18" stroke="#5a2e14" strokeWidth="3" strokeLinecap="round" />
        <path d="M18 30h12" stroke="#e2731e" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    );
  }
  if (icon === "sugar") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="h-14 w-14">
        {[
          [8, 24],
          [25, 24],
          [16.5, 9],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <rect x={x} y={y} width="15" height="15" rx="2.5" fill="#fffdf8" stroke="#5a2e14" strokeWidth="2.2" />
            <path d={`M${x + 3} ${y + 4}h4`} stroke="#f0dcbd" strokeWidth="2" strokeLinecap="round" />
          </g>
        ))}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="h-14 w-14">
      <path d="M24 4c3 8 12 12 12 24a12 12 0 0 1-24 0c0-6 3-9 5-12 1 4 3 6 5 6-1-7 0-13 2-18Z" fill="#e2731e" />
      <path d="M24 24c2 4 6 6 6 10a6 6 0 0 1-12 0c0-3 2-5 3-7 .5 2 1.5 3 3 3-.5-2 0-4 0-6Z" fill="#f6d77d" />
      <path d="M10 44h28" stroke="#5a2e14" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function Recipe() {
  const { t, text } = useLanguage();
  const promises = [
    { title: t("trust2"), body: t("trust2b") },
    { title: t("trust1"), body: t("trust1b") },
    { title: t("trust3"), body: t("trust3b") },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:py-20" aria-labelledby="recipe-title">
      <div className="relative overflow-hidden rounded-[2.2rem] bg-surface p-6 shadow-xl shadow-thabdi/5 ring-1 ring-border sm:p-10 lg:p-12">
        <div aria-hidden="true" className="pointer-events-none absolute inset-3 rounded-[1.8rem] border-2 border-dashed border-border" />
        <div className="relative">
          <p className="section-kicker">{text(recipeCopy.kicker)}</p>
          <h2 id="recipe-title" className="mt-2 max-w-2xl text-4xl font-extrabold leading-tight text-thabdi sm:text-5xl">{text(recipeCopy.title)}</h2>

          <ol className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
            {recipeCopy.terms.map((term, index) => (
              <li key={term.icon} className="contents">
                <Reveal delay={index * 160} className="grid w-[8.5rem] justify-items-center gap-2 rounded-3xl bg-background px-3 py-4 text-center ring-1 ring-border sm:w-40">
                  <RecipeGlyph icon={term.icon} />
                  <span className="font-extrabold leading-tight">{text(term.label)}</span>
                </Reveal>
                <Reveal delay={index * 160 + 80} className="font-display text-4xl font-extrabold text-kesar">
                  {index < recipeCopy.terms.length - 1 ? "+" : "="}
                </Reveal>
              </li>
            ))}
            <li>
              <Reveal delay={560} className="grid w-[9.5rem] justify-items-center gap-2 rounded-3xl bg-kesar-soft px-3 py-4 text-center ring-2 ring-kesar/40 sm:w-44">
                <span className="relative block h-16 w-16 overflow-hidden rounded-full ring-4 ring-white">
                  <Image src="/sweets/peda.jpg" alt="" fill sizes="64px" className="scale-125 object-cover" />
                </span>
                <span className="font-display text-2xl font-extrabold leading-tight text-accent">{text(recipeCopy.result)}</span>
              </Reveal>
            </li>
          </ol>

          <div className="mt-9 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <figure className="-rotate-1 rounded-2xl bg-butter-soft px-5 py-5 shadow-sm ring-1 ring-butter">
              <blockquote className="font-display text-2xl font-extrabold leading-snug text-thabdi sm:text-3xl">{text(recipeCopy.quote)}</blockquote>
              <figcaption className="mt-2 text-sm font-bold text-muted">— {t("menuCard")}, {text(siteConfig.shop)}</figcaption>
            </figure>
            <p className="text-lg leading-8 text-foreground/80">{text(recipeCopy.note)}</p>
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {promises.map((promise) => (
              <li key={promise.title} className="flex gap-3 rounded-2xl bg-pista-soft/70 px-4 py-3.5">
                <LeafIcon className="mt-0.5 h-5 w-5 shrink-0 text-pista" />
                <span>
                  <span className="block font-extrabold text-pista-deep">{promise.title}</span>
                  <span className="text-sm text-foreground/75">{promise.body}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Favourites() {
  const { t, text } = useLanguage();
  const featured = featuredSlugs.map((slug) => getProduct(slug)).filter((product) => product != null).slice(0, 4);

  return (
    <section className="mx-auto max-w-7xl px-4 pb-8" aria-labelledby="favourites-title">
      <div className="flex items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="section-kicker">{t("customerFavourites")}</p>
          <h2 id="favourites-title" className="mt-2 text-4xl font-extrabold text-thabdi sm:text-5xl">{t("famousTitle")}</h2>
          <p className="mt-2 text-muted">{t("famousHint")}</p>
        </div>
        <Link href="/shop" className="hidden shrink-0 rounded-full bg-butter px-4 py-2.5 font-extrabold text-thabdi sm:block">{t("seeAll")} →</Link>
      </div>
      <ul className="mt-20 grid gap-x-5 gap-y-20 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((product, index) => {
          const category = getCategory(product.category);
          return (
            <li key={product.slug}>
              <Reveal delay={index * 90}>
                <Link href={`/product/${product.slug}`} className="group relative block rounded-[1.8rem] bg-surface px-5 pb-5 pt-20 text-center shadow-sm ring-1 ring-border transition hover:-translate-y-1 hover:shadow-xl">
                  <span className="absolute left-1/2 top-0 block h-32 w-32 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full shadow-lg ring-[6px] ring-background transition duration-300 group-hover:rotate-6">
                    {category ? <Image src={category.photo} alt="" fill sizes="8rem" className="object-cover" /> : null}
                  </span>
                  {index === 0 ? <span className="absolute left-1/2 top-12 -translate-x-1/2 -rotate-3 whitespace-nowrap rounded-full bg-pista px-3 py-1 text-xs font-extrabold text-white shadow-md">{t("signature")}</span> : null}
                  <span className="mt-3 block font-display text-2xl font-extrabold leading-tight text-thabdi">{text(product.name)}</span>
                  <span className="mt-1 block text-sm font-bold text-muted">{category ? text(category.name) : null}</span>
                  <span className="mt-4 flex items-center justify-between gap-2 border-t border-dashed border-border pt-4">
                    <span className="rounded-full bg-kesar-soft px-3 py-1 font-extrabold text-accent">
                      {product.price == null ? t("askPrice") : inr(product.price)}
                      {product.price != null ? <span className="ml-1 text-xs font-bold text-muted">{product.unit === "pack" ? t("perPack") : t("perKg")}</span> : null}
                    </span>
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-accent font-extrabold text-accent-foreground transition group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Visit() {
  const { t, text } = useLanguage();

  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 pt-4">
      <div className="relative overflow-hidden rounded-[2.2rem] bg-gradient-to-br from-kesar to-accent px-6 py-9 text-white shadow-xl shadow-accent/25 sm:px-10 sm:py-11 lg:flex lg:items-center lg:justify-between lg:gap-10">
        <div aria-hidden="true" className="kesar-strands pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay" />
        <div className="relative">
          <p className="text-sm font-extrabold uppercase tracking-[.16em] text-butter">{t("visitUs")}</p>
          <h2 className="mt-2 text-4xl font-extrabold sm:text-5xl">{text(siteConfig.shop)}</h2>
          <p className="mt-3 max-w-2xl leading-7 text-white/85">{text(siteConfig.shopPlace.address)}</p>
        </div>
        <div className="relative mt-6 grid shrink-0 gap-3 sm:flex lg:mt-0">
          <a href={siteConfig.shopPlace.mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-butter px-6 py-3.5 font-extrabold text-thabdi transition hover:-translate-y-0.5">
            <MapPinIcon className="h-5 w-5" />
            {t("directions")}
          </a>
          <a href={`tel:${siteConfig.orderPhone.tel}`} className="flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3.5 font-extrabold transition hover:bg-white/20">
            <PhoneIcon className="h-5 w-5" />
            {t("callShop")}
          </a>
        </div>
      </div>
    </section>
  );
}
