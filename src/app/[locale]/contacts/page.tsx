import { Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import type { ComponentType } from "react";

import { BookingForm } from "@/components/booking/booking-form";
import { Container } from "@/components/container";
import { WhatsAppIcon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { siteConfig } from "@/config/site";
import { phoneHref, whatsappHref } from "@/lib/contacts";
import { getDestinations } from "@/lib/tours/queries";

// OpenStreetMap не требует ключа API и не ставит рекламных cookie
const MAP_URL =
  "https://www.openstreetmap.org/export/embed.html?bbox=74.56%2C42.85%2C74.65%2C42.90&layer=mapnik&marker=42.8766%2C74.6036";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Contacts");
  return { title: t("title"), description: t("metaDescription") };
}

type ContactCard = {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
  note?: string;
};

export default async function ContactsPage() {
  const [t, tBooking, tFooter, tWhatsApp, locale, destinations] =
    await Promise.all([
      getTranslations("Contacts"),
      getTranslations("Booking"),
      getTranslations("Footer"),
      getTranslations("WhatsApp"),
      getLocale(),
      getDestinations(),
    ]);

  const cards: ContactCard[] = [
    {
      icon: Phone,
      label: t("phone"),
      value: siteConfig.phone,
      href: phoneHref(),
    },
    {
      icon: WhatsAppIcon,
      label: t("whatsapp"),
      value: t("whatsappText"),
      href: whatsappHref(tWhatsApp("greeting")),
    },
    {
      icon: Mail,
      label: t("email"),
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
    {
      icon: MapPin,
      label: t("office"),
      value: tFooter("address"),
      note: tFooter("hours"),
    },
  ];

  return (
    <>
      <PageHeader
        title={t("title")}
        description={t("description")}
        breadcrumbs={[{ label: t("title") }]}
      />
      <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14">
        <div className="space-y-6">
          <ul className="grid gap-4 sm:grid-cols-2">
            {cards.map(({ icon: Icon, label, value, href, note }) => (
              <li key={label} className="rounded-3xl bg-muted p-6">
                <span className="grid size-11 place-items-center rounded-2xl bg-accent text-accent-foreground">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <p className="mt-4 text-sm text-muted-foreground">{label}</p>
                {href ? (
                  <a
                    href={href}
                    {...(href.startsWith("https://")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="mt-1 block text-base font-bold break-words transition-colors hover:text-primary sm:text-lg"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="mt-1 text-base font-bold sm:text-lg">{value}</p>
                )}
                {note && (
                  <p className="mt-1 text-sm text-muted-foreground">{note}</p>
                )}
              </li>
            ))}
          </ul>
          <div className="overflow-hidden rounded-3xl bg-muted ring-1 ring-border">
            <iframe
              title={t("map")}
              src={MAP_URL}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="block h-80 w-full border-0"
            />
          </div>
        </div>

        <section
          id="request"
          aria-labelledby="request-title"
          className="scroll-mt-28 rounded-3xl bg-background p-6 shadow-xl ring-1 shadow-black/5 ring-border sm:p-8 lg:self-start"
        >
          <h2
            id="request-title"
            className="text-2xl font-extrabold tracking-tight sm:text-3xl"
          >
            {tBooking("generalTitle")}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {tBooking("generalSubtitle")}
          </p>
          <div className="mt-6">
            <BookingForm
              kind="general"
              destinations={destinations.map((destination) => ({
                value: destination.slug,
                label: destination.name[locale],
              }))}
            />
          </div>
        </section>
      </Container>
    </>
  );
}
