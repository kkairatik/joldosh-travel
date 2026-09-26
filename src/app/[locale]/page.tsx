import { getLocale } from "next-intl/server";

import { CtaBanner } from "@/components/home/cta-banner";
import { Features } from "@/components/home/features";
import { Hero } from "@/components/home/hero";
import { HotTours } from "@/components/home/hot-tours";
import { PopularDestinations } from "@/components/home/popular-destinations";
import { Stats } from "@/components/home/stats";
import {
  getDestinationMap,
  getDestinations,
  getHotTours,
} from "@/lib/tours/queries";

export default async function HomePage() {
  const [locale, destinations, destinationMap, hotTours] = await Promise.all([
    getLocale(),
    getDestinations(),
    getDestinationMap(),
    getHotTours(),
  ]);

  return (
    <>
      <Hero
        destinations={destinations.map((destination) => ({
          slug: destination.slug,
          name: destination.name[locale],
        }))}
      />
      <Stats />
      <HotTours tours={hotTours} destinations={destinationMap} />
      <PopularDestinations destinations={destinations} />
      <Features />
      <CtaBanner />
    </>
  );
}
