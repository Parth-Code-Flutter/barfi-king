"use client";

import { siteConfig, whatsappHref } from "@/config/site";
import { useLanguage } from "@/features/i18n/language-provider";

export function OrderDock() {
  const { lang, t } = useLanguage();
  const hello = lang === "gu" ? "નમસ્તે, મારે મીઠાઈ જોઈએ છે." : "Hello, I would like to order sweets.";

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface p-3 md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <a
          className="rounded-2xl bg-accent px-3 py-3 text-center text-base font-extrabold text-accent-foreground"
          href={`tel:${siteConfig.orderPhone.tel}`}
        >
          {t("call")}
        </a>
        <a
          className="rounded-2xl bg-gold-soft px-3 py-3 text-center text-base font-extrabold text-accent"
          href={whatsappHref(hello)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("whatsapp")}
        </a>
      </div>
    </div>
  );
}
