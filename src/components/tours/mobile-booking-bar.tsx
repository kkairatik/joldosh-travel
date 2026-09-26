import { useFormatter, useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { whatsappHref } from "@/lib/contacts";
import type { Tour } from "@/lib/tours/schema";

// Панель внизу экрана на телефоне: цена и кнопка всегда под рукой.
// data-mobile-booking-bar поднимает кнопку WhatsApp над панелью (см. globals.css)
export function MobileBookingBar({ tour }: { tour: Tour }) {
  const t = useTranslations("Tour");
  const format = useFormatter();
  const locale = useLocale();

  return (
    <div
      data-mobile-booking-bar
      className="fixed inset-x-0 bottom-0 z-30 border-t bg-background/95 px-4 py-3 backdrop-blur-md lg:hidden"
    >
      <div className="mx-auto flex max-w-xl items-center justify-between gap-4">
        <div>
          <p className="text-lg leading-tight font-extrabold">
            {t("priceFrom", { price: format.number(tour.price, "price") })}
          </p>
          <p className="text-xs text-muted-foreground">
            {t("perPerson")} · {t("nights", { count: tour.nights })}
          </p>
        </div>
        <Button asChild size="xl" className="px-8">
          <a
            href={whatsappHref(
              t("bookingMessage", { title: tour.title[locale] }),
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("book")}
          </a>
        </Button>
      </div>
    </div>
  );
}
