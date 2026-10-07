"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { siteConfig, whatsappHref } from "@/config/site";
import { categories, featuredSlugs, getCategory, getProduct, products } from "@/features/catalog/data";
import { priceLabel } from "@/features/catalog/format";
import { useLanguage } from "@/features/i18n/language-provider";

export function HomePage() {
  const { lang, t, text } = useLanguage();
  const featured = featuredSlugs.map((slug) => getProduct(slug)).filter((product) => product != null).slice(0, 4);
  const hello = lang === "gu" ? "નમસ્તે, મારે મીઠાઈનો ઓર્ડર કરવો છે." : "Hello, I would like to order sweets.";
  const trust = [[t("trust1"), t("trust1b")], [t("trust2"), t("trust2b")], [t("trust3"), t("trust3b")], [t("trust4"), t("trust4b")]];

  return (
    <div className="overflow-hidden">
      <section className="mx-auto max-w-7xl px-4 pb-7 pt-5 sm:pt-7">
        <div className="hero-panel relative overflow-hidden rounded-[2rem] text-accent-foreground sm:rounded-[2.5rem]">
          <div className="relative z-10 grid items-center gap-9 px-5 py-8 md:grid-cols-[1.02fr_.98fr] md:px-10 md:py-12 lg:px-14 lg:py-14">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-extrabold text-gold-soft backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-[#efc85b]" />{t("junagadhSince")}
              </div>
              <h1 className="mt-5 max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-[-0.025em] sm:text-5xl lg:text-7xl">{t("heroTitle")}</h1>
              <p className="mt-5 max-w-xl text-base font-semibold leading-8 text-[#f8e9d4] sm:text-lg">{t("heroBody")}</p>
              <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap">
                <Link href="/shop" className="rounded-full bg-[#f7d77d] px-7 py-3.5 text-center text-lg font-extrabold text-[#59290f] shadow-lg shadow-black/10 transition hover:-translate-y-0.5">{t("exploreCollection")} →</Link>
                <a href={whatsappHref(hello)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-lg font-extrabold text-white backdrop-blur transition hover:bg-white/15">
                  <WhatsAppIcon className="h-5 w-5" />{t("whatsappOrder")}
                </a>
              </div>
              <p className="mt-5 flex items-center gap-2 text-sm font-bold text-gold-soft"><CheckIcon className="h-5 w-5" />{t("noOnlinePayment")}</p>
            </div>
            <div className="relative mx-auto min-h-[22rem] w-full max-w-[31rem] sm:min-h-[28rem]">
              <div className="absolute right-0 top-0 h-[78%] w-[76%] overflow-hidden rounded-[2rem] border-4 border-white/10 shadow-2xl">
                <Image src="/sweets/peda.jpg" alt={t("heroImageAlt")} fill priority sizes="(max-width: 768px) 70vw, 36vw" className="object-cover" />
                <div className="absolute left-3 top-3 max-w-[calc(100%-1.5rem)] rounded-2xl bg-rose-deep/95 px-3 py-2 text-white shadow-lg backdrop-blur-sm sm:left-4 sm:top-4 sm:px-4 sm:py-3">
                  <p className="text-xs font-extrabold leading-snug sm:text-base">{t("signatureThabdi")}</p>
                  <p className="mt-0.5 hidden text-xs font-bold text-white/75 sm:block">{t("madeFresh")}</p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-[48%] w-[47%] rotate-[-3deg] overflow-hidden rounded-[1.7rem] border-4 border-[#f4dca9] bg-surface shadow-2xl">
                <Image src="/sweets/barfi.jpg" alt="" fill sizes="(max-width: 768px) 42vw, 18vw" className="object-cover" />
              </div>
              <div className="absolute right-[1%] top-[66%] rounded-2xl bg-surface px-4 py-3 text-foreground shadow-xl sm:bottom-[7%] sm:top-auto sm:px-5">
                <p className="text-3xl font-extrabold text-accent">{products.length}+</p><p className="text-xs font-extrabold uppercase tracking-[.12em] text-muted">{t("varieties")}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-20 mx-3 -mt-3 grid overflow-hidden rounded-2xl bg-surface shadow-xl ring-1 ring-border sm:mx-8 sm:grid-cols-3 lg:mx-14">
          <a href={`tel:${siteConfig.orderPhone.tel}`} className="flex items-center gap-3 border-b border-border px-5 py-4 sm:border-b-0 sm:border-r"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold-soft text-accent"><PhoneIcon className="h-5 w-5" /></span><span><span className="block text-xs font-bold uppercase tracking-wider text-muted">{t("directHelp")}</span><span className="font-extrabold">{siteConfig.orderPhone.display}</span></span></a>
          <Link href="/shop" className="flex items-center gap-3 border-b border-border px-5 py-4 sm:border-b-0 sm:border-r"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold-soft text-xl font-extrabold text-accent">{categories.length}</span><span><span className="block text-xs font-bold uppercase tracking-wider text-muted">{t("categoriesTitle")}</span><span className="font-extrabold">{t("browseAtEase")}</span></span></Link>
          <a href={siteConfig.shopPlace.mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-5 py-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold-soft text-accent"><MapPinIcon className="h-5 w-5" /></span><span><span className="block text-xs font-bold uppercase tracking-wider text-muted">{t("visitUs")}</span><span className="font-extrabold">{t("junagadh")}</span></span></a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
        <div className="flex items-end justify-between gap-4"><div><p className="section-kicker">{t("chooseFavourite")}</p><h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">{t("categoriesTitle")}</h2></div><Link href="/shop" className="hidden font-extrabold text-accent sm:block">{t("seeAll")} →</Link></div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-5">
          {categories.map((category, index) => (
            <Link key={category.id} href={`/shop#${category.id}`} className={`group relative overflow-hidden rounded-[1.6rem] bg-accent ${index < 2 ? "sm:col-span-2" : ""}`}>
              <div className={`relative ${index < 2 ? "aspect-[1.6/1]" : "aspect-square"}`}><Image src={category.photo} alt="" fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover transition duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#2b1308]/90 via-[#2b1308]/10 to-transparent" /><span className="absolute inset-x-0 bottom-0 p-4 text-xl font-extrabold text-white sm:p-5 sm:text-2xl">{text(category.name)} <span aria-hidden="true">→</span></span></div>
            </Link>
          ))}
        </div>
        <Link href="/shop" className="mt-5 block rounded-full bg-accent px-6 py-3.5 text-center text-lg font-extrabold text-accent-foreground sm:hidden">{t("seeAll")} →</Link>
      </section>

      <section className="favourites-section border-y border-border py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-2xl"><p className="section-kicker">{t("customerFavourites")}</p><h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">{t("famousTitle")}</h2><p className="mt-2 text-muted">{t("famousHint")}</p></div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product, index) => { const category = getCategory(product.category); return (
              <Link key={product.slug} href={`/product/${product.slug}`} className="group overflow-hidden rounded-[1.7rem] bg-surface shadow-sm ring-1 ring-border transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[1.08/1] overflow-hidden">{category ? <Image src={category.photo} alt="" fill sizes="(max-width: 640px) 100vw, 25vw" className="object-cover transition duration-500 group-hover:scale-105" /> : null}{index === 0 ? <span className="absolute left-3 top-3 rounded-full bg-[#f7d77d] px-3 py-1 text-xs font-extrabold text-[#59290f]">{t("signature")}</span> : null}</div>
                <div className="p-4"><p className="text-xl font-extrabold">{text(product.name)}</p><div className="mt-2 flex items-center justify-between gap-3"><span className="font-extrabold text-accent">{product.price == null ? t("askPrice") : priceLabel(product, lang)}</span><span className="grid h-9 w-9 place-items-center rounded-full bg-gold-soft font-extrabold text-accent">→</span></div></div>
              </Link>
            ); })}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 lg:grid-cols-[.9fr_1.1fr] lg:py-20">
        <div className="relative mx-auto w-full max-w-lg pb-8 pr-8"><div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-accent shadow-2xl"><Image src="/menus/peda.jpg" alt={t("menuCard")} fill sizes="(max-width: 1024px) 90vw, 38vw" className="object-cover object-top" /></div><div className="absolute bottom-0 right-0 rounded-[1.5rem] bg-[#f7d77d] p-5 text-[#59290f] shadow-xl"><p className="text-4xl font-extrabold">1955</p><p className="font-extrabold">{t("heritageSince")}</p></div></div>
        <div><p className="section-kicker">{t("ourHeritage")}</p><h2 className="mt-2 text-3xl font-extrabold leading-tight sm:text-5xl">{t("heritageTitle")}</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{t("heritageBody")}</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">{trust.map(([title, body]) => <div key={title} className="flex gap-3 rounded-[1.3rem] bg-surface p-4 ring-1 ring-border"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold-soft text-accent"><CheckIcon className="h-5 w-5" /></span><span><span className="block text-lg font-extrabold">{title}</span><span className="mt-0.5 block text-sm leading-relaxed text-muted">{body}</span></span></div>)}</div>
          <div className="mt-7 flex flex-wrap gap-3"><Link href="/shop" className="rounded-full bg-accent px-6 py-3 font-extrabold text-accent-foreground">{t("viewFullMenu")}</Link><Link href="/contact" className="rounded-full border border-accent px-6 py-3 font-extrabold text-accent">{t("knowOurStore")}</Link></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:pb-20">
        <div className="visit-panel overflow-hidden rounded-[2rem] px-5 py-8 text-white sm:px-10 sm:py-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div><p className="text-sm font-extrabold uppercase tracking-[.16em] text-[#f7d77d]">{t("visitUs")}</p><h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">{text(siteConfig.shop)}</h2><p className="mt-3 max-w-2xl leading-7 text-white/75">{text(siteConfig.shopPlace.address)}</p></div>
          <div className="mt-6 grid shrink-0 gap-3 sm:flex lg:mt-0"><a href={siteConfig.shopPlace.mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-[#f7d77d] px-6 py-3.5 font-extrabold text-[#59290f]"><MapPinIcon className="h-5 w-5" />{t("directions")}</a><a href={`tel:${siteConfig.orderPhone.tel}`} className="flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 font-extrabold"><PhoneIcon className="h-5 w-5" />{t("callShop")}</a></div>
        </div>
      </section>
    </div>
  );
}
