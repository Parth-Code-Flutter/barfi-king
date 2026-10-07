"use client";

import Link from "next/link";
import { useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
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

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-3 md:gap-3">
        <Link href="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <img src="/brand-icon.png" alt="" width={44} height={44} className="h-11 w-11 shrink-0 rounded-full" />
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-lg font-extrabold text-accent">{text(siteConfig.brand)}</span>
            <span className="block truncate text-xs text-muted">{text(siteConfig.shop)}</span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 md:flex" aria-label={text(siteConfig.shop)}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-full px-4 py-2 text-base font-bold hover:bg-gold-soft">
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="ml-auto whitespace-nowrap rounded-full bg-gold-soft px-3 py-2 text-sm font-bold text-accent md:ml-0"
          aria-label={t("languageName")}
          onClick={() => setLang(lang === "gu" ? "en" : "gu")}
        >
          {lang === "gu" ? "English" : "ગુજરાતી"}
        </button>

        <Link
          href="/order"
          className="whitespace-nowrap rounded-full bg-accent px-4 py-2 text-sm font-extrabold text-accent-foreground"
        >
          {t("order")}
          {count > 0 ? ` ${count}` : ""}
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
        <nav className="border-t border-border px-4 py-3 md:hidden" aria-label={t("shop")}>
          <ul className="grid gap-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-2xl bg-background px-4 py-3 text-lg font-bold"
                  onClick={() => setOpen(false)}
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
