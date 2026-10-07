"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { CloseIcon, SearchIcon } from "@/components/icons";
import { PortionPicker } from "@/components/portion-picker";
import { categories, filterProducts, products } from "@/features/catalog/data";
import { inr } from "@/features/catalog/format";
import type { Category, CategoryId, Product } from "@/features/catalog/types";
import { useLanguage } from "@/features/i18n/language-provider";

export function ShopBrowser() {
  const { t, text } = useLanguage();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<CategoryId>(categories[0].id);
  const barRef = useRef<HTMLDivElement>(null);

  const groups = useMemo(() => {
    const matches = filterProducts("all", query);
    return categories
      .map((category) => ({ category, items: matches.filter((item) => item.category === category.id) }))
      .filter((group) => group.items.length > 0);
  }, [query]);
  const total = groups.reduce((sum, group) => sum + group.items.length, 0);

  useEffect(() => {
    const sections = groups
      .map((group) => document.getElementById(group.category.id))
      .filter((section) => section != null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id as CategoryId);
      },
      { rootMargin: "-160px 0px -55% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [groups]);

  useEffect(() => {
    const bar = barRef.current;
    const chip = bar?.querySelector<HTMLElement>(`[data-chip="${active}"]`);
    if (bar && chip) bar.scrollTo({ left: chip.offsetLeft - 16, behavior: "smooth" });
  }, [active]);

  function jumpTo(id: CategoryId) {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-12 pt-6">
      <section className="shop-hero relative overflow-hidden rounded-[2rem] px-5 py-7 text-white shadow-xl sm:px-8 sm:py-9 md:grid md:grid-cols-[1fr_22rem] md:items-center md:gap-8 lg:px-10">
        <div className="relative z-10">
          <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#f7d77d]">{t("shopEyebrow")}</p>
          <h1 className="mt-2 text-4xl font-extrabold leading-tight md:text-6xl">{t("shopTitle")}</h1>
          <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-white/80 md:text-lg">{t("tapToAdd")}</p>
          <div className="mt-5 flex flex-wrap gap-2 text-sm font-extrabold">
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5">{products.length}+ {t("varieties")}</span>
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5">{t("customQuantity")}</span>
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5">{t("priceFirst")}</span>
          </div>
        </div>
        <div className="relative mt-7 h-28 md:mt-0 md:h-40">
          {categories.slice(0, 3).map((category, index) => (
            <Image key={category.id} src={category.photo} alt="" width={220} height={220} className={`absolute top-1/2 aspect-square h-24 w-24 -translate-y-1/2 rounded-full object-cover shadow-2xl ring-4 ring-white/20 md:h-32 md:w-32 ${index === 0 ? "left-0 rotate-[-8deg]" : index === 1 ? "left-1/2 z-10 -translate-x-1/2" : "right-0 rotate-[8deg]"}`} />
          ))}
        </div>
      </section>

      <div className="relative z-10 mx-3 -mt-5 shadow-xl sm:mx-6">
        <label htmlFor="goods-search" className="sr-only">
          {t("searchLabel")}
        </label>
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
        <input
          id="goods-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t("searchPlaceholder")}
          className="w-full rounded-full border border-border bg-surface py-4 pl-12 pr-12 text-lg outline-none focus:border-rose focus:ring-2 focus:ring-rose/15"
        />
        {query ? (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label={t("clearSearch")}
            className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-background"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        ) : null}
      </div>

      <div className="sticky top-[91px] z-20 -mx-4 mt-4 bg-background/95 px-4 py-3 backdrop-blur">
        <div ref={barRef} className="no-scrollbar flex gap-2 overflow-x-auto" role="group" aria-label={t("categoriesTitle")}>
          {groups.map(({ category }) => {
            const on = category.id === active;
            return (
              <button
                key={category.id}
                type="button"
                data-chip={category.id}
                aria-pressed={on}
                onClick={() => jumpTo(category.id)}
                className={`flex shrink-0 items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 text-base font-bold transition ${
                  on ? "bg-accent text-accent-foreground" : "bg-surface text-foreground ring-1 ring-border"
                }`}
              >
                <Image src={category.photo} alt="" width={64} height={64} className="h-8 w-8 rounded-full object-cover" />
                {text(category.name)}
              </button>
            );
          })}
        </div>
      </div>

      {query ? (
        <p className="mt-3 text-sm font-bold text-muted">
          {total} {t("results")}
        </p>
      ) : null}

      {groups.length === 0 ? (
        <div className="mt-6 rounded-[2rem] bg-surface p-6 text-center ring-1 ring-border">
          <p className="text-lg font-bold">{t("noResults")}</p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="mt-4 rounded-full bg-accent px-5 py-3 font-extrabold text-accent-foreground"
          >
            {t("clearSearch")}
          </button>
        </div>
      ) : (
        <div className="mt-4 grid gap-8">
          {groups.map(({ category, items }) => (
            <CategoryTray key={category.id} category={category} items={items} />
          ))}
        </div>
      )}
    </div>
  );
}

function CategoryTray({ category, items }: { category: Category; items: Product[] }) {
  const { t, text } = useLanguage();
  const prices = items.map((item) => item.price).filter((price) => price != null);
  const low = prices.length ? Math.min(...prices) : null;
  const high = prices.length ? Math.max(...prices) : null;
  const unit = items[0]?.unit === "pack" ? t("perPack") : t("perKg");

  return (
    <section id={category.id} className="scroll-mt-40" aria-labelledby={`${category.id}-title`}>
      <div className="overflow-clip rounded-[2rem] bg-surface shadow-lg shadow-[#7b2a3a]/5 ring-1 ring-border">
        <header className="relative min-h-56 overflow-hidden text-white md:min-h-64">
          <Image src={category.photo} alt="" fill sizes="(max-width: 768px) 100vw, 72rem" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#421724] via-[#741d39]/90 to-[#9f2449]/20" />
          <div className="relative flex min-h-56 items-end p-5 md:min-h-64 md:p-8">
            <div className="max-w-2xl">
              <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#f7d77d]">
                {items.length} {t("results")}
              </p>
              <h2 id={`${category.id}-title`} className="mt-1 text-4xl font-extrabold leading-tight md:text-6xl">
                {text(category.name)}
              </h2>
              <p className="mt-2 max-w-xl text-sm font-semibold leading-relaxed text-white/80 md:text-base">{text(category.promise)}</p>
              {low != null && high != null ? (
                <p className="mt-4 inline-block rounded-full bg-[#f7d77d] px-4 py-2 text-sm font-extrabold text-[#59290f] shadow-lg">
                  {low === high ? inr(low) : `${inr(low)} – ${inr(high)}`} · {unit}
                </p>
              ) : null}
              {category.id === "farsan" ? <p className="mt-2 text-sm font-bold text-[#f7d77d]">{t("farsanNote")}</p> : null}
            </div>
          </div>
        </header>

        <ul className="grid gap-3 p-3 md:grid-cols-2 md:gap-4 md:p-5">
          {items.map((product, index) => (
            <RateRow key={product.slug} product={product} index={index + 1} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function RateRow({ product, index }: { product: Product; index: number }) {
  const { lang, t } = useLanguage();
  const other = lang === "gu" ? "en" : "gu";

  return (
    <li className="group relative flex flex-col overflow-hidden rounded-[1.5rem] bg-[#fffdfa] p-4 shadow-sm ring-1 ring-border transition hover:-translate-y-1 hover:shadow-xl">
      <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#71363d] via-rose-deep to-rose" />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 gap-3">
            <span className="mt-0.5 text-xs font-extrabold tracking-widest text-rose/60">{String(index).padStart(2, "0")}</span>
            <Link href={`/product/${product.slug}`} className="min-w-0 text-xl font-extrabold leading-tight transition group-hover:text-rose-deep">{product.name[lang]}</Link>
          </div>
          <span className="shrink-0 rounded-full bg-gold-soft px-3 py-1 text-base font-extrabold text-accent">
            {product.price == null ? (
              <span className="text-sm">{t("priceOnCall")}</span>
            ) : (
              <>
                {inr(product.price)}
                <span className="ml-1 text-xs font-bold text-muted">{product.unit === "pack" ? t("perPack") : t("perKg")}</span>
              </>
            )}
          </span>
        </div>
        <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-bold text-muted">
          <span>{product.name[other]}</span>
          {product.packSize ? <span>· {product.packSize[lang]}</span> : null}
          {product.sugarFree ? (
            <span className="rounded-full bg-gold-soft px-2 py-0.5 text-xs font-extrabold text-gold">{t("sugarFree")}</span>
          ) : null}
        </p>
      </div>
      <div className="mt-4 border-t border-dashed border-border pt-4"><PortionPicker product={product} /></div>
    </li>
  );
}
