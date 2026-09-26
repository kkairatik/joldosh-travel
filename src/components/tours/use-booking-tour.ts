import { useFormatter, useLocale } from "next-intl";

import { upcomingDepartures } from "@/lib/tours/filters";
import type { Tour } from "@/lib/tours/schema";

// Данные для окна бронирования: только то, что нужно форме,
// с уже отформатированными датами на языке страницы
export function useBookingTour(tour: Tour) {
  const format = useFormatter();
  const locale = useLocale();

  return {
    slug: tour.slug,
    title: tour.title[locale],
    dates: upcomingDepartures(tour).map((date) => ({
      value: date,
      label: format.dateTime(new Date(date), "departureFull"),
    })),
  };
}
