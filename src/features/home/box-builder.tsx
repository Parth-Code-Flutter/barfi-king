"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { CheckIcon, CloseIcon, PlusIcon, WhatsAppIcon } from "@/components/icons";
import { whatsappHref } from "@/config/site";
import { getCategory, getProduct, products } from "@/features/catalog/data";
import { inr, portionAmount } from "@/features/catalog/format";
import type { CategoryId, LocaleText, Product } from "@/features/catalog/types";
import { builderCopy } from "@/features/home/home-copy";
import { useLanguage } from "@/features/i18n/language-provider";
import { useOrder } from "@/features/order/order-provider";

const CUPS = 4;
const SIZES = {
  half: { grams: 125, label: builderCopy.half },
  full: { grams: 250, label: builderCopy.full },
} as const;
type Size = keyof typeof SIZES;

const SHELF: CategoryId[] = ["peda", "barfi", "fancy", "dry-fruit", "halwa", "laddu"];
const shelfProducts = products.filter((product) => SHELF.includes(product.category) && product.unit === "kg" && product.price != null);

type Cup = { slug: string; drop: number } | null;

function gramsLabel(grams: number): LocaleText {
  return { gu: `${grams} ગ્રામ`, en: grams === 250 ? "250 gram" : `${grams} grams` };
}

/** Same ids as the weight chips in the shop, so a box and a chip add to the same order line. */
function cupLine(product: Product, grams: number) {
  return {
    id: grams === 250 ? `${product.slug}-250g` : `${product.slug}-custom-${grams}g`,
    slug: product.slug,
    name: product.name,
    qty: gramsLabel(grams),
    amount: portionAmount(product, grams / 1000),
  };
}

function photoOf(product: Product) {
  return getCategory(product.category)?.photo ?? "/sweets/peda.jpg";
}

export function BoxBuilder() {
  const { lang, text } = useLanguage();
  const { addLine } = useOrder();
  const [size, setSize] = useState<Size>("full");
  const [shelf, setShelf] = useState<CategoryId>("peda");
  const [cups, setCups] = useState<Cup[]>(() => Array<Cup>(CUPS).fill(null));
  const [justAdded, setJustAdded] = useState(false);
  const [status, setStatus] = useState("");
  const dropCount = useRef(0);
  const boxRef = useRef<HTMLDivElement>(null);

  const grams = SIZES[size].grams;
  const chosen = cups.map((cup) => (cup ? getProduct(cup.slug) : undefined));
  const filled = chosen.filter((product): product is Product => product != null);
  const left = CUPS - filled.length;
  const total = filled.reduce((sum, product) => sum + (portionAmount(product, grams / 1000) ?? 0), 0);
  const rows = filled.map((product, index) => `${index + 1}. ${product.name[lang]} — ${gramsLabel(grams)[lang]} — ${inr(portionAmount(product, grams / 1000) ?? 0)}`);
  const message = builderCopy.message(text(SIZES[size].label), rows, inr(total), lang);

  function place(next: Cup[], note: string) {
    setCups(next);
    setJustAdded(false);
    setStatus(note);
  }

  function drop(product: Product) {
    const index = cups.indexOf(null);
    if (index === -1) {
      setStatus(text(builderCopy.boxFull));
      return;
    }
    const next = [...cups];
    dropCount.current += 1;
    next[index] = { slug: product.slug, drop: dropCount.current };
    const remaining = left - 1;
    place(next, `${text(product.name)} ✓ ${remaining > 0 ? builderCopy.left(remaining, lang) : text(builderCopy.boxFull)}`);
  }

  function lift(index: number) {
    const next = [...cups];
    next[index] = null;
    place(next, builderCopy.left(left + 1, lang));
  }

  function surprise() {
    const taken = new Set(cups.filter((cup) => cup != null).map((cup) => cup.slug));
    const pool = shelfProducts.filter((product) => !taken.has(product.slug));
    const next = cups.map((cup) => {
      if (cup) return cup;
      const pick = pool.splice(Math.floor(Math.random() * pool.length), 1)[0] ?? shelfProducts[0];
      dropCount.current += 1;
      return { slug: pick.slug, drop: dropCount.current };
    });
    place(next, text(builderCopy.boxFull));
    boxRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function addToOrder() {
    filled.forEach((product) => addLine(cupLine(product, grams)));
    setCups(Array<Cup>(CUPS).fill(null));
    setJustAdded(true);
    setStatus(text(builderCopy.added));
    window.setTimeout(() => setJustAdded(false), 2600);
  }

  const inBox = (slug: string) => cups.filter((cup) => cup?.slug === slug).length;

  return (
    <section id="box-builder" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-14 sm:py-20" aria-labelledby="box-builder-title">
      <div className="mx-auto max-w-2xl text-center">
        <p className="section-kicker">{text(builderCopy.kicker)}</p>
        <h2 id="box-builder-title" className="mt-2 text-4xl font-extrabold leading-tight text-thabdi sm:text-5xl">{text(builderCopy.title)}</h2>
        <p className="mt-3 text-lg text-muted">{text(builderCopy.hint)}</p>
      </div>

      <div className="mt-10 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_28rem] lg:items-start xl:grid-cols-[minmax(0,1fr)_31rem]">
        <div ref={boxRef} className="min-w-0 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:order-2">
          <div className="relative mx-auto max-w-[26rem] pt-12">
            <div aria-hidden="true" className="absolute inset-x-5 top-0 h-20 -rotate-[5deg] rounded-t-[1.8rem] bg-kesar shadow-md">
              <span className="absolute inset-y-0 left-1/2 w-5 -translate-x-1/2 bg-butter" />
              <span className="absolute left-5 top-3 font-display text-lg font-extrabold text-white/90">{lang === "gu" ? "જલારામ સ્વીટ્સ" : "Jalaram Sweets"}</span>
            </div>
            <div className="relative rounded-[1.9rem] bg-accent bg-[radial-gradient(circle,rgb(246_215_125/0.35)_1.4px,transparent_1.8px)] bg-[length:14px_14px] p-3 shadow-2xl shadow-accent/30">
              <ul className="grid grid-cols-2 gap-3 rounded-[1.4rem] bg-butter-soft p-3 sm:gap-4 sm:p-4">
                {cups.map((cup, index) => {
                  const product = chosen[index];
                  return (
                    <li key={index} className="paper-cup relative aspect-square rounded-full">
                      {cup && product ? (
                        <button
                          type="button"
                          onClick={() => lift(index)}
                          aria-label={`${text(builderCopy.removeCup)}: ${text(product.name)}`}
                          className="group absolute inset-0 grid place-items-center rounded-full"
                        >
                          <span key={cup.drop} className="plop relative block h-[74%] w-[74%]">
                            <Image src={photoOf(product)} alt="" fill sizes="180px" className="rounded-full object-cover shadow-lg ring-4 ring-white/80" />
                          </span>
                          <span className="absolute right-[6%] top-[6%] grid h-7 w-7 place-items-center rounded-full bg-surface text-muted shadow ring-1 ring-border transition group-hover:bg-accent group-hover:text-white">
                            <CloseIcon className="h-3.5 w-3.5" />
                          </span>
                          <span className="absolute -bottom-1 left-1/2 max-w-[96%] -translate-x-1/2 truncate rounded-full bg-surface px-2.5 py-1 text-xs font-extrabold text-thabdi shadow ring-1 ring-border sm:text-sm">
                            {text(product.name)}
                          </span>
                        </button>
                      ) : (
                        <span className="absolute inset-0 grid place-items-center text-center leading-tight text-muted/70">
                          <span>
                            <span className="block font-display text-3xl font-extrabold">{index + 1}</span>
                            <span className="text-xs font-bold">{text(builderCopy.empty)}</span>
                          </span>
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="mx-auto mt-5 max-w-[26rem] rounded-[1.6rem] bg-surface p-4 shadow-sm ring-1 ring-border sm:p-5">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-muted">{text(builderCopy.total)} · {text(SIZES[size].label)}</p>
                <p key={total} className="bump font-display text-4xl font-extrabold leading-none text-accent">{inr(total)}</p>
              </div>
              <p className={`rounded-full px-3 py-1 text-sm font-extrabold ${left === 0 ? "bg-pista text-white" : "bg-pista-soft text-pista-deep"}`}>
                {left === 0 ? text(builderCopy.boxFull) : builderCopy.left(left, lang)}
              </p>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-1.5" aria-hidden="true">
              {cups.map((cup, index) => (
                <span key={index} className={`h-1.5 rounded-full transition-colors ${cup ? "bg-kesar" : "bg-border"}`} />
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={addToOrder}
                disabled={filled.length === 0}
                className="flex items-center justify-center gap-1.5 rounded-full bg-accent px-3 py-3 font-extrabold text-accent-foreground transition enabled:hover:-translate-y-0.5 disabled:opacity-40"
              >
                {justAdded ? <CheckIcon className="h-5 w-5" /> : <PlusIcon className="h-5 w-5" />}
                {text(builderCopy.add)}
              </button>
              {filled.length > 0 ? (
                <a
                  href={whatsappHref(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-full bg-whatsapp px-3 py-3 text-center font-extrabold leading-tight text-white transition hover:-translate-y-0.5"
                >
                  <WhatsAppIcon className="h-5 w-5 shrink-0" />
                  {text(builderCopy.send)}
                </a>
              ) : (
                <span aria-disabled="true" className="flex items-center justify-center gap-1.5 rounded-full bg-whatsapp px-3 py-3 text-center font-extrabold leading-tight text-white opacity-40">
                  <WhatsAppIcon className="h-5 w-5 shrink-0" />
                  {text(builderCopy.send)}
                </span>
              )}
            </div>
            <div className="mt-2 flex items-center justify-between gap-2">
              <button type="button" onClick={surprise} disabled={left === 0} className="rounded-full bg-butter px-4 py-2 text-sm font-extrabold text-thabdi transition enabled:hover:brightness-95 disabled:opacity-40">
                ✦ {text(builderCopy.lucky)}
              </button>
              <button type="button" onClick={() => place(Array<Cup>(CUPS).fill(null), builderCopy.left(CUPS, lang))} disabled={filled.length === 0} className="rounded-full px-3 py-2 text-sm font-bold text-muted hover:text-foreground disabled:opacity-40">
                {text(builderCopy.reset)}
              </button>
            </div>
            <p className={`mt-2 min-h-5 text-center text-sm font-extrabold ${justAdded ? "text-pista-deep" : "text-muted"}`} aria-live="polite">
              {status}
            </p>
          </div>
        </div>

        <div className="min-w-0 rounded-[2rem] bg-surface p-4 shadow-sm ring-1 ring-border sm:p-6 lg:order-1">
          <div className="sticky top-(--header-h) z-10 -mx-4 -mt-4 mb-3 flex min-w-0 items-center gap-1.5 rounded-t-[2rem] bg-surface/95 px-4 py-2.5 sm:-mx-6 sm:-mt-6 sm:gap-2 sm:px-6 backdrop-blur lg:hidden">
            <div className="flex -space-x-2">
              {cups.map((cup, index) => {
                const product = chosen[index];
                return product ? (
                  <Image key={`cup-${cup?.drop}`} src={photoOf(product)} alt="" width={64} height={64} className="plop h-8 w-8 rounded-full object-cover ring-2 ring-surface sm:h-9 sm:w-9" />
                ) : (
                  <span key={`empty-${index}`} className="h-8 w-8 rounded-full border-2 border-dashed border-border bg-background sm:h-9 sm:w-9" />
                );
              })}
            </div>
            <p className="ml-auto shrink-0 font-display text-2xl font-extrabold text-accent">{inr(total)}</p>
            <button type="button" aria-label={`↑ ${text(builderCopy.kicker)}`} onClick={() => boxRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })} className="min-h-10 shrink-0 rounded-full bg-accent px-3 py-1.5 text-sm font-extrabold text-accent-foreground">
              <span className="sm:hidden">↑ {lang === "gu" ? "ડબ્બો" : "Box"}</span>
              <span className="hidden sm:inline">↑ {text(builderCopy.kicker)}</span>
            </button>
          </div>

          <div className="inline-flex rounded-full bg-background p-1 ring-1 ring-border" role="group" aria-label={text(builderCopy.kicker)}>
            {(Object.keys(SIZES) as Size[]).map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={size === key}
                onClick={() => setSize(key)}
                className={`rounded-full px-4 py-2 text-sm font-extrabold transition ${size === key ? "bg-thabdi text-butter-soft shadow" : "text-muted hover:text-foreground"}`}
              >
                {text(SIZES[key].label)}
              </button>
            ))}
          </div>
          <p className="mt-2 text-sm font-bold text-muted">
            {text(builderCopy.each)}: {gramsLabel(grams)[lang]}
          </p>

          <div className="no-scrollbar -mx-4 mt-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist">
            {SHELF.map((id) => {
              const category = getCategory(id);
              if (!category) return null;
              const on = shelf === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setShelf(id)}
                  className={`flex shrink-0 items-center gap-2 rounded-full py-1 pl-1 pr-3.5 text-sm font-extrabold transition ${on ? "bg-kesar text-white shadow-md shadow-kesar/30" : "bg-background text-foreground ring-1 ring-border hover:bg-butter-soft"}`}
                >
                  <Image src={category.photo} alt="" width={56} height={56} className="h-7 w-7 rounded-full object-cover" />
                  {text(category.name)}
                </button>
              );
            })}
          </div>

          <ul className="mt-4 grid gap-2 sm:grid-cols-2" role="tabpanel">
            {shelfProducts
              .filter((product) => product.category === shelf)
              .map((product) => {
                const count = inBox(product.slug);
                return (
                  <li key={product.slug}>
                    <button
                      type="button"
                      onClick={() => drop(product)}
                      disabled={left === 0}
                      className="group flex w-full items-center gap-3 rounded-2xl bg-background p-2 pr-3 text-left ring-1 ring-border transition enabled:hover:-translate-y-0.5 enabled:hover:bg-butter-soft enabled:hover:ring-kesar/40 enabled:active:scale-[0.97] disabled:opacity-50"
                    >
                      <span className="relative shrink-0">
                        <Image src={photoOf(product)} alt="" width={96} height={96} className="h-12 w-12 rounded-full object-cover" />
                        {count > 0 ? <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-pista px-1 text-[11px] font-extrabold text-white">{count}</span> : null}
                      </span>
                      <span className="min-w-0 flex-1 leading-tight">
                        <span className="block font-extrabold">{product.name[lang]}</span>
                        <span className="mt-0.5 block text-xs font-bold text-muted">
                          {inr(portionAmount(product, grams / 1000) ?? 0)} · {gramsLabel(grams)[lang]}
                        </span>
                      </span>
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-kesar-soft text-accent transition group-enabled:group-hover:bg-kesar group-enabled:group-hover:text-white">
                        <PlusIcon className="h-4 w-4" />
                      </span>
                    </button>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </section>
  );
}
