import { z } from "zod";

import { tourTypeSchema, type Tour } from "./schema";

// Фильтры каталога живут в адресе страницы: /tours?destination=turkey&budget=1000.
// Так ссылкой с фильтрами можно поделиться, а страница с фильтрами индексируется.
// Адрес меняется через router.replace: фильтры не засоряют историю браузера,
// и «назад» возвращает на страницу, с которой пришли в каталог

export const BUDGETS = [500, 1000, 1500] as const;
export const DURATIONS = ["short", "week", "long"] as const;
export const SORTS = ["popular", "price-asc", "price-desc"] as const;

export type Duration = (typeof DURATIONS)[number];
export type Sort = (typeof SORTS)[number];

// Параметр из адреса может прийти строкой, массивом (?a=1&a=2) или не прийти вовсе
function param<T extends z.ZodType>(schema: T) {
  return z.preprocess(
    (value) => (Array.isArray(value) ? value[0] : value || undefined),
    schema.optional().catch(undefined),
  );
}

// Некорректные значения (?budget=abc) не ломают страницу, а просто игнорируются
export const tourFiltersSchema = z.object({
  destination: param(z.string().regex(/^[a-z0-9-]+$/)),
  type: param(tourTypeSchema),
  budget: param(z.coerce.number().int().positive()),
  duration: param(z.enum(DURATIONS)),
  hot: param(z.literal("1")),
  sort: param(z.enum(SORTS)),
});

export type TourFilters = z.infer<typeof tourFiltersSchema>;

export function parseTourFilters(
  searchParams: Record<string, string | string[] | undefined>,
): TourFilters {
  return tourFiltersSchema.parse(searchParams);
}

export function hasActiveFilters(filters: TourFilters) {
  return Object.entries(filters).some(
    ([key, value]) => key !== "sort" && value !== undefined,
  );
}

const DURATION_RANGES: Record<Duration, [number, number]> = {
  short: [1, 4],
  week: [5, 8],
  long: [9, Infinity],
};

export function filterTours(tours: Tour[], filters: TourFilters) {
  return tours.filter((tour) => {
    if (filters.destination && tour.destination !== filters.destination) {
      return false;
    }
    if (filters.type && tour.type !== filters.type) return false;
    if (filters.budget && tour.price > filters.budget) return false;
    if (filters.hot && !tour.hot) return false;
    if (filters.duration) {
      const [min, max] = DURATION_RANGES[filters.duration];
      if (tour.nights < min || tour.nights > max) return false;
    }
    return true;
  });
}

export function sortTours(tours: Tour[], sort: Sort = "popular") {
  const sorted = [...tours];
  if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
  else sorted.sort((a, b) => b.popularity - a.popularity);
  return sorted;
}

// Адрес каталога без пустых параметров: /tours?budget=1000,
// а не /tours?destination=&budget=1000&duration=
export function filtersHref(filters: TourFilters) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value === undefined || (key === "sort" && value === "popular"))
      continue;
    params.set(key, String(value));
  }
  const query = params.toString();
  return query ? `/tours?${query}` : "/tours";
}

// Для формы поиска на главной: поля формы → проверенные фильтры → адрес
export function toursHref(formData: FormData) {
  const entries = [...formData].filter(
    (entry): entry is [string, string] => typeof entry[1] === "string",
  );
  return filtersHref(parseTourFilters(Object.fromEntries(entries)));
}

export function discountPercent(tour: Pick<Tour, "price" | "oldPrice">) {
  if (!tour.oldPrice) return 0;
  return Math.round((1 - tour.price / tour.oldPrice) * 100);
}

// Сравниваем строки вида 2026-10-12 — для ISO-дат этого достаточно
export function upcomingDepartures(tour: Tour, today = new Date()) {
  const todayIso = today.toISOString().slice(0, 10);
  return tour.departures.filter((date) => date >= todayIso).sort();
}
