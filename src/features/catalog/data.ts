import type { Category, CategoryId, Product } from "@/features/catalog/types";

export const categories: Category[] = [
  {
    id: "peda",
    name: { gu: "પેંડા", en: "Peda" },
    promise: {
      gu: "શુદ્ધ મલાઈના દૂધ અને સાકરથી બનેલી મીઠાઈ",
      en: "Made with pure malai milk and sugar",
    },
    image: "/menus/peda.jpg",
    photo: "/sweets/peda.jpg",
  },
  {
    id: "fancy",
    name: { gu: "ફેન્સી મીઠાઈ", en: "Fancy sweets" },
    promise: {
      gu: "શુદ્ધ મલાઈના દૂધ અને ડ્રાયફ્રુટથી બનેલી મીઠાઈ",
      en: "Made with pure malai milk and dry fruit",
    },
    image: "/menus/fancy.jpg",
    photo: "/sweets/fancy.jpg",
  },
  {
    id: "barfi",
    name: { gu: "બરફી", en: "Barfi" },
    promise: {
      gu: "શુદ્ધ મલાઈના દૂધ અને સાકરથી બનેલી મીઠાઈ",
      en: "Made with pure malai milk and sugar",
    },
    image: "/menus/barfi.jpg",
    photo: "/sweets/barfi.jpg",
  },
  {
    id: "dry-fruit",
    name: { gu: "ડ્રાયફ્રુટ", en: "Dry fruit" },
    promise: {
      gu: "ડ્રાયફ્રુટ, શુદ્ધ ઘી અને હનીથી બનેલી મીઠાઈ",
      en: "Made with dry fruit, pure ghee and honey",
    },
    image: "/menus/dry-fruit.jpg",
    photo: "/sweets/dry-fruit.jpg",
  },
  {
    id: "halwa",
    name: { gu: "હલવો", en: "Halwa" },
    promise: {
      gu: "હલવાની વેરાયટી",
      en: "Halwa varieties",
    },
    image: "/menus/halwa.jpg",
    photo: "/sweets/halwa.jpg",
  },
  {
    id: "laddu",
    name: { gu: "લાડુ", en: "Laddu" },
    promise: {
      gu: "શુદ્ધ ઘીથી બનેલા લાડુ",
      en: "Laddus made with pure ghee",
    },
    image: "/menus/laddu.jpg",
    photo: "/sweets/laddu.jpg",
  },
  {
    id: "farsan",
    name: { gu: "ફરસાણ", en: "Farsan" },
    promise: {
      gu: "ગાઠિયા, સેવ અને ચવાણું",
      en: "Gathiya, sev and chavana",
    },
    image: "/menus/farsan.jpg",
    photo: "/sweets/farsan.jpg",
  },
  {
    id: "wafer",
    name: { gu: "વેફર અને ચેવડો", en: "Wafers and chevdo" },
    promise: {
      gu: "તૈયાર પેકેટ",
      en: "Ready packets",
    },
    image: "/menus/wafer.jpg",
    photo: "/sweets/wafer.jpg",
  },
];

const pack180 = { gu: "180 ગ્રામ", en: "180 gram" };
const pack200 = { gu: "200 ગ્રામ", en: "200 gram" };

function item(
  slug: string,
  category: CategoryId,
  gu: string,
  en: string,
  price: number | null,
  unit: Product["unit"] = "kg",
  extra: Pick<Product, "packSize" | "sugarFree"> = {},
): Product {
  return { slug, category, name: { gu, en }, price, unit, ...extra };
}

export const products: Product[] = [
  item("thabdi-peda", "peda", "થાબડી પેંડા", "Thabdi Peda", 380),
  item("white-peda", "peda", "સફેદ પેંડા", "White Peda", 380),
  item("mava-peda", "peda", "માવાના પેંડા", "Mava Peda", 420),
  item("malai-puri-peda", "peda", "મલાઈ પુરી પેંડા", "Malai Puri Peda", 420),
  item("natural-kesar-peda", "peda", "નેચરલ કેસર પેંડા", "Natural Kesar Peda", 450),

  item("american-ball", "fancy", "અમેરિકન બોલ", "American Ball", 450),
  item("anjeer-roll", "fancy", "અંજીર રોલ", "Anjeer Roll", 450),
  item("gulkand-roll", "fancy", "ગુલકંદ રોલ", "Gulkand Roll", 450),
  item("kaju-pastry", "fancy", "કાજુ પેસ્ટ્રી", "Kaju Pastry", 450),
  item("kesar-gulshan", "fancy", "કેસર ગુલશન", "Kesar Gulshan", 500),
  item("dry-fruit-khajana", "fancy", "ડ્રાયફ્રુટ ખજાના", "Dry Fruit Khajana", 500),
  item("anjeer-katri", "fancy", "અંજીર કતરી", "Anjeer Katri", 500),
  item("kesar-vatika", "fancy", "કેસર વાટીકા", "Kesar Vatika", 450),
  item("rose-ball", "fancy", "રોઝ બોલ", "Rose Ball", 440),
  item("strawberry-choconut", "fancy", "સ્ટ્રોબેરી ચોકોનટ", "Strawberry Choconut", 400),
  item("kesar-dry-fruit-ball", "fancy", "કેસર ડ્રાયફ્રુટ બોલ", "Kesar Dry Fruit Ball", 500),
  item("chocolate-ball", "fancy", "ચોકલેટ બોલ", "Chocolate Ball", 380),

  item("special-malai-cake", "barfi", "સ્પે. મલાઈ કેક", "Special Malai Cake", 380),
  item("special-loose-thabdi", "barfi", "સ્પે. લુઝ થાબડી", "Special Loose Thabdi", 380),
  item("white-barfi", "barfi", "સફેદ બરફી", "White Barfi", 380),
  item("gulkand-barfi", "barfi", "ગુલકંદ બરફી", "Gulkand Barfi", 380),
  item("butterscotch-barfi", "barfi", "બટરસ્કોચ બરફી", "Butterscotch Barfi", 380),
  item("chocolate-barfi", "barfi", "ચોકલેટ બરફી", "Chocolate Barfi", 380),
  item("mango-barfi", "barfi", "મેંગો બરફી", "Mango Barfi", 380),
  item("topra-pak", "barfi", "ટોપરા પાક", "Topra Pak", 380),
  item("mango-malai-cake", "barfi", "મેંગો મલાઈ કેક", "Mango Malai Cake", 400),
  item("biscoff-kalakand", "barfi", "બીસ્કોફ કલાકંદ", "Biscoff Kalakand", 500),

  item("kaju-katli", "dry-fruit", "કાજુકતરી", "Kaju Katli", 880),
  item("exotica", "dry-fruit", "એક્ઝોટિકા", "Exotica", 880),
  item("rose-marble", "dry-fruit", "રોઝ મારબલ", "Rose Marble", 880),
  item("dry-fruit-kaju-katli", "dry-fruit", "ડ્રાયફ્રુટ કાજુકતરી", "Dry Fruit Kaju Katli", 950),
  item("choco-bite", "dry-fruit", "ચોકો બાઈટ", "Choco Bite", 880),
  item("kaju-sandwich", "dry-fruit", "કાજુ સેન્ડવીચ", "Kaju Sandwich", 1000),
  item("natural-kesar-kaju-katli", "dry-fruit", "નેચરલ કેસર કાજુકતરી", "Natural Kesar Kaju Katli", 900),
  item("dry-fruit-anjeer-bite", "dry-fruit", "ડ્રાયફ્રુટ અંજીર બાઈટ", "Dry Fruit Anjeer Bite", 1100, "kg", { sugarFree: true }),
  item("dry-fruit-khajur-pak", "dry-fruit", "ડ્રાયફ્રુટ ખજુર પાક", "Dry Fruit Khajur Pak", 740, "kg", { sugarFree: true }),

  item("dudhi-halwa", "halwa", "દૂધીનો હલવો", "Dudhi Halwa", 350),
  item("gajar-halwa", "halwa", "ગાજરનો હલવો", "Gajar Halwa", 350),
  item("pancharatna-halwa", "halwa", "પંચરત્ન હલવો", "Pancharatna Halwa", 350),
  item("gulkand-halwa", "halwa", "ગુલકંદ હલવો", "Gulkand Halwa", 320),
  item("pineapple-halwa", "halwa", "પાઈનેપલ હલવો", "Pineapple Halwa", 320),
  item("kaju-gulkand-halwa", "halwa", "કાજુ-ગુલકંદ હલવો", "Kaju Gulkand Halwa", 420),
  item("roasted-dry-fruit-halwa", "halwa", "રોસ્ટેડ ડ્રાયફ્રુટ હલવો", "Roasted Dry Fruit Halwa", 420),
  item("anjeer-halwa", "halwa", "અંજીર હલવો", "Anjeer Halwa", 450),
  item("anjeer-akrot-halwa", "halwa", "અંજીર-અખરોટ હલવો", "Anjeer Akrot Halwa", 500),
  item("afghan-halwa", "halwa", "અફઘાન હલવો", "Afghan Halwa", 500),

  item("paneer-laddu", "laddu", "પનીર લાડુ", "Paneer Laddu", 380),
  item("motichoor-laddu", "laddu", "મોતીચૂર લાડુ", "Motichoor Laddu", 240),
  item("besan-laddu", "laddu", "બેસન લાડુ (લાસા લાડુ)", "Besan Laddu (Lasa Laddu)", 240),
  item("churma-laddu", "laddu", "ચુરમાના લાડુ", "Churma Laddu", 380),

  item("papdi-gathiya", "farsan", "પાપડી ગાઠિયા", "Papdi Gathiya", null),
  item("tikha-gathiya", "farsan", "તીખા ગાઠિયા", "Tikha Gathiya", null),
  item("bhavnagari-gathiya", "farsan", "ભાવનગરી ગાઠિયા", "Bhavnagari Gathiya", null),
  item("champakali-gathiya", "farsan", "ચંપાકલી ગાઠિયા", "Champakali Gathiya", null),
  item("thick-sev", "farsan", "સેવ જાડી", "Thick Sev", null),
  item("fine-sev", "farsan", "સેવ જીણી", "Fine Sev", null),
  item("chavana", "farsan", "ચવાણું", "Chavana", null),

  item("plain-wafer", "wafer", "મોરી વેફર", "Plain Wafer", 50, "pack", { packSize: pack180 }),
  item("spicy-wafer", "wafer", "તીખી વેફર", "Spicy Wafer", 50, "pack", { packSize: pack180 }),
  item("banana-wafer", "wafer", "કેળા વેફર", "Banana Wafer", 50, "pack", { packSize: pack200 }),
  item("spicy-chevdo", "wafer", "ચેવડો તીખો", "Spicy Chevdo", 50, "pack", { packSize: pack200 }),
  item("sweet-chevdo", "wafer", "ચેવડો મીઠો", "Sweet Chevdo", 50, "pack", { packSize: pack200 }),
];

export const featuredSlugs = [
  "thabdi-peda",
  "natural-kesar-peda",
  "kaju-katli",
  "gajar-halwa",
  "motichoor-laddu",
  "plain-wafer",
] as const;

export function getCategory(id: string) {
  return categories.find((category) => category.id === id);
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function productsInCategory(id: CategoryId) {
  return products.filter((product) => product.category === id);
}

export function filterProducts(category: string | undefined, query: string) {
  const needle = query.trim().toLowerCase();
  return products.filter((product) => {
    const categoryOk = !category || category === "all" || product.category === category;
    if (!categoryOk) return false;
    if (!needle) return true;
    return (
      product.name.gu.toLowerCase().includes(needle) ||
      product.name.en.toLowerCase().includes(needle)
    );
  });
}

export function isCategoryId(value: string | undefined): value is CategoryId {
  return categories.some((category) => category.id === value);
}
