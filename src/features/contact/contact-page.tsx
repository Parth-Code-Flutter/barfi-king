"use client";

import { MapPinIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { mapEmbedSrc, siteConfig, whatsappHref, type Place } from "@/config/site";
import { useLanguage } from "@/features/i18n/language-provider";

export function ContactPage() {
  const { lang, t } = useLanguage();
  const hello = lang === "gu" ? "નમસ્તે, મારે મીઠાઈ જોઈએ છે." : "Hello, I would like to order sweets.";
  const steps = [t("orderStep1"), t("orderStep2"), t("orderStep3")];

  return (
    <div className="mx-auto max-w-6xl px-4 pb-12 pt-6">
      <section className="tray grid items-center gap-6 rounded-[2rem] p-6 md:grid-cols-[1fr_22rem] md:p-10">
        <div>
          <p className="text-sm font-extrabold text-gold-soft">
            {t("greeting")} · {t("since")}
          </p>
          <h1 className="mt-2 text-4xl font-extrabold md:text-5xl">{t("contactTitle")}</h1>
          <p className="mt-3 max-w-xl text-lg leading-relaxed text-gold-soft">{t("contactLead")}</p>
        </div>
        <div className="grid gap-3">
          <a
            href={`tel:${siteConfig.orderPhone.tel}`}
            className="flex items-center gap-4 rounded-[1.5rem] bg-gold-soft px-5 py-4 text-accent transition hover:brightness-95"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
              <PhoneIcon className="h-6 w-6" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-bold">{t("callShop")}</span>
              <span className="block text-3xl font-extrabold">{siteConfig.orderPhone.display}</span>
            </span>
          </a>
          <a
            href={whatsappHref(hello)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-[#1e8e4e] px-5 py-3.5 text-lg font-extrabold text-white hover:bg-[#187a42]"
          >
            <WhatsAppIcon className="h-6 w-6" />
            {t("whatsappChat")}
          </a>
        </div>
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <PlaceCard place={siteConfig.shopPlace} role={t("shopRole")} />
        <PlaceCard place={siteConfig.makerPlace} role={t("makerRole")} tagline={t("makerTagline")} />
      </div>

      <section className="mt-8 rounded-[2rem] bg-surface p-6 ring-1 ring-border md:p-8">
        <h2 className="text-3xl font-extrabold">{t("orderTitle")}</h2>
        <ol className="mt-5 grid gap-4 sm:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step} className="flex items-center gap-3 rounded-[1.5rem] bg-background px-4 py-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent text-xl font-extrabold text-accent-foreground">
                {index + 1}
              </span>
              <span className="text-lg font-extrabold leading-tight">{step}</span>
            </li>
          ))}
        </ol>
        <div className="mt-5 rounded-[1.5rem] border-2 border-dashed border-border px-5 py-4">
          <p className="text-sm font-bold text-muted">{t("sayThis")}</p>
          <p className="mt-1 text-xl font-extrabold text-accent">{t("sampleOrder")}</p>
        </div>
      </section>
    </div>
  );
}

function PlaceCard({ place, role, tagline }: { place: Place; role: string; tagline?: string }) {
  const { t, text } = useLanguage();

  return (
    <article className="flex flex-col overflow-clip rounded-[2rem] bg-surface ring-1 ring-border">
      <iframe
        src={mapEmbedSrc(place)}
        title={`${t("mapTitle")}: ${text(place.name)}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-56 w-full border-0 bg-background md:h-64"
      />
      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm font-extrabold text-gold">{role}</p>
        <h2 className="mt-1 text-3xl font-extrabold leading-tight">{text(place.name)}</h2>
        {tagline ? <p className="mt-1 font-bold text-muted">{tagline}</p> : null}
        <div className="mt-4 flex gap-3">
          <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <address className="text-lg not-italic leading-relaxed">{text(place.address)}</address>
        </div>
        <div className="mt-auto grid gap-2 pt-6 sm:grid-cols-2">
          <a
            href={`tel:${place.phone.tel}`}
            className="flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-3.5 text-lg font-extrabold text-accent-foreground"
          >
            <PhoneIcon className="h-5 w-5" />
            {t("call")} · {place.phone.display}
          </a>
          <a
            href={place.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-gold-soft px-4 py-3.5 text-lg font-extrabold text-accent"
          >
            <MapPinIcon className="h-5 w-5" />
            {t("directions")}
          </a>
        </div>
      </div>
    </article>
  );
}
