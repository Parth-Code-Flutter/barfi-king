import type { Lang } from "@/features/i18n/copy";

export type SortMode = "shop" | "low" | "high";

export const shopCopy = {
  steps: [
    { gu: "જાત પસંદ કરો", en: "Pick a kind" },
    { gu: "વજન નક્કી કરો", en: "Choose the weight" },
    { gu: "ઉમેરો દબાવો", en: "Press Add" },
  ],
  sort: {
    shop: { gu: "દુકાનનો ક્રમ", en: "Shop order" },
    low: { gu: "સસ્તું પહેલાં", en: "Lowest price" },
    high: { gu: "મોંઘું પહેલાં", en: "Highest price" },
  } satisfies Record<SortMode, { gu: string; en: string }>,
  sortLabel: { gu: "ક્રમ", en: "Sort" },
  other: { gu: "બીજું", en: "Other" },
  weight: { gu: "વજન", en: "Weight" },
  boxTitle: { gu: "તમારો ડબ્બો", en: "Your box" },
  boxEmpty: {
    gu: "હજુ ખાલી છે. વજન પસંદ કરીને ઉમેરો દબાવો, અહીં દેખાશે.",
    en: "Still empty. Pick a weight and press Add to see it here.",
  },
  showAll: { gu: "બધી મીઠાઈ બતાવો", en: "Show all sweets" },
  from: { gu: "થી", en: "from " },
  inBox: (count: number, lang: Lang) => (lang === "gu" ? `ડબ્બામાં ${count}` : `${count} in box`),
  shown: (count: number, lang: Lang) => (lang === "gu" ? `${count} વાનગી દેખાય છે` : `Showing ${count} items`),
};
