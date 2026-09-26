import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";
import { getSiteUrl, siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

import "../globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

// Обе языковые версии собираются заранее, при сборке
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata");

  return {
    metadataBase: new URL(getSiteUrl()),
    title: { default: t("title"), template: `%s — ${siteConfig.name}` },
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
}: LayoutProps<"/[locale]">) {
  // Язык берётся из [locale] через next/root-params (см. src/i18n/request.ts)
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={cn(manrope.variable, "scroll-pt-24 antialiased")}
    >
      <body className="flex min-h-dvh flex-col">
        <NextIntlClientProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <WhatsAppFab />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
