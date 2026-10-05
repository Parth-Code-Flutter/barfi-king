"use client";

import Link from "next/link";
import { useLanguage } from "@/features/i18n/language-provider";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <h1 className="text-4xl font-extrabold">{t("notFoundTitle")}</h1>
      <p className="mt-3 text-lg">{t("notFoundBody")}</p>
      <Link href="/" className="mt-6 inline-block rounded-full bg-accent px-5 py-3 font-extrabold text-accent-foreground">
        {t("goHome")}
      </Link>
    </div>
  );
}
