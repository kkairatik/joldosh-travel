import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { CatalogEmpty } from "@/components/tours/catalog-empty";
import { CatalogFilters } from "@/components/tours/catalog-filters";
import {
  CatalogProvider,
  CatalogResults,
} from "@/components/tours/catalog-state";
import { TourGrid } from "@/components/tours/tour-grid";
import { parseTourFilters } from "@/lib/tours/filters";
import {
  getDestinationMap,
  getDestinations,
  getTours,
} from "@/lib/tours/queries";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Catalog");
  return { title: t("title"), description: t("metaDescription") };
}

// Страница рендерится на сервере при каждом запросе: фильтры берутся из адреса
export default async function ToursPage({
  searchParams,
}: PageProps<"/[locale]/tours">) {
  const filters = parseTourFilters(await searchParams);
  const [t, locale, tours, destinations, destinationMap] = await Promise.all([
    getTranslations("Catalog"),
    getLocale(),
    getTours(filters),
    getDestinations(),
    getDestinationMap(),
  ]);

  return (
    <>
      <PageHeader
        title={t("title")}
        description={t("description")}
        breadcrumbs={[{ label: t("title") }]}
      />
      <Container className="py-10 sm:py-12">
        <CatalogProvider>
          <CatalogFilters
            destinations={destinations.map((destination) => ({
              slug: destination.slug,
              name: destination.name[locale],
            }))}
            filters={filters}
            count={tours.length}
          />
          <CatalogResults>
            {tours.length > 0 ? (
              <TourGrid tours={tours} destinations={destinationMap} />
            ) : (
              <CatalogEmpty />
            )}
          </CatalogResults>
        </CatalogProvider>
      </Container>
    </>
  );
}
