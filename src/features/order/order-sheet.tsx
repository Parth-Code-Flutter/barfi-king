"use client";

import Link from "next/link";
import { siteConfig, whatsappHref } from "@/config/site";
import { inr } from "@/features/catalog/format";
import { useLanguage } from "@/features/i18n/language-provider";
import { useOrder } from "@/features/order/order-provider";

export function OrderSheet() {
  const { lang, t } = useLanguage();
  const { lines, clear } = useOrder();
  const known = lines.filter((line) => line.amount != null);
  const total = known.reduce((sum, line) => sum + (line.amount ?? 0) * line.count, 0);
  const body = lines
    .map((line, index) => {
      const price = line.amount == null ? "" : ` — ${inr(line.amount * line.count)}`;
      const times = line.count > 1 ? ` × ${line.count}` : "";
      return `${index + 1}. ${line.name[lang]} — ${line.qty[lang]}${times}${price}`;
    })
    .join("\n");
  const intro = lang === "gu" ? "નમસ્તે, મારો ઓર્ડર:" : "Hello, my order:";
  const totalLine = known.length === lines.length ? `\n${lang === "gu" ? "કુલ" : "Total"}: ${inr(total)}` : "";
  const message = `${intro}\n${body}${totalLine}`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-4xl font-extrabold">{t("yourOrder")}</h1>
      {lines.length === 0 ? (
        <div className="mt-6 rounded-[2rem] bg-surface p-6">
          <p className="text-lg font-bold">{t("emptyOrder")}</p>
          <Link href="/shop" className="mt-4 inline-block rounded-full bg-accent px-5 py-3 font-extrabold text-accent-foreground">
            {t("seeGoods")}
          </Link>
        </div>
      ) : (
        <>
          <ul className="mt-6 grid gap-3">
            {lines.map((line) => (
              <li key={line.id} className="flex items-center justify-between gap-4 rounded-3xl border border-border bg-surface px-4 py-4">
                <div>
                  <p className="text-xl font-extrabold">{line.name[lang]}</p>
                  <p className="text-sm font-bold text-muted">
                    {line.qty[lang]}
                    {line.count > 1 ? ` × ${line.count}` : ""}
                  </p>
                </div>
                <p className="text-lg font-extrabold text-accent">
                  {line.amount == null ? t("askPrice") : inr(line.amount * line.count)}
                </p>
              </li>
            ))}
          </ul>
          {known.length === lines.length ? (
            <p className="mt-4 text-right text-2xl font-extrabold">{inr(total)}</p>
          ) : null}
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <a
              href={whatsappHref(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-accent px-5 py-4 text-center text-lg font-extrabold text-accent-foreground"
            >
              {t("sendOrder")}
            </a>
            <a
              href={`tel:${siteConfig.orderPhone.tel}`}
              className="rounded-2xl bg-gold-soft px-5 py-4 text-center text-lg font-extrabold text-accent"
            >
              {t("call")}
            </a>
          </div>
          <button type="button" className="mt-4 text-sm font-bold text-muted" onClick={clear}>
            {t("clearOrder")}
          </button>
        </>
      )}
    </div>
  );
}
