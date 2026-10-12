"use client";

import Link from "next/link";
import { useLanguage } from "@/features/i18n/language-provider";

const emptyBox = { gu: "અરે! આ ડબ્બો ખાલી છે.", en: "Oops! This box is empty." };

export default function NotFound() {
  const { t, text } = useLanguage();

  return (
    <div className="mx-auto grid max-w-xl justify-items-center px-4 py-16 text-center">
      <div className="relative h-40 w-56" aria-hidden="true">
        <div className="absolute inset-x-0 bottom-0 h-28 rounded-2xl bg-surface shadow-xl ring-1 ring-border">
          <div className="grid h-full grid-cols-2 gap-2 p-3">
            {[0, 1, 2, 3].map((cup) => (
              <span key={cup} className="paper-cup rounded-full" />
            ))}
          </div>
        </div>
        <div className="absolute -top-2 left-2 right-2 h-10 origin-bottom-left -rotate-[14deg] rounded-xl bg-kesar shadow-lg">
          <span className="absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 bg-butter" />
        </div>
      </div>
      <p className="mt-6 section-kicker">404</p>
      <h1 className="mt-2 text-4xl font-extrabold text-accent">{text(emptyBox)}</h1>
      <p className="mt-2 text-lg font-bold text-foreground/80">{t("notFoundTitle")}</p>
      <p className="mt-1 text-muted">{t("notFoundBody")}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Link href="/shop" className="rounded-full bg-accent px-5 py-3 font-extrabold text-accent-foreground">
          {t("seeGoods")}
        </Link>
        <Link href="/" className="rounded-full bg-butter px-5 py-3 font-extrabold text-thabdi">
          {t("goHome")}
        </Link>
      </div>
    </div>
  );
}
