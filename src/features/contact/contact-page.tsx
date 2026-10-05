"use client";

import { siteConfig, whatsappHref } from "@/config/site";
import { useLanguage } from "@/features/i18n/language-provider";

export function ContactPage() {
  const { lang, t, text } = useLanguage();
  const hello = lang === "gu" ? "નમસ્તે, મારે મીઠાઈ જોઈએ છે." : "Hello, I would like to order sweets.";

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-4xl font-extrabold">{t("contactTitle")}</h1>
      <p className="mt-3 text-lg">{t("contactBody")}</p>
      <p className="mt-4 rounded-3xl bg-gold-soft px-5 py-4 text-xl font-extrabold">{t("sampleOrder")}</p>

      <div className="mt-6 grid gap-3">
        <a href={`tel:${siteConfig.orderPhone.tel}`} className="rounded-[2rem] bg-accent px-5 py-5 text-accent-foreground">
          <span className="block text-sm text-gold-soft">{t("shopPhone")} · {text(siteConfig.shop)}</span>
          <span className="mt-1 block text-4xl font-extrabold">{siteConfig.orderPhone.display}</span>
        </a>
        <a
          href={whatsappHref(hello)}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-[2rem] border border-accent bg-surface px-5 py-5"
        >
          <span className="block text-sm text-muted">{t("whatsapp")}</span>
          <span className="mt-1 block text-3xl font-extrabold text-accent">{t("orderThis")}</span>
        </a>
        <a href={`tel:${siteConfig.makerPhone.tel}`} className="rounded-[2rem] border border-border bg-surface px-5 py-5">
          <span className="block text-sm text-muted">{t("makerPhone")} · {text(siteConfig.brand)}</span>
          <span className="mt-1 block text-3xl font-extrabold">{siteConfig.makerPhone.display}</span>
        </a>
      </div>
    </div>
  );
}
