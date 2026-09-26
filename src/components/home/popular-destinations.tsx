import { useTranslations } from "next-intl";

import { Container } from "@/components/container";
import { DestinationCard } from "@/components/destinations/destination-card";
import { SectionHeader } from "@/components/section-header";
import type { DestinationWithStats } from "@/lib/tours/queries";
import { cn } from "@/lib/utils";

export function PopularDestinations({
  destinations,
}: {
  destinations: DestinationWithStats[];
}) {
  const t = useTranslations("Home.destinations");

  return (
    <section aria-labelledby="destinations-title" className="pt-20 sm:pt-24">
      <Container>
        <SectionHeader
          id="destinations-title"
          title={t("title")}
          subtitle={t("subtitle")}
          link={{ href: "/destinations", label: t("all") }}
        />
        {/* Первая плитка шире остальных — получается «мозаика» */}
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination, index) => (
            <li
              key={destination.slug}
              className={cn(
                index === 0 && "sm:col-span-2",
                // На планшете (2 колонки) последняя плитка иначе осталась бы одна в ряду
                index === destinations.length - 1 &&
                  "sm:col-span-2 lg:col-span-1",
              )}
            >
              <DestinationCard
                destination={destination}
                sizes={
                  index === 0
                    ? "(min-width: 1280px) 830px, 100vw"
                    : "(min-width: 1280px) 400px, (min-width: 640px) 50vw, 100vw"
                }
                className="h-full"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
