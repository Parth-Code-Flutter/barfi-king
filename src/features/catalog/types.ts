export type LocaleText = { gu: string; en: string };

export type CategoryId =
  | "peda"
  | "fancy"
  | "barfi"
  | "dry-fruit"
  | "halwa"
  | "laddu"
  | "farsan"
  | "wafer";

export type SellUnit = "kg" | "pack";

export type Category = {
  id: CategoryId;
  name: LocaleText;
  promise: LocaleText;
  image: string;
  photo: string;
};

export type Product = {
  slug: string;
  category: CategoryId;
  name: LocaleText;
  price: number | null;
  unit: SellUnit;
  packSize?: LocaleText;
  sugarFree?: boolean;
};
