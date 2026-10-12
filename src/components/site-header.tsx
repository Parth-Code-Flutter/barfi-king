"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
  const ref = useRef<HTMLElement>(null);
  const hello = lang === "gu" ? "નમસ્તે, મારે મીઠાઈનો ઓર્ડર કરવો છે." : "Hello, I would like to order sweets.";

  // Sticky bars below the header (shop categories, order bill) offset themselves by this.
  useEffect(() => {
    const header = ref.current;
    if (!header) return;
    const root = document.documentElement;
    const observer = new ResizeObserver(() => {
      if (!open) root.style.setProperty("--header-h", `${header.offsetHeight}px`);
    });
    observer.observe(header);
    return () => observer.disconnect();
  }, [open]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    if (href === "/shop") return pathname.startsWith("/shop") || pathname.startsWith("/product");
    return pathname.startsWith(href);
  }

  return (
    <header ref={ref} className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
      <div className="overflow-hidden bg-accent py-1.5 text-butter-soft">
        <div className="announcement-track flex w-max items-center gap-9 whitespace-nowrap text-xs font-extrabold tracking-wide">
          {[0, 1].map((group) => (
            <span key={group} className="flex items-center gap-9" aria-hidden={group === 1}>
              <span>{t("announcementFresh")}</span><span className="text-butter">✿</span><span>{t("announcementOrder")}</span><span className="text-butter">✿</span><span>{t("announcementJunagadh")}</span><span className="text-butter">✿</span>
            </span>
          ))}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-2.5 md:gap-3">
        <Link href="/" className="group flex min-w-0 flex-1 items-center gap-2.5 md:flex-none md:gap-3" onClick={() => setOpen(false)}>
          <span className="rounded-full bg-surface p-0.5 shadow-sm ring-2 ring-butter transition group-hover:rotate-[-8deg]">
            <Image src="/brand-icon.png" alt="" width={46} height={46} loading="eager" className="h-11 w-11 shrink-0 rounded-full md:h-12 md:w-12" />
          </span>
          <span className="min-w-0 leading-none">
            <span className="block truncate font-display text-xl font-extrabold text-accent md:text-2xl">{text(siteConfig.brand)}</span>
            <span className="mt-0.5 hidden truncate text-[11px] font-bold uppercase tracking-wide text-muted sm:block">{text(siteConfig.shop)}</span>
          </span>
        </Link>

        <nav className="mx-auto hidden items-center gap-1 rounded-full bg-surface p-1 shadow-sm ring-1 ring-border md:flex" aria-label={text(siteConfig.shop)}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-sm font-extrabold transition ${isActive(link.href) ? "bg-butter text-thabdi shadow-sm" : "text-foreground/80 hover:bg-butter-soft"}`}
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 items-center whitespace-nowrap rounded-full bg-pista-soft px-3 text-xs font-extrabold text-pista-deep ring-1 ring-pista/25 transition hover:brightness-95"
          aria-label={t("languageName")}
          onClick={() => setLang(lang === "gu" ? "en" : "gu")}
        >
          {lang === "gu" ? "English" : "ગુજરાતી"}
        </button>

        <a
          href={whatsappHref(hello)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("whatsappOrder")}
          className="hidden h-10 w-10 shrink-0 place-items-center rounded-full bg-whatsapp text-white shadow-sm transition hover:-translate-y-0.5 sm:grid"
        >
          <WhatsAppIcon className="h-5 w-5" />
        </a>

        <Link
          href="/order"
          aria-current={pathname === "/order" ? "page" : undefined}
          className="hidden items-center gap-2 whitespace-nowrap rounded-full bg-accent px-4 py-2.5 text-sm font-extrabold text-accent-foreground shadow-md shadow-accent/25 transition hover:-translate-y-0.5 md:inline-flex"
        >
          {t("order")}
          {count > 0 ? <span key={count} className="bump grid h-6 min-w-6 place-items-center rounded-full bg-butter px-1 text-xs text-thabdi">{count}</span> : null}
        </Link>

        <button
          type="button"
          className="-mr-1 grid h-10 w-10 shrink-0 place-items-center rounded-full text-accent hover:bg-butter-soft md:hidden"
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
                  className={`block rounded-2xl px-4 py-3 font-display text-xl font-extrabold ${isActive(link.href) ? "bg-butter text-thabdi" : "bg-background"}`}
                  onClick={() => setOpen(false)}
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <a href={whatsappHref(hello)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-whatsapp px-3 py-3 font-extrabold text-white"><WhatsAppIcon className="h-5 w-5" />{t("whatsapp")}</a>
            <Link href="/order" onClick={() => setOpen(false)} className="flex items-center justify-center gap-2 rounded-full bg-accent px-3 py-3 font-extrabold text-accent-foreground">{t("order")}{count > 0 ? ` (${count})` : ""}</Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
