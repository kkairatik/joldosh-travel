import "server-only";

import { destinations } from "@/data/destinations";
import { tours } from "@/data/tours";

import { filterTours, sortTours, type TourFilters } from "./filters";
import type { Destination, Tour } from "./schema";

// Единственное место, откуда страницы получают туры. Сейчас данные лежат в коде,
// на этапе 4 здесь появятся запросы к базе — страницы и компоненты не изменятся.
// Поэтому функции уже асинхронные

export async function getTours(filters: TourFilters = {}): Promise<Tour[]> {
  return sortTours(filterTours(tours, filters), filters.sort);
}

export async function getTourBySlug(slug: string): Promise<Tour | undefined> {
  return tours.find((tour) => tour.slug === slug);
}

export async function getHotTours(limit = 3): Promise<Tour[]> {
  return sortTours(tours.filter((tour) => tour.hot)).slice(0, limit);
}

// Сначала туры того же направления, потом того же типа отдыха
export async function getSimilarTours(tour: Tour, limit = 3): Promise<Tour[]> {
  const others = sortTours(tours.filter((other) => other.slug !== tour.slug));
  const sameDestination = others.filter(
    (other) => other.destination === tour.destination,
  );
  const sameType = others.filter(
    (other) =>
      other.destination !== tour.destination && other.type === tour.type,
  );
  return [...sameDestination, ...sameType].slice(0, limit);
}

export type DestinationWithStats = Destination & {
  tourCount: number;
  minPrice: number | undefined;
};

export async function getDestinations(): Promise<DestinationWithStats[]> {
  return destinations.map((destination) => {
    const prices = tours
      .filter((tour) => tour.destination === destination.slug)
      .map((tour) => tour.price);
    return {
      ...destination,
      tourCount: prices.length,
      minPrice: prices.length ? Math.min(...prices) : undefined,
    };
  });
}

export async function getDestinationMap(): Promise<
  Record<string, Destination>
> {
  return Object.fromEntries(destinations.map((item) => [item.slug, item]));
}
