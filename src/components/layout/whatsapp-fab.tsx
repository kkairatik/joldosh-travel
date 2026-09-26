import { useTranslations } from "next-intl";

import { WhatsAppIcon } from "@/components/icons";
import { whatsappHref } from "@/lib/contacts";

// Плавающая кнопка WhatsApp — главный канал связи у турагентств в Кыргызстане
export function WhatsAppFab() {
  const t = useTranslations("WhatsApp");

  return (
    <a
      href={whatsappHref(t("greeting"))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("label")}
      title={t("label")}
      data-whatsapp-fab
      className="fixed right-4 bottom-4 z-30 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 focus-visible:ring-4 focus-visible:ring-[#25D366]/40 focus-visible:outline-none sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
