"use client";

import { siteConfig } from "@/config/site";
import { useLanguage } from "@/features/i18n/language-provider";

export function SiteFooter() {
  const { t, text } = useLanguage();

  return (
    <footer className="border-t border-border bg-accent text-accent-foreground">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 md:grid-cols-3">
        <div>
          <p className="text-2xl font-extrabold">{text(siteConfig.brand)}</p>
          <p className="mt-1 text-sm text-gold-soft">{text(siteConfig.shop)}</p>
          <p className="mt-3 text-sm leading-relaxed">{t("easeNote")}</p>
          <p className="mt-2 text-sm text-gold-soft">{t("footerNote")}</p>
        </div>
        <div>
          <p className="text-sm text-gold-soft">{t("shopPhone")}</p>
          <a className="text-2xl font-extrabold" href={`tel:${siteConfig.orderPhone.tel}`}>
            {siteConfig.orderPhone.display}
          </a>
        </div>
        <div>
          <p className="text-sm text-gold-soft">{t("makerPhone")}</p>
          <a className="text-2xl font-extrabold" href={`tel:${siteConfig.makerPhone.tel}`}>
            {siteConfig.makerPhone.display}
          </a>
          <p className="mt-2 text-sm">{t("madeBy")}</p>
        </div>
      </div>
    </footer>
  );
}
