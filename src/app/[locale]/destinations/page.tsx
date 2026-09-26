import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/container";
import { DestinationCard } from "@/components/destinations/destination-card";
import { PageHeader } from "@/components/page-header";
import { getDestinations } from "@/lib/tours/queries";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Destinations");
  return { title: t("title"), description: t("metaDescription") };
}

export default async function DestinationsPage() {
  const [t, tNav, destinations] = await Promise.all([
    getTranslations("Destinations"),
    getTranslations("Nav"),
    getDestinations(),
  ]);

  return (
    <>
      <PageHeader
        title={t("title")}
        description={t("description")}
        breadcrumbs={[{ label: tNav("destinations") }]}
      />
      <Container className="py-12 sm:py-16">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <li key={destination.slug}>
              <DestinationCard
                destination={destination}
                sizes="(min-width: 1280px) 400px, (min-width: 640px) 50vw, 100vw"
                className="min-h-80"
              />
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
