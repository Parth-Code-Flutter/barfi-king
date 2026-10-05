"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/features/i18n/language-provider";
import { useOrder } from "@/features/order/order-provider";

export function OrderDock() {
  const { t } = useLanguage();
  const { count } = useOrder();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface p-3 md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <Link
          href={count > 0 ? "/order" : "/shop"}
          className="rounded-full bg-accent px-3 py-3 text-center text-base font-extrabold text-accent-foreground"
        >
          {count > 0 ? `${t("viewOrder")} ${count}` : t("seeGoods")}
        </Link>
        <a
          className="rounded-full bg-gold-soft px-3 py-3 text-center text-base font-extrabold text-accent"
          href={`tel:${siteConfig.orderPhone.tel}`}
        >
          {t("call")}
        </a>
      </div>
    </div>
  );
}
