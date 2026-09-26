import type messages from "../../messages/ru.json";

import type { formats } from "@/i18n/formats";
import type { routing } from "@/i18n/routing";

// Типизация next-intl: t("...") подсказывает ключи и ругается на опечатки
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
    Formats: typeof formats;
  }
}
