"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/features/i18n/language-provider";
import { useOrder } from "@/features/order/order-provider";

const links = [
  { href: "/", key: "home" },
  { href: "/shop", key: "shop" },
  { href: "/contact", key: "contact" },
  { href: "/order", key: "order" },
] as const;

export function SiteHeader() {
  const { lang, setLang, t, text } = useLanguage();
  const { count } = useOrder();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b-4 border-gold bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Link href="/" className="flex min-w-0 flex-1 items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent text-lg font-extrabold text-gold-soft">
            બા
          </span>
          <span className="min-w-0">
            <span className="block truncate text-xl font-extrabold leading-tight text-accent">
              {text(siteConfig.brand)}
            </span>
            <span className="block truncate text-sm text-muted">{text(siteConfig.shop)}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label={text(siteConfig.shop)}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-base font-bold hover:bg-gold-soft"
            >
              {t(link.key)}
              {link.key === "order" && count > 0 ? ` ${count}` : ""}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2" role="group" aria-label={t("languageName")}>
          <button
            type="button"
            className={`rounded-full px-3 py-2 text-sm font-bold ${lang === "gu" ? "bg-accent text-accent-foreground" : "bg-gold-soft text-accent"}`}
            aria-pressed={lang === "gu"}
            onClick={() => setLang("gu")}
          >
            ગુજરાતી
          </button>
          <button
            type="button"
            className={`rounded-full px-3 py-2 text-sm font-bold ${lang === "en" ? "bg-accent text-accent-foreground" : "bg-gold-soft text-accent"}`}
            aria-pressed={lang === "en"}
            onClick={() => setLang("en")}
          >
            English
          </button>
        </div>

        <button
          type="button"
          className="rounded-full border border-border px-3 py-2 text-sm font-bold md:hidden"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? t("closeMenu") : t("openMenu")}
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
