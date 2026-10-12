import type { LocaleText } from "@/features/catalog/types";

export const heroCopy = {
  kicker: { gu: "જલારામ સ્વીટ્સ · જૂનાગઢ", en: "Jalaram Sweets · Junagadh" },
  titleA: { gu: "મલાઈ જેવી નરમ,", en: "Soft as malai," },
  titleB: { gu: "કેસર જેવી ખાસ.", en: "special as kesar." },
  body: {
    gu: "લુણાણાની પ્રખ્યાત થાબડી, પેંડા, બરફી, હલવો અને ફરસાણ. ભાવ જુઓ, વજન પસંદ કરો અને વોટ્સએપ પર ઓર્ડર મોકલો.",
    en: "Lunana’s famous thabdi, peda, barfi, halwa and farsan. See the price, pick a weight and send the order on WhatsApp.",
  },
  fillBox: { gu: "તમારો ડબ્બો ભરો", en: "Fill your own box" },
  priceCard: { gu: "ભાવપત્ર જુઓ", en: "See the price card" },
  stamp: { gu: "શુદ્ધ મલાઈ ✿ 1955થી ✿ જૂનાગઢ ✿ ", en: "PURE MALAI ✿ SINCE 1955 ✿ JUNAGADH ✿ " },
  natural: { gu: "નેચરલ મીઠાઈ", en: "Natural sweets" },
  dishes: { gu: "વાનગી", en: "dishes" },
  perKg: { gu: "/ કિલો", en: "/ kg" },
};

export const shelfCopy = {
  kicker: { gu: "આઠ જાત", en: "Eight kinds" },
  title: { gu: "આજે શું ખાશો?", en: "What are you craving today?" },
};

export const builderCopy = {
  kicker: { gu: "ડબ્બો જાતે ભરો", en: "Build your own box" },
  title: { gu: "ચાર ખાનાં, તમારી પસંદ.", en: "Four cups. Your pick." },
  hint: {
    gu: "મીઠાઈ પર દબાવો, એ ડબ્બામાં બેસી જશે. ખાના પર દબાવો તો પાછી નીકળી જશે.",
    en: "Tap a sweet and it drops into the box. Tap a cup to take it back out.",
  },
  half: { gu: "½ કિલો ડબ્બો", en: "½ kg box" },
  full: { gu: "1 કિલો ડબ્બો", en: "1 kg box" },
  each: { gu: "દરેક ખાનું", en: "each cup" },
  empty: { gu: "ખાલી", en: "Empty" },
  lucky: { gu: "નસીબ અજમાવો", en: "Surprise me" },
  reset: { gu: "ખાલી કરો", en: "Empty it" },
  add: { gu: "ઓર્ડરમાં ઉમેરો", en: "Add to order" },
  send: { gu: "સીધો વોટ્સએપ પર", en: "Straight to WhatsApp" },
  added: { gu: "ડબ્બો ઓર્ડરમાં ઉમેરાયો!", en: "Box added to your order!" },
  boxFull: { gu: "ડબ્બો ભરાઈ ગયો!", en: "The box is full!" },
  total: { gu: "ડબ્બાનો ભાવ", en: "Box price" },
  removeCup: { gu: "ખાનામાંથી કાઢો", en: "Take out of the cup" },
  left: (count: number, lang: "gu" | "en") =>
    lang === "gu" ? `હજુ ${count} ખાનાં બાકી` : `${count} more to fill`,
  message: (size: string, rows: string[], total: string, lang: "gu" | "en") =>
    lang === "gu"
      ? [`નમસ્તે, મારે ${size}નો મિક્સ ડબ્બો જોઈએ છે:`, ...rows, "", `કુલ: ${total}`].join("\n")
      : [`Hello, I would like a ${size} mixed box:`, ...rows, "", `Total: ${total}`].join("\n"),
};

export type RecipeIcon = "milk" | "sugar" | "flame";

export const recipeCopy = {
  kicker: { gu: "મેનુ કાર્ડ પર લખેલું છે", en: "Straight from the menu card" },
  title: { gu: "અમારી રેસીપી એટલી સીધી છે.", en: "Our recipe is this simple." },
  terms: [
    { icon: "milk", label: { gu: "મલાઈવાળું દૂધ", en: "Malai milk" } },
    { icon: "sugar", label: { gu: "સાકર", en: "Sugar" } },
    { icon: "flame", label: { gu: "ધીમી આંચ", en: "Slow flame" } },
  ] satisfies { icon: RecipeIcon; label: LocaleText }[],
  result: { gu: "થાબડી", en: "Thabdi" },
  quote: {
    gu: "“પ્યોર મલાઈવાળા દુધ અને સુગરમાંથી બનાવેલી નેચરલ મીઠાઈ”",
    en: "“Natural sweets made from pure malai milk and sugar”",
  },
  note: {
    gu: "દૂધ ઘટ્ટ થઈને સોનેરી ન થાય ત્યાં સુધી ધીરજથી હલાવવાનું. બસ, આટલું જ.",
    en: "Stirred patiently until the milk thickens and turns golden. That is all.",
  },
};

export type Occasion = {
  id: string;
  icon: "diya" | "rakhi" | "kalash" | "matki" | "home" | "gift";
  name: LocaleText;
  note: LocaleText;
};

export const occasionCopy = {
  kicker: { gu: "પ્રસંગ પ્રમાણે", en: "For every occasion" },
  title: { gu: "દરેક પ્રસંગે મોં મીઠું", en: "Every occasion deserves something sweet" },
  hint: {
    gu: "પ્રસંગ પસંદ કરો, વોટ્સએપ પર સંદેશો તૈયાર મળશે.",
    en: "Pick an occasion and WhatsApp opens with the message ready.",
  },
  ask: { gu: "વોટ્સએપ પર પૂછો", en: "Ask on WhatsApp" },
  occasions: [
    { id: "diwali", icon: "diya", name: { gu: "દિવાળી", en: "Diwali" }, note: { gu: "ડબ્બા અને ભેટ", en: "Boxes and gifts" } },
    { id: "rakhi", icon: "rakhi", name: { gu: "રક્ષાબંધન", en: "Raksha Bandhan" }, note: { gu: "ભાઈ-બહેન માટે", en: "For brothers and sisters" } },
    { id: "wedding", icon: "kalash", name: { gu: "લગ્ન-સગાઈ", en: "Weddings" }, note: { gu: "મોટા ઓર્ડર", en: "Large orders" } },
    { id: "janmashtami", icon: "matki", name: { gu: "જન્માષ્ટમી", en: "Janmashtami" }, note: { gu: "પ્રસાદ અને ભોગ", en: "Prasad and bhog" } },
    { id: "vastu", icon: "home", name: { gu: "વાસ્તુ", en: "Housewarming" }, note: { gu: "નવી શરૂઆત", en: "New beginnings" } },
    { id: "office", icon: "gift", name: { gu: "ઓફિસ-વેપાર", en: "Office and trade" }, note: { gu: "કિલોમાં ઓર્ડર", en: "Orders by the kilo" } },
  ] satisfies Occasion[],
  message: (name: string, lang: "gu" | "en") =>
    lang === "gu"
      ? `નમસ્તે, મારે ${name} માટે મીઠાઈનો ઓર્ડર કરવો છે.`
      : `Hello, I would like to order sweets for ${name}.`,
};
