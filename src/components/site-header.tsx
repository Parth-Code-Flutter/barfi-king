"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CloseIcon, MenuIcon, WhatsAppIcon } from "@/components/icons";
import { siteConfig, whatsappHref } from "@/config/site";
import { useLanguage } from "@/features/i18n/language-provider";
import { useOrder } from "@/features/order/order-provider";

const links = [
  { href: "/", key: "home" },
  { href: "/shop", key: "shop" },
  { href: "/contact", key: "contact" },
] as const;

export function SiteHeader() {
  const { lang, setLang, t, text } = useLanguage();
  const { count } = useOrder();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    if (href === "/shop") return pathname.startsWith("/shop") || pathname.startsWith("/product");
    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface/95 backdrop-blur">
      <div className="announcement-bar overflow-hidden bg-rose-deep py-1.5 text-[#f8dda0]">
        <div className="announcement-track flex w-max items-center gap-9 whitespace-nowrap text-xs font-extrabold tracking-wide">
          {[0, 1].map((group) => (
            <span key={group} className="flex items-center gap-9" aria-hidden={group === 1}>
              <span>{t("announcementFresh")}</span><span>✦</span><span>{t("announcementOrder")}</span><span>✦</span><span>{t("announcementJunagadh")}</span><span>✦</span>
            </span>
          ))}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-2.5 md:gap-3">
        <Link href="/" className="flex min-w-0 flex-1 items-center gap-2.5 md:flex-none md:gap-3" onClick={() => setOpen(false)}>
          <span className="rounded-full bg-white p-0.5 shadow-md ring-1 ring-border">
            <Image src="/brand-icon.png" alt="" width={46} height={46} priority className="h-11 w-11 shrink-0 rounded-full md:h-12 md:w-12" />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-lg font-extrabold text-accent md:text-xl">{text(siteConfig.brand)}</span>
            <span className="hidden truncate text-[11px] font-bold uppercase tracking-wide text-muted sm:block">{text(siteConfig.shop)}</span>
          </span>
        </Link>

        <nav className="mx-auto hidden items-center gap-1 rounded-full bg-background/80 p-1 ring-1 ring-border md:flex" aria-label={text(siteConfig.shop)}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-sm font-extrabold transition ${isActive(link.href) ? "bg-rose-deep text-white shadow-sm" : "hover:bg-gold-soft"}`}
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="whitespace-nowrap rounded-full bg-gold-soft px-3 py-2 text-xs font-extrabold text-accent transition hover:brightness-95"
          aria-label={t("languageName")}
          onClick={() => setLang(lang === "gu" ? "en" : "gu")}
        >
          {lang === "gu" ? "English" : "ગુજરાતી"}
        </button>

        <a
          href={whatsappHref(lang === "gu" ? "નમસ્તે, મારે મીઠાઈનો ઓર્ડર કરવો છે." : "Hello, I would like to order sweets.")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("whatsappOrder")}
          className="hidden h-10 w-10 shrink-0 place-items-center rounded-full bg-[#1e8e4e] text-white shadow-sm sm:grid"
        >
          <WhatsAppIcon className="h-5 w-5" />
        </a>

        <Link
          href="/order"
          aria-current={pathname === "/order" ? "page" : undefined}
          className="brand-gradient hidden items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-extrabold text-white shadow-md transition hover:-translate-y-0.5 md:inline-flex"
        >
          {t("order")}
          {count > 0 ? <span className="grid h-6 min-w-6 place-items-center rounded-full bg-[#f7d77d] px-1 text-xs text-[#59290f]">{count}</span> : null}
        </Link>

        <button
          type="button"
          className="-mr-1 grid h-10 w-10 shrink-0 place-items-center rounded-full text-accent hover:bg-gold-soft md:hidden"
          aria-expanded={open}
          aria-label={open ? t("closeMenu") : t("openMenu")}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <nav className="border-t border-border bg-surface px-4 py-4 shadow-xl md:hidden" aria-label={t("shop")}>
          <ul className="grid gap-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`block rounded-2xl px-4 py-3 text-lg font-extrabold ${isActive(link.href) ? "bg-rose-soft text-rose-deep ring-1 ring-[#edc9d2]" : "bg-background"}`}
                  onClick={() => setOpen(false)}
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <a href={whatsappHref(lang === "gu" ? "નમસ્તે, મારે મીઠાઈનો ઓર્ડર કરવો છે." : "Hello, I would like to order sweets.")} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-[#1e8e4e] px-3 py-3 font-extrabold text-white"><WhatsAppIcon className="h-5 w-5" />{t("whatsapp")}</a>
            <Link href="/order" onClick={() => setOpen(false)} className="brand-gradient flex items-center justify-center gap-2 rounded-full px-3 py-3 font-extrabold text-white">{t("order")}{count > 0 ? ` (${count})` : ""}</Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
