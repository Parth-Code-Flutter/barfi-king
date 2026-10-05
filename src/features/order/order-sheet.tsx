"use client";

import Link from "next/link";
import { siteConfig, whatsappHref } from "@/config/site";
import { inr } from "@/features/catalog/format";
import { useLanguage } from "@/features/i18n/language-provider";
import { useOrder } from "@/features/order/order-provider";

export function OrderSheet() {
  const { lang, t } = useLanguage();
  const { lines, setCount, clear } = useOrder();
  const known = lines.filter((line) => line.amount != null);
  const total = known.reduce((sum, line) => sum + (line.amount ?? 0) * line.count, 0);
  const body = lines
    .map((line, index) => {
      const price = line.amount == null ? "" : ` — ${inr(line.amount * line.count)}`;
      return `${index + 1}. ${line.name[lang]} — ${line.qty[lang]} × ${line.count}${price}`;
    })
    .join("\n");
  const intro = lang === "gu" ? "નમસ્તે, મારો ઓર્ડર:" : "Hello, my order:";
  const totalLine = known.length === lines.length && lines.length > 0 ? `\n${t("total")}: ${inr(total)}` : "";
  const message = `${intro}\n${body}${totalLine}`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-4xl font-extrabold">{t("yourOrder")}</h1>
      {lines.length === 0 ? (
        <div className="mt-6 rounded-[2rem] bg-surface p-6 ring-1 ring-border">
          <p className="text-lg font-bold">{t("emptyOrder")}</p>
          <Link href="/shop" className="mt-4 inline-block rounded-full bg-accent px-5 py-3 font-extrabold text-accent-foreground">
            {t("seeGoods")}
          </Link>
        </div>
      ) : (
        <>
          <ul className="mt-6 grid gap-3">
            {lines.map((line) => (
              <li key={line.id} className="rounded-[1.6rem] bg-surface px-4 py-4 ring-1 ring-border">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xl font-extrabold">{line.name[lang]}</p>
                    <p className="text-sm font-bold text-muted">{line.qty[lang]}</p>
                  </div>
                  <p className="text-lg font-extrabold text-accent">
                    {line.amount == null ? t("askPrice") : inr(line.amount * line.count)}
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    type="button"
                    className="grid h-11 w-11 place-items-center rounded-full bg-background text-xl font-extrabold ring-1 ring-border"
                    onClick={() => setCount(line.id, line.count - 1)}
                    aria-label={t("remove")}
                  >
                    −
                  </button>
                  <span className="min-w-8 text-center text-lg font-extrabold">{line.count}</span>
                  <button
                    type="button"
                    className="grid h-11 w-11 place-items-center rounded-full bg-accent text-xl font-extrabold text-accent-foreground"
                    onClick={() => setCount(line.id, line.count + 1)}
                    aria-label={t("add")}
                  >
                    +
                  </button>
                  <button type="button" className="ml-auto text-sm font-bold text-muted" onClick={() => setCount(line.id, 0)}>
                    {t("remove")}
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {known.length === lines.length ? (
            <p className="mt-5 flex items-baseline justify-between text-2xl font-extrabold">
              <span>{t("total")}</span>
              <span>{inr(total)}</span>
            </p>
          ) : null}
          <a
            href={whatsappHref(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block rounded-full bg-accent px-5 py-4 text-center text-lg font-extrabold text-accent-foreground"
          >
            {t("sendOrder")}
          </a>
          <a
            href={`tel:${siteConfig.orderPhone.tel}`}
            className="mt-3 block rounded-full bg-gold-soft px-5 py-4 text-center text-lg font-extrabold text-accent"
          >
            {t("call")} · {siteConfig.orderPhone.display}
          </a>
          <button type="button" className="mt-4 text-sm font-bold text-muted" onClick={clear}>
            {t("clearOrder")}
          </button>
        </>
      )}
    </div>
  );
}
