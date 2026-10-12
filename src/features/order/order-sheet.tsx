"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CloseIcon, MinusIcon, PhoneIcon, PlusIcon, WhatsAppIcon } from "@/components/icons";
import { siteConfig, whatsappHref } from "@/config/site";
import { getCategory, getProduct } from "@/features/catalog/data";
import { inr } from "@/features/catalog/format";
import type { Lang } from "@/features/i18n/copy";
import { useLanguage } from "@/features/i18n/language-provider";
import { useOrder, type OrderLine } from "@/features/order/order-provider";

const receiptCopy = {
  thanks: { gu: "આભાર! ફરી પધારજો.", en: "Thank you! Visit again." },
  fillBox: { gu: "ડબ્બો જાતે ભરો", en: "Build a box" },
  emptyTitle: { gu: "ડબ્બો હજુ ખાલી છે", en: "The box is still empty" },
};

function linePhoto(line: OrderLine) {
  const product = getProduct(line.slug);
  return product ? getCategory(product.category)?.photo : undefined;
}

function buildMessage(lines: OrderLine[], lang: Lang, total: number, hasUnknown: boolean) {
  const gu = lang === "gu";
  const intro = gu ? "નમસ્તે, મારો ઓર્ડર:" : "Hello, my order:";
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
  const { lines, count, setCount, clear } = useOrder();
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (!confirming) return;
    const timer = window.setTimeout(() => setConfirming(false), 3000);
    return () => window.clearTimeout(timer);
  }, [confirming]);

  if (lines.length === 0) {
    return (
      <div className="mx-auto grid max-w-xl justify-items-center px-4 py-14 text-center">
        <div className="relative h-40 w-56" aria-hidden="true">
          <div className="absolute inset-x-0 bottom-0 h-28 rounded-2xl bg-accent p-2 shadow-xl">
            <div className="grid h-full grid-cols-2 gap-2 rounded-xl bg-butter-soft p-2">
              {[0, 1, 2, 3].map((cup) => (
                <span key={cup} className="paper-cup rounded-full" />
              ))}
            </div>
          </div>
          <div className="absolute -top-1 left-2 right-2 h-10 origin-bottom-left -rotate-[14deg] rounded-xl bg-kesar shadow-lg">
            <span className="absolute inset-y-0 left-1/2 w-4 -translate-x-1/2 bg-butter" />
          </div>
        </div>
        <h1 className="mt-7 text-4xl font-extrabold text-thabdi">{text(receiptCopy.emptyTitle)}</h1>
        <p className="mx-auto mt-2 max-w-md text-lg text-muted">{t("emptyOrder")}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Link href="/shop" className="rounded-full bg-accent px-6 py-3 text-lg font-extrabold text-accent-foreground shadow-lg shadow-accent/25">
            {t("seeGoods")}
          </Link>
          <Link href="/#box-builder" className="rounded-full bg-butter px-6 py-3 text-lg font-extrabold text-thabdi">
            {text(receiptCopy.fillBox)}
          </Link>
        </div>
      </div>
    );
  }

  const priced = lines.filter((line) => line.amount != null);
  const unknown = lines.filter((line) => line.amount == null);
  const total = priced.reduce((sum, line) => sum + (line.amount ?? 0) * line.count, 0);
  const message = buildMessage(lines, lang, total, unknown.length > 0);
  const sendHref = whatsappHref(message);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-10 pt-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="section-kicker">{text(siteConfig.shop)}</p>
          <h1 className="mt-1 text-5xl font-extrabold text-thabdi md:text-6xl">{t("yourOrder")}</h1>
          <p className="mt-1 text-lg font-bold text-muted">
            {count} {t("results")}
          </p>
        </div>
        <Link href="/shop" className="flex items-center gap-1.5 rounded-full bg-butter px-4 py-2.5 font-extrabold text-thabdi">
          <PlusIcon className="h-4 w-4" />
          {t("addMore")}
        </Link>
      </div>

      <div className="mt-6 grid items-start gap-8 lg:grid-cols-[1fr_25rem]">
        <ul className="grid gap-3">
          {lines.map((line) => {
            const photo = linePhoto(line);
            return (
              <li key={line.id} className="flex gap-4 rounded-[1.6rem] bg-surface p-4 ring-1 ring-border md:p-5">
                <Link href={`/product/${line.slug}`} className="shrink-0">
                  {photo ? (
                    <Image src={photo} alt="" width={160} height={160} className="h-20 w-20 rounded-full object-cover shadow-md ring-4 ring-butter-soft md:h-24 md:w-24" />
                  ) : (
                    <span className="block h-20 w-20 rounded-full bg-background md:h-24 md:w-24" />
                  )}
                </Link>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <Link href={`/product/${line.slug}`} className="block font-display text-2xl font-extrabold leading-tight text-thabdi hover:text-accent">
                        {line.name[lang]}
                      </Link>
                      <p className="mt-1 text-sm font-bold text-muted">
                        <span className="rounded-full bg-kesar-soft px-2 py-0.5 text-accent">{line.qty[lang]}</span>{" "}
                        {line.amount == null
                          ? t("priceOnCall")
                          : lang === "gu"
                            ? `${t("each")} ${inr(line.amount)}`
                            : `${inr(line.amount)} ${t("each")}`}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCount(line.id, 0)}
                      aria-label={`${t("remove")}: ${line.name[lang]}`}
                      className="-mr-1 -mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full text-muted hover:bg-kesar-soft hover:text-accent"
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
                      <span key={line.count} className="bump w-10 text-center text-lg font-extrabold" aria-live="polite">
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
                    <p className="text-right font-display text-2xl font-extrabold text-accent">
                      {line.amount == null ? <span className="font-sans text-sm text-muted">{t("priceOnCall")}</span> : inr(line.amount * line.count)}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <aside className="grid gap-5 lg:sticky lg:top-[calc(var(--header-h)+1rem)]">
          <div className="[filter:drop-shadow(0_14px_20px_rgb(58_29_13/0.16))]">
            <div className="receipt bg-surface px-6 pb-9 pt-10">
              <div className="text-center">
                <p className="font-display text-2xl font-extrabold text-thabdi">{text(siteConfig.shop)}</p>
                <p className="text-xs font-bold text-muted">{t("junagadh")} · {siteConfig.orderPhone.display}</p>
                <p className="mt-3 inline-block rounded-full bg-kesar-soft px-3 py-1 text-sm font-extrabold text-accent">{t("billTitle")}</p>
              </div>
              <div className="my-4 border-t-2 border-dashed border-border" />
              <ul className="grid gap-2 text-sm">
                {lines.map((line) => (
                  <li key={line.id} className="flex items-baseline gap-2">
                    <span className="min-w-0 truncate font-bold">
                      {line.name[lang]} <span className="text-muted">· {line.qty[lang]}{line.count > 1 ? ` × ${line.count}` : ""}</span>
                    </span>
                    <span className="leader" aria-hidden="true" />
                    <span className="shrink-0 font-mono font-bold tabular-nums">{line.amount == null ? t("priceOnCall") : inr(line.amount * line.count)}</span>
                  </li>
                ))}
              </ul>
              <div className="my-4 border-t-2 border-dashed border-border" />
              <div className="flex items-baseline justify-between">
                <span className="text-lg font-extrabold">{t("total")}</span>
                <span key={total} className="bump font-display text-4xl font-extrabold text-accent">{inr(total)}</span>
              </div>
              {unknown.length > 0 ? <p className="mt-2 text-xs font-bold text-muted">{t("unknownNote")}</p> : null}
              <p className="mt-5 text-center font-display text-lg font-extrabold text-pista-deep">{text(receiptCopy.thanks)}</p>
            </div>
          </div>

          <div className="rounded-[2rem] bg-surface p-5 shadow-sm ring-1 ring-border">
            <p className="text-sm font-extrabold text-muted">{t("messagePreview")}</p>
            <p className="mt-3 max-h-48 overflow-auto whitespace-pre-line rounded-2xl rounded-tr-sm bg-[#dcf8c6] px-4 py-3 text-sm leading-relaxed text-[#1b2a1b]">
              {message}
            </p>
            <a
              href={sendHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-4 text-lg font-extrabold text-white shadow-lg shadow-whatsapp/25 transition hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="h-6 w-6" />
              {t("sendOrder")}
            </a>
            <p className="mt-3 text-center text-xs font-bold leading-relaxed text-muted">
              {t("whatsappReassurance")}
            </p>
            <a
              href={`tel:${siteConfig.orderPhone.tel}`}
              className="mt-3 flex items-center justify-center gap-2 rounded-full bg-butter px-5 py-3.5 text-lg font-extrabold text-thabdi"
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
              className={`mt-4 w-full rounded-full py-2 text-sm font-bold ${confirming ? "bg-kesar-soft text-accent" : "text-muted hover:text-foreground"}`}
            >
              {confirming ? t("clearConfirm") : t("clearOrder")}
            </button>
          </div>
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-border bg-surface/95 p-3 backdrop-blur md:hidden">
        <div className="leading-tight">
          <p className="text-xs font-bold text-muted">{t("total")}</p>
          <p className="font-display text-2xl font-extrabold text-accent">{inr(total)}</p>
        </div>
        <a
          href={sendHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-whatsapp px-4 py-3.5 text-base font-extrabold text-white"
        >
          <WhatsAppIcon className="h-5 w-5" />
          {t("sendOrder")}
        </a>
      </div>
    </div>
  );
}
