"use client";

import { MapPinIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { Drip } from "@/components/reveal";
import { mapEmbedSrc, siteConfig, whatsappHref, type Place } from "@/config/site";
import { useLanguage } from "@/features/i18n/language-provider";

const contactCopy = {
  title: { gu: "ફોન કરો, લખો કે સીધા આવો.", en: "Call, message, or just drop by." },
};

export function ContactPage() {
  const { lang, t, text } = useLanguage();
  const hello = lang === "gu" ? "નમસ્તે, મારે મીઠાઈ જોઈએ છે." : "Hello, I would like to order sweets.";
  const steps = [t("orderStep1"), t("orderStep2"), t("orderStep3")];

  return (
    <div className="overflow-x-clip">
      <section className="kesar-strands bg-butter-soft">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-6 pt-10 md:grid-cols-[1fr_23rem] md:pt-14">
          <div>
            <p className="section-kicker">
              {t("greeting")} · {t("since")}
            </p>
            <h1 className="mt-3 text-5xl font-extrabold leading-[1.1] text-thabdi md:text-6xl">{text(contactCopy.title)}</h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-foreground/80">{t("contactLead")}</p>
          </div>
          <div className="grid gap-3">
            <a
              href={`tel:${siteConfig.orderPhone.tel}`}
              className="group relative overflow-hidden rounded-[1.8rem] bg-accent px-6 py-5 text-accent-foreground shadow-xl shadow-accent/30 transition hover:-translate-y-0.5"
            >
              <span aria-hidden="true" className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10" />
              <span className="flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-butter text-thabdi transition group-hover:rotate-12">
                  <PhoneIcon className="h-6 w-6" />
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-bold text-butter-soft/90">{t("callShop")}</span>
                  <span className="block font-display text-3xl font-extrabold">{siteConfig.orderPhone.display}</span>
                </span>
              </span>
            </a>
            <a
              href={whatsappHref(hello)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3.5 text-lg font-extrabold text-white shadow-lg shadow-whatsapp/25 transition hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="h-6 w-6" />
              {t("whatsappChat")}
            </a>
          </div>
        </div>
      </section>
      <Drip color="var(--butter-soft)" />

      <div className="mx-auto max-w-6xl px-4 pb-12 pt-4">
        <div className="grid gap-6 lg:grid-cols-2">
          <PlaceCard place={siteConfig.shopPlace} role={t("shopRole")} tone="kesar" />
          <PlaceCard place={siteConfig.makerPlace} role={t("makerRole")} tagline={t("makerTagline")} tone="pista" />
        </div>

        <section className="mt-10 rounded-[2.2rem] bg-surface p-6 shadow-sm ring-1 ring-border md:p-10">
          <p className="section-kicker">{t("orderTitle")}</p>
          <ol className="relative mt-6 grid gap-5 sm:grid-cols-3">
            <span aria-hidden="true" className="absolute left-6 right-6 top-7 hidden border-t-2 border-dashed border-kesar/40 sm:block" />
            {steps.map((step, index) => (
              <li key={step} className="relative flex items-center gap-3 sm:block">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-kesar font-display text-2xl font-extrabold text-white shadow-lg shadow-kesar/30 ring-4 ring-surface">
                  {index + 1}
                </span>
                <span className="block font-display text-2xl font-extrabold leading-tight text-thabdi sm:mt-3">{step}</span>
              </li>
            ))}
          </ol>
          <div className="mt-8 max-w-md">
            <p className="text-sm font-bold text-muted">{t("sayThis")}</p>
            <p className="mt-2 inline-block rounded-3xl rounded-bl-md bg-butter-soft px-5 py-3 font-display text-xl font-extrabold text-accent ring-1 ring-butter">
              “{t("sampleOrder")}”
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

function PlaceCard({ place, role, tagline, tone }: { place: Place; role: string; tagline?: string; tone: "kesar" | "pista" }) {
  const { t, text } = useLanguage();

  return (
    <article className="flex flex-col overflow-clip rounded-[2.2rem] bg-surface shadow-sm ring-1 ring-border">
      <div className="relative">
        <iframe
          src={mapEmbedSrc(place)}
          title={`${t("mapTitle")}: ${text(place.name)}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-56 w-full border-0 bg-background md:h-64"
        />
        <span className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-sm font-extrabold text-white shadow-lg ${tone === "kesar" ? "bg-kesar" : "bg-pista"}`}>
          {role}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h2 className="text-3xl font-extrabold leading-tight text-thabdi">{text(place.name)}</h2>
        {tagline ? <p className="mt-1 font-bold text-muted">{tagline}</p> : null}
        <div className="mt-4 flex gap-3">
          <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-kesar" />
          <address className="text-lg not-italic leading-relaxed">{text(place.address)}</address>
        </div>
        <div className="mt-auto grid gap-2 pt-6 sm:grid-cols-2">
          <a
            href={`tel:${place.phone.tel}`}
            className="flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-3.5 text-lg font-extrabold text-accent-foreground"
          >
            <PhoneIcon className="h-5 w-5" />
            {place.phone.display}
          </a>
          <a
            href={place.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-butter px-4 py-3.5 text-lg font-extrabold text-thabdi"
          >
            <MapPinIcon className="h-5 w-5" />
            {t("directions")}
          </a>
        </div>
      </div>
    </article>
  );
}
