import { notFound } from "next/navigation";
import * as rootParams from "next/root-params";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  // Язык берём из сегмента [locale]. В Server Actions и Route Handlers
  // next/root-params недоступен — там язык передаётся явно: getTranslations({ locale })
  if (!locale) {
    const segment = await rootParams.locale();
    if (!hasLocale(routing.locales, segment)) notFound();
    locale = segment;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
    timeZone: "Asia/Bishkek",
  };
});
