"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPinIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { siteConfig, whatsappHref } from "@/config/site";
import { useLanguage } from "@/features/i18n/language-provider";
import { useOrder } from "@/features/order/order-provider";

export function OrderDock() {
  const { lang, t } = useLanguage();
  const { count } = useOrder();
  const pathname = usePathname();

  // The order page has its own send bar.
  if (pathname === "/order") return null;

  if (pathname === "/contact") {
    const hello = lang === "gu" ? "નમસ્તે, મારે મીઠાઈનો ઓર્ડર કરવો છે." : "Hello, I would like to order sweets.";

    return (
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 p-3 backdrop-blur md:hidden">
        <div className="grid grid-cols-2 gap-2">
          <a
            href={whatsappHref(hello)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-whatsapp px-3 py-3 text-base font-extrabold text-white"
          >
            <WhatsAppIcon className="h-5 w-5" />
            {t("whatsapp")}
          </a>
          <a
            href={siteConfig.shopPlace.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-butter px-3 py-3 text-base font-extrabold text-thabdi"
          >
            <MapPinIcon className="h-5 w-5" />
            {t("directions")}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 p-3 backdrop-blur md:hidden">
      <div className="grid grid-cols-[1fr_auto] gap-2">
        <Link
          href={count > 0 ? "/order" : "/shop"}
          className="flex items-center justify-center gap-2 rounded-full bg-accent px-3 py-3 text-center text-base font-extrabold text-accent-foreground"
        >
          {count > 0 ? t("viewOrder") : t("seeGoods")}
          {count > 0 ? <span key={count} className="bump grid h-6 min-w-6 place-items-center rounded-full bg-butter px-1 text-xs text-thabdi">{count}</span> : null}
        </Link>
        <a
          className="flex items-center justify-center gap-2 rounded-full bg-butter px-5 py-3 text-center text-base font-extrabold text-thabdi"
          href={`tel:${siteConfig.orderPhone.tel}`}
        >
          <PhoneIcon className="h-5 w-5" />
          {t("call")}
        </a>
      </div>
    </div>
  );
}
