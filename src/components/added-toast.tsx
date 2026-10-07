"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { CheckIcon } from "@/components/icons";
import { useLanguage } from "@/features/i18n/language-provider";
import { useOrder } from "@/features/order/order-provider";

const VISIBLE_MS = 3500;

export function AddedToast() {
  const { lang, t } = useLanguage();
  const { lastAdded, undoLast, dismissLast } = useOrder();
  const pathname = usePathname();

  useEffect(() => {
    if (!lastAdded) return;
    const timer = window.setTimeout(dismissLast, VISIBLE_MS);
    return () => window.clearTimeout(timer);
  }, [lastAdded, dismissLast]);

  if (!lastAdded || pathname === "/order") return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="toast-in fixed inset-x-3 bottom-24 z-50 mx-auto flex max-w-md items-center gap-3 rounded-2xl bg-foreground px-4 py-3 text-accent-foreground shadow-2xl md:bottom-6"
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold text-white">
        <CheckIcon className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1 leading-tight">
        <span className="block text-xs text-gold-soft">{t("addedToOrder")}</span>
        <span className="block truncate font-extrabold">
          {lastAdded.name[lang]} · {lastAdded.qty[lang]}
        </span>
      </span>
      <button type="button" onClick={undoLast} className="shrink-0 rounded-full px-3 py-2 text-sm font-bold text-gold-soft">
        {t("undo")}
      </button>
      <Link
        href="/order"
        onClick={dismissLast}
        className="shrink-0 rounded-full bg-gold-soft px-3 py-2 text-sm font-extrabold text-accent"
      >
        {t("viewOrder")}
      </Link>
    </div>
  );
}
