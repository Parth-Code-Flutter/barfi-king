type LocaleText = { gu: string; en: string };

export type Place = {
  name: LocaleText;
  address: LocaleText;
  phone: { display: string; tel: string };
  /** Google Maps link printed as a QR code on the shop's menu cards. */
  mapUrl: string;
  /**
   * Pin from that Google Maps place. A name search can land on a different
   * listing (there is more than one "Barfi King" in Junagadh).
   */
  coords: { lat: number; lng: number };
};

const brand = { gu: "બાર્ફી કિંગ", en: "Barfi King" };
const shop = { gu: "જલારામ સ્વીટ્સ અને નમકીન", en: "Jalaram Sweets & Namkeen" };
const orderPhone = { display: "98980 20864", tel: "+919898020864", whatsapp: "919898020864" };
const makerPhone = { display: "97121 94604", tel: "+919712194604" };

export const siteConfig = {
  brand,
  shop,
  since: "1955",
  orderPhone,
  makerPhone,
  shopPlace: {
    name: shop,
    address: {
      gu: "શ્રીનાથ નગર સોસાયટી મેઈન રોડ, માનસ સ્કૂલ પાસે, બ્લોક 114/બી, જૂનાગઢ, ગુજરાત 362002",
      en: "Srinath Nagar Society Main Rd, near Manas School, Block 114/B, Junagadh, Gujarat 362002",
    },
    phone: orderPhone,
    mapUrl: "https://maps.app.goo.gl/8KsUyAkBdfJWbkUYA",
    coords: { lat: 21.5256371, lng: 70.448312 },
  } satisfies Place,
  makerPlace: {
    name: brand,
    address: {
      gu: "દેશી પકવાન રેસ્ટોરન્ટ સામે, બાયપાસ રોડ, દેવ ઇન્ટરનેશનલ સ્કૂલ પાસે, જૂનાગઢ, ગુજરાત 362002",
      en: "Opp. Deshi Pakwan Restaurant, Bypass Road, near Dev International School, Junagadh, Gujarat 362002",
    },
    phone: makerPhone,
    mapUrl: "https://maps.app.goo.gl/u2p2A1XyJNunLE1w6",
    coords: { lat: 21.5390841, lng: 70.4387627 },
  } satisfies Place,
} as const;

export function whatsappHref(message: string) {
  return `https://wa.me/${siteConfig.orderPhone.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function mapEmbedSrc(place: Place) {
  return `https://maps.google.com/maps?q=${place.coords.lat},${place.coords.lng}&z=16&output=embed`;
}
