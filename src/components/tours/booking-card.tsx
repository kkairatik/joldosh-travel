import { CalendarDays, Flame } from "lucide-react";
import { useFormatter, useLocale, useTranslations } from "next-intl";

import { BookingDialog } from "@/components/booking/booking-dialog";
import { WhatsAppIcon } from "@/components/icons";
import { useBookingTour } from "@/components/tours/use-booking-tour";
import { Button } from "@/components/ui/button";
import { whatsappHref } from "@/lib/contacts";
import { discountPercent, upcomingDepartures } from "@/lib/tours/filters";
import type { Tour } from "@/lib/tours/schema";

const VISIBLE_DATES = 6;

// Цена, ближайшие даты, форма бронирования и вопрос в WhatsApp
export function BookingCard({ tour }: { tour: Tour }) {
  const t = useTranslations("Tour");
  const format = useFormatter();
  const locale = useLocale();
  const title = tour.title[locale];
  const dates = upcomingDepartures(tour);
  const discount = discountPercent(tour);
  const bookingTour = useBookingTour(tour);

  return (
    <div className="rounded-3xl bg-background p-6 shadow-xl ring-1 shadow-black/5 ring-border">
      {tour.hot && (
        <p className="mb-3 inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-accent-foreground">
          <Flame className="size-3.5" aria-hidden="true" />
          {t("hot")} {discount > 0 && t("discount", { percent: discount })}
        </p>
      )}
      <p className="flex flex-wrap items-baseline gap-x-2">
        <span className="text-3xl font-extrabold tracking-tight">
          {t("priceFrom", { price: format.number(tour.price, "price") })}
        </span>
        {tour.oldPrice && (
          <s className="text-lg font-semibold text-muted-foreground">
            <span className="sr-only">{t("oldPrice")} </span>
            {format.number(tour.oldPrice, "price")}
          </s>
        )}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        {t("perPerson")} ·{" "}
        {t("duration", { days: tour.nights + 1, nights: tour.nights })}
      </p>

      <h2 className="mt-6 flex items-center gap-2 text-sm font-bold">
        <CalendarDays className="size-4 text-primary" aria-hidden="true" />
        {t("departures")}
      </h2>
      {dates.length > 0 ? (
        <>
          <ul className="mt-3 flex flex-wrap gap-2">
            {dates.slice(0, VISIBLE_DATES).map((date) => (
              <li
                key={date}
                className="rounded-full bg-muted px-3 py-1.5 text-sm font-medium"
              >
                <time dateTime={date}>
                  {format.dateTime(new Date(date), "departure")}
                </time>
              </li>
            ))}
          </ul>
          {dates.length > VISIBLE_DATES && (
            <p className="mt-2 text-sm text-muted-foreground">
              {t("moreDates", { count: dates.length - VISIBLE_DATES })}
            </p>
          )}
        </>
      ) : (
        <p className="mt-2 text-sm text-muted-foreground">
          {t("noDepartures")}
        </p>
      )}

      <div className="mt-6 grid gap-2">
        <BookingDialog tour={bookingTour} />
        <Button asChild size="xl" variant="outline">
          <a
            href={whatsappHref(t("questionMessage", { title }))}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon />
            {t("ask")}
          </a>
        </Button>
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        {t("bookingNote")}
      </p>
    </div>
  );
}
