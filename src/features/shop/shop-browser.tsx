"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { CloseIcon, SearchIcon } from "@/components/icons";
import { PortionPicker } from "@/components/portion-picker";
import { categories, filterProducts } from "@/features/catalog/data";
import { inr } from "@/features/catalog/format";
import type { Category, CategoryId, Product } from "@/features/catalog/types";
import { useLanguage } from "@/features/i18n/language-provider";
import { useOrder, type Audience } from "@/features/order/order-provider";

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
      <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <h1 className="text-4xl font-extrabold md:text-5xl">{t("shopTitle")}</h1>
          <p className="mt-2 text-lg text-muted">{t("tapToAdd")}</p>
        </div>
        <AudienceSwitch />
      </div>

      <div className="relative mt-5">
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
          className="w-full rounded-full border border-border bg-surface py-3.5 pl-12 pr-12 text-lg outline-none focus:border-gold"
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

      <div className="sticky top-[69px] z-20 -mx-4 mt-4 bg-background/95 px-4 py-3 backdrop-blur">
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

function AudienceSwitch() {
  const { t } = useLanguage();
  const { audience, setAudience } = useOrder();
  const options: { id: Audience; label: string; hint: string }[] = [
    { id: "home", label: t("forHome"), hint: t("homeHint") },
    { id: "trade", label: t("forShop"), hint: t("shopHint") },
  ];

  return (
    <div className="grid grid-cols-2 gap-1 rounded-[1.4rem] bg-surface p-1 ring-1 ring-border lg:w-[26rem]" role="group">
      {options.map((option) => {
        const on = audience === option.id;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={on}
            onClick={() => setAudience(option.id)}
            className={`rounded-[1.1rem] px-3 py-2.5 text-center leading-tight transition ${
              on ? "bg-accent text-accent-foreground shadow" : "text-foreground hover:bg-background"
            }`}
          >
            <span className="block text-lg font-extrabold">{option.label}</span>
            <span className={`block text-xs font-bold ${on ? "text-gold-soft" : "text-muted"}`}>{option.hint}</span>
          </button>
        );
      })}
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
      <div className="overflow-clip rounded-[2rem] bg-surface ring-1 ring-border md:grid md:grid-cols-[15rem_1fr] lg:grid-cols-[18rem_1fr]">
        <header className="tray rounded-[2rem]">
          <div className="flex items-center gap-4 p-5 md:sticky md:top-40 md:flex-col md:items-start md:p-7">
            <Image
              src={category.photo}
              alt=""
              width={320}
              height={320}
              className="h-24 w-24 shrink-0 rounded-full object-cover ring-[5px] ring-gold-soft md:h-40 md:w-40"
            />
            <div className="min-w-0">
              <p className="text-xs font-extrabold text-gold-soft">
                {items.length} {t("results")}
              </p>
              <h2 id={`${category.id}-title`} className="text-3xl font-extrabold leading-tight">
                {text(category.name)}
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-gold-soft">{text(category.promise)}</p>
              {low != null && high != null ? (
                <p className="mt-2 inline-block rounded-full bg-gold-soft px-3 py-1 text-sm font-extrabold text-accent">
                  {low === high ? inr(low) : `${inr(low)} – ${inr(high)}`} · {unit}
                </p>
              ) : null}
              {category.id === "farsan" ? <p className="mt-2 text-sm font-bold text-gold-soft">{t("farsanNote")}</p> : null}
            </div>
          </div>
        </header>

        <ul className="divide-y divide-dashed divide-border">
          {items.map((product) => (
            <RateRow key={product.slug} product={product} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function RateRow({ product }: { product: Product }) {
  const { lang, t } = useLanguage();
  const other = lang === "gu" ? "en" : "gu";

  return (
    <li className="grid gap-3 px-4 py-4 sm:grid-cols-[1fr_19.5rem] sm:items-center sm:gap-6 md:px-6">
      <div className="min-w-0">
        <div className="flex items-baseline gap-2">
          <Link href={`/product/${product.slug}`} className="min-w-0 text-xl font-extrabold leading-tight hover:text-accent">
            {product.name[lang]}
          </Link>
          <span className="leader" aria-hidden="true" />
          <span className="shrink-0 text-lg font-extrabold text-accent">
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
      <PortionPicker product={product} />
    </li>
  );
}
