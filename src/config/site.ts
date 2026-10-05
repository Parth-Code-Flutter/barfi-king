export const siteConfig = {
  brand: { gu: "બાર્ફી કિંગ", en: "Barfi King" },
  shop: { gu: "જલારામ સ્વીટ્સ અને નમકીન", en: "Jalaram Sweets & Namkeen" },
  since: "1955",
  orderPhone: {
    display: "98980 20864",
    tel: "+919898020864",
    whatsapp: "919898020864",
  },
  makerPhone: {
    display: "97121 94604",
    tel: "+919712194604",
  },
} as const;

export function whatsappHref(message: string) {
  return `https://wa.me/${siteConfig.orderPhone.whatsapp}?text=${encodeURIComponent(message)}`;
}
