"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { categories, filterProducts, getCategory, isCategoryId } from "@/features/catalog/data";
import { useLanguage } from "@/features/i18n/language-provider";
import { useOrder } from "@/features/order/order-provider";

export function ShopBrowser({ initialCategory }: { initialCategory?: string }) {
  const { t, text } = useLanguage();
  const { audience, setAudience } = useOrder();
  const router = useRouter();
  const category = isCategoryId(initialCategory) ? initialCategory : "all";
  const [query, setQuery] = useState("");

  function selectCategory(next: string) {
    router.replace(next === "all" ? "/shop" : `/shop?category=${next}`, { scroll: false });
  }
  const selected = getCategory(category);
  const items = useMemo(() => filterProducts(category, query), [category, query]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="text-4xl font-extrabold">{t("shopTitle")}</h1>
      <div className="mt-4 grid grid-cols-2 gap-2" role="group" aria-label={t("forHome")}>
        <button
          type="button"
          aria-pressed={audience === "home"}
          className={`rounded-2xl px-4 py-3 text-lg font-extrabold ${audience === "home" ? "bg-accent text-accent-foreground" : "bg-surface"}`}
          onClick={() => setAudience("home")}
        >
          {t("forHome")}
        </button>
        <button
          type="button"
          aria-pressed={audience === "trade"}
          className={`rounded-2xl px-4 py-3 text-lg font-extrabold ${audience === "trade" ? "bg-accent text-accent-foreground" : "bg-surface"}`}
          onClick={() => setAudience("trade")}
        >
          {t("forShop")}
        </button>
      </div>
      <label className="mt-4 block text-sm font-bold" htmlFor="goods-search">
        {t("searchLabel")}
      </label>
      <input
        id="goods-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t("searchPlaceholder")}
        className="mt-2 w-full rounded-2xl border border-border bg-surface px-4 py-3 text-lg outline-none"
      />

      <div className="mt-4 flex gap-2 overflow-x-auto pb-2" role="group" aria-label={t("categoriesTitle")}>
        <button
          type="button"
          aria-pressed={category === "all"}
          className={`shrink-0 rounded-full px-4 py-3 text-base font-bold ${category === "all" ? "bg-accent text-accent-foreground" : "bg-surface text-foreground"}`}
          onClick={() => selectCategory("all")}
        >
          {t("all")}
        </button>
        {categories.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={category === item.id}
            className={`shrink-0 rounded-full px-4 py-3 text-base font-bold ${category === item.id ? "bg-accent text-accent-foreground" : "bg-surface text-foreground"}`}
            onClick={() => selectCategory(item.id)}
          >
            {text(item.name)}
          </button>
        ))}
      </div>

      {selected ? (
        <div className="mt-4 flex items-center gap-4 rounded-[1.6rem] bg-surface p-3 ring-1 ring-border">
          <Image
            src={selected.photo}
            alt=""
            width={160}
            height={160}
            className="h-16 w-16 rounded-2xl object-cover"
          />
          <div>
            <h2 className="text-2xl font-extrabold">{text(selected.name)}</h2>
            <p className="text-sm leading-relaxed text-muted">{text(selected.promise)}</p>
            {selected.id === "farsan" ? <p className="mt-1 text-sm font-bold text-gold">{t("farsanNote")}</p> : null}
          </div>
        </div>
      ) : null}

      <p className="mt-5 text-sm font-bold text-muted">
        {items.length} {t("results")}
      </p>
      {items.length === 0 ? (
        <p className="mt-4 rounded-3xl bg-surface p-6 text-lg font-bold">{t("noResults")}</p>
      ) : (
        <div className="mt-8 grid gap-x-5 gap-y-16 pt-12 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((product) => (
            <ProductCard key={`${product.slug}-${audience}`} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
