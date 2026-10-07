import type { Metadata } from "next";
import { Noto_Sans_Gujarati } from "next/font/google";
import { AddedToast } from "@/components/added-toast";
import { OrderDock } from "@/components/order-dock";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { LanguageProvider } from "@/features/i18n/language-provider";
import { OrderProvider } from "@/features/order/order-provider";
import "./globals.css";

const gujarati = Noto_Sans_Gujarati({
  subsets: ["gujarati", "latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-gujarati",
});

export const metadata: Metadata = {
  title: {
    default: "બાર્ફી કિંગ · જલારામ સ્વીટ્સ",
    template: "%s · બાર્ફી કિંગ",
  },
  description:
    "લુણાણાની પ્રખ્યાત થાબડી, પેંડા, બરફી, હલવો, લાડુ અને ફરસાણ. ગુજરાતીમાં ભાવ, ફોન અને વોટ્સએપથી ઓર્ડર.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="gu" className={`${gujarati.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col pb-24 md:pb-0" suppressHydrationWarning>
        <LanguageProvider>
          <OrderProvider>
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
            <OrderDock />
            <AddedToast />
          </OrderProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
