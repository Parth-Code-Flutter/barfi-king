"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { CloseIcon, SearchIcon } from "@/components/icons";
import { categories, filterProducts, isCategoryId } from "@/features/catalog/data";
import { inr } from "@/features/catalog/format";
import type { Category, CategoryId, Product } from "@/features/catalog/types";
import { useLanguage } from "@/features/i18n/language-provider";
import { BoxPanel } from "@/features/shop/box-panel";
import { shopCopy, type SortMode } from "@/features/shop/shop-copy";
import { SweetTile } from "@/features/shop/sweet-tile";

type View = CategoryId | "all";

const HASH_EVENT = "bk-shop-hash";

function subscribeHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  window.addEventListener(HASH_EVENT, onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener(HASH_EVENT, onChange);
  };
}

function readHash(): View {
  const id = window.location.hash.slice(1);
  return isCategoryId(id) ? id : "all";
}

function writeHash(view: View) {
  window.history.replaceState(null, "", view === "all" ? window.location.pathname : `#${view}`);
  window.dispatchEvent(new Event(HASH_EVENT));
}

function sortItems(items: Product[], mode: SortMode) {
  if (mode === "shop") return items;
  const sign = mode === "low" ? 1 : -1;
  return [...items].sort((a, b) => {
    if (a.price == null) return 1;
    if (b.price == null) return -1;
    return (a.price - b.price) * sign;
  });
}

export function ShopBrowser() {
  const { lang, t, text } = useLanguage();
  const view = useSyncExternalStore(subscribeHash, readHash, () => "all" as View);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortMode>("shop");
  const [sugarFree, setSugarFree] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const matches = useMemo(
    () => filterProducts("all", query).filter((item) => !sugarFree || item.sugarFree),
    [query, sugarFree],
  );
  const counts = useMemo(() => {
    const map = new Map<CategoryId, number>();
    for (const item of matches) map.set(item.category, (map.get(item.category) ?? 0) + 1);
    return map;
  }, [matches]);
  const groups = categories
    .filter((category) => view === "all" || category.id === view)
    .map((category) => ({
      category,
      items: sortItems(
        matches.filter((item) => item.category === category.id),
        sort,
      ),
    }))
    .filter((group) => group.items.length > 0);
  const shown = groups.reduce((sum, group) => sum + group.items.length, 0);

  useEffect(() => {
    const bar = barRef.current;
    const chip = bar?.querySelector<HTMLElement>(`[data-chip="${view}"]`);
    if (bar && chip) bar.scrollTo({ left: chip.offsetLeft - (bar.clientWidth - chip.offsetWidth) / 2, behavior: "smooth" });
  }, [view]);

  function choose(next: View) {
    writeHash(next);
    const list = listRef.current;
    const bar = barRef.current?.parentElement;
    if (!list || !bar) return;
    const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 92;
    const top = list.getBoundingClientRect().top + window.scrollY - header - bar.offsetHeight - 12;
    if (window.scrollY > top) window.scrollTo({ top, behavior: "smooth" });
  }

  function search(value: string) {
    setQuery(value);
    if (value && view !== "all") writeHash("all");
  }

  function reset() {
    setQuery("");
    setSugarFree(false);
    writeHash("all");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-6">
      <header className="kesar-strands relative overflow-hidden rounded-[2rem] bg-butter-soft px-4 py-5 ring-1 ring-butter sm:px-8 sm:py-7 lg:flex lg:items-end lg:justify-between lg:gap-10">
        <div className="relative">
          <p className="section-kicker">{t("shopEyebrow")}</p>
          <h1 className="mt-1 text-[2.3rem] font-extrabold leading-tight text-thabdi sm:mt-2 sm:text-5xl">{t("shopTitle")}</h1>
          <ol className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-2 text-xs font-extrabold sm:mt-4 sm:gap-x-2 sm:text-sm">
            {shopCopy.steps.map((step, index) => (
              <li key={step.en} className="flex items-center gap-1.5 sm:gap-2">
                <span className="flex items-center gap-1.5 rounded-full bg-surface py-1 pl-1 pr-2.5 text-thabdi ring-1 ring-border sm:gap-2 sm:pr-3">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-kesar text-[11px] text-white sm:h-6 sm:w-6 sm:text-xs">{index + 1}</span>
                  {text(step)}
                </span>
                {index < shopCopy.steps.length - 1 ? <span className="text-kesar" aria-hidden="true">→</span> : null}
              </li>
            ))}
          </ol>
        </div>

        <div className="relative mt-4 sm:mt-6 lg:mt-0 lg:w-[26rem] lg:shrink-0">
          <label htmlFor="goods-search" className="sr-only">
            {t("searchLabel")}
          </label>
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-kesar" />
          <input
            id="goods-search"
            type="search"
            value={query}
            onChange={(event) => search(event.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full rounded-full border border-border bg-surface py-3 pl-12 pr-12 text-lg shadow-lg sm:py-4 shadow-thabdi/10 outline-none focus:border-kesar focus:ring-4 focus:ring-kesar/15"
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
      </header>

      <div className="sticky top-(--header-h) z-20 -mx-4 mt-4 bg-background/95 px-4 py-3 backdrop-blur">
        <div ref={barRef} className="no-scrollbar flex gap-2 overflow-x-auto" role="group" aria-label={t("categoriesTitle")}>
          <Tab id="all" on={view === "all"} count={matches.length} label={t("all")} onPick={choose}>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-butter text-lg text-thabdi">✿</span>
          </Tab>
          {categories.map((category) => (
            <Tab
              key={category.id}
              id={category.id}
              on={view === category.id}
              count={counts.get(category.id) ?? 0}
              label={text(category.name)}
              onPick={choose}
            >
              <Image src={category.photo} alt="" width={72} height={72} className="h-9 w-9 rounded-full object-cover" />
            </Tab>
          ))}
        </div>
      </div>

      <div ref={listRef} className="mt-3 lg:grid lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-8">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-extrabold text-muted" aria-live="polite">
              {shopCopy.shown(shown, lang)}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                aria-pressed={sugarFree}
                onClick={() => setSugarFree((value) => !value)}
                className={`rounded-full px-3 py-2 text-sm font-extrabold transition ${
                  sugarFree ? "bg-pista text-white" : "bg-pista-soft text-pista-deep ring-1 ring-pista/25 hover:bg-pista/20"
                }`}
              >
                {sugarFree ? "✓ " : ""}
                {t("sugarFree")}
              </button>
              <div role="radiogroup" aria-label={text(shopCopy.sortLabel)} className="flex rounded-full bg-surface p-1 ring-1 ring-border">
                {(Object.keys(shopCopy.sort) as SortMode[]).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    role="radio"
                    aria-checked={sort === mode}
                    onClick={() => setSort(mode)}
                    className={`rounded-full px-3 py-1.5 text-xs font-extrabold transition sm:text-sm ${
                      sort === mode ? "bg-thabdi text-butter-soft" : "text-muted hover:text-thabdi"
                    }`}
                  >
                    {text(shopCopy.sort[mode])}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {groups.length === 0 ? (
            <div className="mt-6 rounded-[2rem] bg-surface p-8 text-center ring-1 ring-border">
              <p className="font-display text-2xl font-extrabold text-thabdi">{t("noResults")}</p>
              <button type="button" onClick={reset} className="mt-4 rounded-full bg-accent px-5 py-3 font-extrabold text-accent-foreground">
                {text(shopCopy.showAll)}
              </button>
            </div>
          ) : (
            <div className="mt-5 grid gap-12">
              {groups.map(({ category, items }) => (
                <Shelf key={category.id} category={category} items={items} />
              ))}
            </div>
          )}

          {view !== "all" && groups.length > 0 ? (
            <div className="mt-10 text-center">
              <button type="button" onClick={() => choose("all")} className="rounded-full bg-butter px-6 py-3 font-extrabold text-thabdi">
                {text(shopCopy.showAll)} →
              </button>
            </div>
          ) : null}
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-[calc(var(--header-h)+5.5rem)]">
            <BoxPanel />
          </div>
        </aside>
      </div>
    </div>
  );
}

function Tab({
  id,
  on,
  count,
  label,
  onPick,
  children,
}: {
  id: View;
  on: boolean;
  count: number;
  label: string;
  onPick: (id: View) => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      data-chip={id}
      aria-pressed={on}
      disabled={count === 0 && !on}
      onClick={() => onPick(id)}
      className={`flex shrink-0 items-center gap-2 rounded-full py-1 pl-1 pr-2 text-base font-bold transition disabled:opacity-40 ${
        on ? "bg-accent text-accent-foreground shadow-md shadow-accent/25" : "bg-surface text-foreground ring-1 ring-border hover:bg-butter-soft"
      }`}
    >
      {children}
      {label}
      <span className={`grid h-6 min-w-6 place-items-center rounded-full px-1.5 text-xs font-extrabold ${on ? "bg-butter text-thabdi" : "bg-background text-muted"}`}>
        {count}
      </span>
    </button>
  );
}

function Shelf({ category, items }: { category: Category; items: Product[] }) {
  const { t, text } = useLanguage();
  const prices = items.map((item) => item.price).filter((price) => price != null);
  const low = prices.length ? Math.min(...prices) : null;
  const high = prices.length ? Math.max(...prices) : null;
  const unit = items[0]?.unit === "pack" ? t("perPack") : t("perKg");

  return (
    <section aria-labelledby={`${category.id}-title`}>
      <header className="mb-4 flex items-center gap-4 border-b-2 border-dashed border-border pb-4">
        <span className="relative block h-16 w-16 shrink-0 -rotate-6 overflow-hidden rounded-full shadow-md ring-4 ring-surface">
          <Image src={category.photo} alt="" fill sizes="64px" className="object-cover" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 id={`${category.id}-title`} className="text-3xl font-extrabold leading-tight text-thabdi">
            {text(category.name)}
          </h2>
          <p className="text-sm font-semibold text-foreground/70">{text(category.promise)}</p>
        </div>
        {low != null && high != null ? (
          <span className="hidden shrink-0 -rotate-2 rounded-full bg-kesar px-4 py-1.5 text-sm font-extrabold text-white shadow-md shadow-kesar/30 sm:block">
            {low === high ? inr(low) : `${inr(low)} – ${inr(high)}`} · {unit}
          </span>
        ) : null}
      </header>
      {category.id === "farsan" ? <p className="mb-4 rounded-2xl bg-kesar-soft px-4 py-3 text-sm font-bold text-accent">{t("farsanNote")}</p> : null}
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((product) => (
          <SweetTile key={product.slug} product={product} />
        ))}
      </ul>
    </section>
  );
}
