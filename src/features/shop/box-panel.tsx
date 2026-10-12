"use client";

import Link from "next/link";
import { CloseIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { getProduct } from "@/features/catalog/data";
import { inr } from "@/features/catalog/format";
import { MithaiArt } from "@/features/catalog/mithai-art";
import { useLanguage } from "@/features/i18n/language-provider";
import { useOrder } from "@/features/order/order-provider";
import { shopCopy } from "@/features/shop/shop-copy";

export function BoxPanel() {
  const { t, text } = useLanguage();
  const { lines, count, setCount } = useOrder();
  const total = lines.reduce((sum, line) => sum + (line.amount ?? 0) * line.count, 0);
  const unknown = lines.some((line) => line.amount == null);

  return (
    <div className="[filter:drop-shadow(0_14px_20px_rgb(58_29_13/0.14))]">
      <div className="receipt bg-surface px-5 pb-8 pt-9">
        <div className="flex items-baseline justify-between gap-2">
          <p className="font-display text-2xl font-extrabold text-thabdi">{text(shopCopy.boxTitle)}</p>
          <span key={count} className="bump rounded-full bg-butter px-2.5 py-0.5 text-sm font-extrabold text-thabdi">
            {count}
          </span>
        </div>
        <p className="text-xs font-bold text-muted">{text(siteConfig.shop)}</p>

        {lines.length === 0 ? (
          <p className="mt-5 rounded-2xl border-2 border-dashed border-border p-4 text-center text-sm font-bold leading-6 text-muted">
            {text(shopCopy.boxEmpty)}
          </p>
        ) : (
          <ul className="no-scrollbar mt-4 grid max-h-[42vh] gap-2 overflow-y-auto border-y-2 border-dashed border-border py-3">
            {lines.map((line) => {
              const product = getProduct(line.slug);
              return (
                <li key={line.id} className="plop flex items-center gap-2">
                  {product ? <MithaiArt product={product} className="h-10 w-10 shrink-0" /> : null}
                  <div className="min-w-0 flex-1 leading-tight">
                    <p className="truncate text-sm font-extrabold">{text(line.name)}</p>
                    <p className="text-xs font-bold text-muted">
                      {text(line.qty)} × {line.count}
                    </p>
                  </div>
                  <span className="font-mono text-sm font-bold">{line.amount == null ? "—" : inr(line.amount * line.count)}</span>
                  <button
                    type="button"
                    onClick={() => setCount(line.id, 0)}
                    aria-label={`${t("remove")}: ${text(line.name)}`}
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-muted transition hover:bg-kesar-soft hover:text-accent"
                  >
                    <CloseIcon className="h-3.5 w-3.5" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        <div className="mt-4 flex items-baseline justify-between">
          <span className="font-extrabold">{t("total")}</span>
          <span key={total} className="bump font-display text-3xl font-extrabold text-accent">
            {inr(total)}
          </span>
        </div>
        {unknown ? <p className="mt-1 text-xs font-bold text-muted">{t("unknownNote")}</p> : null}

        <Link
          href="/order"
          aria-disabled={lines.length === 0}
          className={`mt-4 flex items-center justify-center rounded-full px-4 py-3 font-extrabold transition ${
            lines.length === 0 ? "pointer-events-none bg-border text-muted" : "bg-accent text-accent-foreground shadow-lg shadow-accent/25 hover:bg-thabdi"
          }`}
        >
          {t("viewOrder")} →
        </Link>
      </div>
    </div>
  );
}
