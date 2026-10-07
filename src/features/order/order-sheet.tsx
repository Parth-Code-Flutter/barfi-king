"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CloseIcon, MinusIcon, PhoneIcon, PlusIcon, WhatsAppIcon } from "@/components/icons";
import { siteConfig, whatsappHref } from "@/config/site";
import { categories, getCategory, getProduct } from "@/features/catalog/data";
import { inr } from "@/features/catalog/format";
import type { Lang } from "@/features/i18n/copy";
import { useLanguage } from "@/features/i18n/language-provider";
import { useOrder, type Audience, type OrderLine } from "@/features/order/order-provider";

function linePhoto(line: OrderLine) {
  const product = getProduct(line.slug);
  return product ? getCategory(product.category)?.photo : undefined;
}

function buildMessage(lines: OrderLine[], audience: Audience, lang: Lang, total: number, hasUnknown: boolean) {
  const gu = lang === "gu";
  const intro =
    audience === "trade"
      ? gu
        ? "નમસ્તે, દુકાન માટે મારો ઓર્ડર:"
        : "Hello, my order for a shop:"
      : gu
        ? "નમસ્તે, મારો ઓર્ડર:"
        : "Hello, my order:";
  const body = lines.map((line, index) => {
    const times = line.count > 1 ? ` × ${line.count}` : "";
    const price = line.amount == null ? "" : ` — ${inr(line.amount * line.count)}`;
    return `${index + 1}. ${line.name[lang]} — ${line.qty[lang]}${times}${price}`;
  });
  const footer = [`${gu ? "કુલ" : "Total"}: ${inr(total)}`];
  if (hasUnknown) footer.push(gu ? "ફરસાણનો ભાવ જણાવજો." : "Please tell me the farsan price.");
  return [intro, ...body, "", ...footer].join("\n");
}

export function OrderSheet() {
  const { lang, t, text } = useLanguage();
  const { audience, lines, count, setCount, clear } = useOrder();
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (!confirming) return;
    const timer = window.setTimeout(() => setConfirming(false), 3000);
    return () => window.clearTimeout(timer);
  }, [confirming]);

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="tray rounded-[2rem] px-6 py-10 text-center">
          <div className="mx-auto flex w-fit -space-x-4">
            {categories.slice(0, 4).map((category) => (
              <Image
                key={category.id}
                src={category.photo}
                alt=""
                width={160}
                height={160}
                className="h-20 w-20 rounded-full object-cover ring-4 ring-accent"
              />
            ))}
          </div>
          <h1 className="mt-6 text-3xl font-extrabold">{t("yourOrder")}</h1>
          <p className="mx-auto mt-2 max-w-md text-lg text-gold-soft">{t("emptyOrder")}</p>
          <Link
            href="/shop"
            className="mt-6 inline-block rounded-full bg-gold-soft px-6 py-3 text-lg font-extrabold text-accent"
          >
            {t("seeGoods")}
          </Link>
        </div>
      </div>
    );
  }

  const priced = lines.filter((line) => line.amount != null);
  const unknown = lines.filter((line) => line.amount == null);
  const total = priced.reduce((sum, line) => sum + (line.amount ?? 0) * line.count, 0);
  const message = buildMessage(lines, audience, lang, total, unknown.length > 0);
  const sendHref = whatsappHref(message);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-10 pt-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-4xl font-extrabold md:text-5xl">{t("yourOrder")}</h1>
          <p className="mt-1 text-lg font-bold text-muted">
            {count} {t("results")} · {audience === "trade" ? t("forShop") : t("forHome")}
          </p>
        </div>
        <Link href="/shop" className="flex items-center gap-1.5 rounded-full bg-surface px-4 py-2.5 font-extrabold text-accent ring-1 ring-border">
          <PlusIcon className="h-4 w-4" />
          {t("addMore")}
        </Link>
      </div>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_24rem]">
        <ul className="overflow-clip rounded-[2rem] bg-surface ring-1 ring-border">
          {lines.map((line) => {
            const photo = linePhoto(line);
            return (
              <li key={line.id} className="flex gap-4 border-b border-dashed border-border p-4 last:border-b-0 md:p-5">
                <Link href={`/product/${line.slug}`} className="shrink-0">
                  {photo ? (
                    <Image src={photo} alt="" width={160} height={160} className="h-20 w-20 rounded-2xl object-cover md:h-24 md:w-24" />
                  ) : (
                    <span className="block h-20 w-20 rounded-2xl bg-background md:h-24 md:w-24" />
                  )}
                </Link>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <Link href={`/product/${line.slug}`} className="block text-xl font-extrabold leading-tight hover:text-accent">
                        {line.name[lang]}
                      </Link>
                      <p className="mt-1 text-sm font-bold text-muted">
                        {line.qty[lang]} · {line.amount == null ? t("priceOnCall") : inr(line.amount)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCount(line.id, 0)}
                      aria-label={`${t("remove")}: ${line.name[lang]}`}
                      className="-mr-1 -mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full text-muted hover:bg-background hover:text-foreground"
                    >
                      <CloseIcon className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="flex items-center rounded-full bg-background p-1 ring-1 ring-border">
                      <button
                        type="button"
                        onClick={() => setCount(line.id, line.count - 1)}
                        aria-label={t("oneLess")}
                        className="grid h-10 w-10 place-items-center rounded-full bg-surface text-accent ring-1 ring-border"
                      >
                        <MinusIcon className="h-5 w-5" />
                      </button>
                      <span className="w-10 text-center text-lg font-extrabold" aria-live="polite">
                        {line.count}
                      </span>
                      <button
                        type="button"
                        onClick={() => setCount(line.id, line.count + 1)}
                        aria-label={t("oneMore")}
                        className="grid h-10 w-10 place-items-center rounded-full bg-accent text-accent-foreground"
                      >
                        <PlusIcon className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="text-right text-xl font-extrabold text-accent">
                      {line.amount == null ? <span className="text-sm text-gold">{t("priceOnCall")}</span> : inr(line.amount * line.count)}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <aside className="grid gap-4 lg:sticky lg:top-24">
          <div className="tray rounded-[2rem] p-6">
            <p className="text-sm font-extrabold text-gold-soft">{text(siteConfig.shop)}</p>
            <h2 className="mt-1 text-2xl font-extrabold">{t("billTitle")}</h2>
            <dl className="mt-4 grid gap-2 text-base">
              <div className="flex items-baseline gap-2">
                <dt>{t("itemsTotal")}</dt>
                <span className="leader opacity-40" aria-hidden="true" />
                <dd className="font-extrabold">{inr(total)}</dd>
              </div>
              {unknown.map((line) => (
                <div key={line.id} className="flex items-baseline gap-2 text-gold-soft">
                  <dt className="min-w-0 truncate">{line.name[lang]}</dt>
                  <span className="leader opacity-40" aria-hidden="true" />
                  <dd className="shrink-0 font-bold">{t("priceOnCall")}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 flex items-baseline justify-between border-t border-dashed border-gold-soft/40 pt-4">
              <span className="text-xl font-extrabold">{t("total")}</span>
              <span className="text-4xl font-extrabold">{inr(total)}</span>
            </div>
            {unknown.length > 0 ? <p className="mt-2 text-sm text-gold-soft">{t("unknownNote")}</p> : null}
          </div>

          <div className="rounded-[2rem] bg-surface p-5 ring-1 ring-border">
            <p className="text-sm font-extrabold text-muted">{t("messagePreview")}</p>
            <p className="mt-3 max-h-56 overflow-auto whitespace-pre-line rounded-2xl rounded-tr-sm bg-[#dcf8c6] px-4 py-3 text-sm leading-relaxed text-[#1b2a1b]">
              {message}
            </p>
            <a
              href={sendHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#1e8e4e] px-5 py-4 text-lg font-extrabold text-white hover:bg-[#187a42]"
            >
              <WhatsAppIcon className="h-6 w-6" />
              {t("sendOrder")}
            </a>
            <a
              href={`tel:${siteConfig.orderPhone.tel}`}
              className="mt-3 flex items-center justify-center gap-2 rounded-full bg-gold-soft px-5 py-3.5 text-lg font-extrabold text-accent"
            >
              <PhoneIcon className="h-5 w-5" />
              {t("call")} · {siteConfig.orderPhone.display}
            </a>
            <button
              type="button"
              onClick={() => {
                if (confirming) clear();
                setConfirming(!confirming);
              }}
              className={`mt-4 w-full rounded-full py-2 text-sm font-bold ${confirming ? "bg-red-50 text-red-700" : "text-muted hover:text-foreground"}`}
            >
              {confirming ? t("clearConfirm") : t("clearOrder")}
            </button>
          </div>
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-border bg-surface p-3 md:hidden">
        <div className="leading-tight">
          <p className="text-xs font-bold text-muted">{t("total")}</p>
          <p className="text-2xl font-extrabold text-accent">{inr(total)}</p>
        </div>
        <a
          href={sendHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#1e8e4e] px-4 py-3.5 text-base font-extrabold text-white"
        >
          <WhatsAppIcon className="h-5 w-5" />
          {t("sendOrder")}
        </a>
      </div>
    </div>
  );
}
