"use client";

import Link from "next/link";
import { Drip } from "@/components/reveal";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/features/i18n/language-provider";

const goodbye = { gu: "મોં મીઠું કરતા રહેજો.", en: "Keep it sweet." };

export function SiteFooter() {
  const { t, text } = useLanguage();

  return (
    <footer className="relative mt-6 overflow-hidden bg-thabdi-deep text-butter-soft">
      <Drip color="var(--background)" />
      <span aria-hidden="true" className="pointer-events-none absolute -bottom-10 right-0 select-none font-display text-[11rem] font-extrabold leading-none text-white/[0.04] sm:right-[-2rem] md:text-[16rem]">
        {siteConfig.since}
      </span>
      <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-6">
        <p className="max-w-xl font-display text-4xl font-extrabold leading-tight text-butter md:text-5xl">{text(goodbye)}</p>
        <div className="mt-8 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-extrabold text-white">{text(siteConfig.brand)}</p>
            <p className="mt-1 text-sm font-bold text-kesar-soft/80">{text(siteConfig.shop)}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-butter-soft/80">{t("easeNote")}</p>
            <nav className="mt-4 flex flex-wrap gap-2 text-sm font-extrabold" aria-label={text(siteConfig.shop)}>
              <Link href="/shop" className="rounded-full bg-white/10 px-3 py-1.5 hover:bg-white/20">{t("shop")}</Link>
              <Link href="/order" className="rounded-full bg-white/10 px-3 py-1.5 hover:bg-white/20">{t("order")}</Link>
              <Link href="/contact" className="rounded-full bg-white/10 px-3 py-1.5 hover:bg-white/20">{t("contact")}</Link>
            </nav>
          </div>
          <div>
            <p className="text-sm font-bold text-kesar-soft/80">{t("shopPhone")}</p>
            <a className="font-display text-3xl font-extrabold text-white hover:text-butter" href={`tel:${siteConfig.orderPhone.tel}`}>
              {siteConfig.orderPhone.display}
            </a>
            <p className="mt-2 text-sm text-butter-soft/80">{t("footerNote")}</p>
          </div>
          <div>
            <p className="text-sm font-bold text-kesar-soft/80">{t("makerPhone")}</p>
            <a className="font-display text-3xl font-extrabold text-white hover:text-butter" href={`tel:${siteConfig.makerPhone.tel}`}>
              {siteConfig.makerPhone.display}
            </a>
            <p className="mt-2 text-sm text-butter-soft/80">{t("madeBy")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
