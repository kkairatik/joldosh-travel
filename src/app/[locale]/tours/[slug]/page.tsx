import { Check, Compass, MapPin, Moon, X } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { BookingCard } from "@/components/tours/booking-card";
import { Itinerary } from "@/components/tours/itinerary";
import { MobileBookingBar } from "@/components/tours/mobile-booking-bar";
import { TourGallery } from "@/components/tours/tour-gallery";
import { TourGrid } from "@/components/tours/tour-grid";
import {
  getDestinationMap,
  getSimilarTours,
  getTourBySlug,
  getTours,
} from "@/lib/tours/queries";

// Все туры собираются заранее для обоих языков (язык приходит из [locale])
export async function generateStaticParams() {
  const tours = await getTours();
  return tours.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/tours/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const [tour, locale] = await Promise.all([getTourBySlug(slug), getLocale()]);
  if (!tour) return {};

  return {
    title: tour.title[locale],
    description: tour.summary[locale],
    openGraph: { images: [{ url: tour.images[0] }] },
  };
}

export default async function TourPage({
  params,
}: PageProps<"/[locale]/tours/[slug]">) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) notFound();

  const [t, tNav, tTypes, locale, destinations, similar] = await Promise.all([
    getTranslations("Tour"),
    getTranslations("Nav"),
    getTranslations("TourTypes"),
    getLocale(),
    getDestinationMap(),
    getSimilarTours(tour),
  ]);
  const destination = destinations[tour.destination];
  const title = tour.title[locale];

  return (
    <>
      <Container className="pt-8 sm:pt-10">
        <Breadcrumbs
          items={[
            { label: tNav("tours"), href: "/tours" },
            {
              label: destination.name[locale],
              href: `/tours?destination=${destination.slug}`,
            },
            { label: title },
          ]}
        />
        <h1 className="mt-5 max-w-4xl text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-muted-foreground [&_svg]:size-4 [&_svg]:text-primary">
          <li className="flex items-center gap-2">
            <MapPin aria-hidden="true" />
            {destination.name[locale]}
          </li>
          <li className="flex items-center gap-2">
            <Moon aria-hidden="true" />
            {t("duration", { days: tour.nights + 1, nights: tour.nights })}
          </li>
          <li className="flex items-center gap-2">
            <Compass aria-hidden="true" />
            {tTypes(tour.type)}
          </li>
        </ul>
      </Container>

      <Container className="pt-8">
        <TourGallery images={tour.images} title={title} />
      </Container>

      <Container className="grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-14 lg:py-16">
        <div className="space-y-14">
          <section aria-labelledby="about-title">
            <h2
              id="about-title"
              className="text-2xl font-extrabold tracking-tight"
            >
              {t("about")}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-foreground/85">
              {tour.description[locale]}
            </p>
          </section>

          <section aria-labelledby="itinerary-title">
            <h2
              id="itinerary-title"
              className="mb-6 text-2xl font-extrabold tracking-tight"
            >
              {t("itinerary")}
            </h2>
            <Itinerary items={tour.itinerary} />
          </section>

          <div className="grid gap-6 sm:grid-cols-2">
            <section
              aria-labelledby="included-title"
              className="rounded-3xl bg-muted p-6"
            >
              <h2 id="included-title" className="text-lg font-bold">
                {t("included")}
              </h2>
              <ul className="mt-4 space-y-3 text-[15px]">
                {tour.included.map((entry) => (
                  <li key={entry.ru} className="flex gap-3">
                    <Check
                      className="mt-0.5 size-5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    {entry[locale]}
                  </li>
                ))}
              </ul>
            </section>
            <section
              aria-labelledby="excluded-title"
              className="rounded-3xl p-6 ring-1 ring-border"
            >
              <h2 id="excluded-title" className="text-lg font-bold">
                {t("excluded")}
              </h2>
              <ul className="mt-4 space-y-3 text-[15px] text-muted-foreground">
                {tour.excluded.map((entry) => (
                  <li key={entry.ru} className="flex gap-3">
                    <X className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
                    {entry[locale]}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <BookingCard tour={tour} />
        </aside>
      </Container>

      {similar.length > 0 && (
        <section
          aria-labelledby="similar-title"
          className="bg-muted py-16 sm:py-20"
        >
          <Container>
            <h2
              id="similar-title"
              className="text-3xl font-extrabold tracking-tight"
            >
              {t("similar")}
            </h2>
            <div className="mt-8">
              <TourGrid tours={similar} destinations={destinations} />
            </div>
          </Container>
        </section>
      )}

      <MobileBookingBar tour={tour} />
    </>
  );
}
