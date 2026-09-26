import Image from "next/image";
import { useFormatter, useLocale, useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import type { DestinationWithStats } from "@/lib/tours/queries";
import { cn } from "@/lib/utils";

type Props = {
  destination: DestinationWithStats;
  sizes: string;
  className?: string;
};

// Плитка направления: ведёт в каталог с уже выбранным фильтром
export function DestinationCard({ destination, sizes, className }: Props) {
  const t = useTranslations("Destinations");
  const format = useFormatter();
  const locale = useLocale();

  return (
    <Link
      href={{ pathname: "/tours", query: { destination: destination.slug } }}
      className={cn(
        "group relative isolate flex min-h-64 flex-col justify-end overflow-hidden rounded-3xl bg-ink p-6 text-white focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none",
        className,
      )}
    >
      <Image
        src={destination.image}
        alt=""
        fill
        sizes={sizes}
        className="-z-10 object-cover transition duration-700 group-hover:scale-105"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-black/80 via-black/25 to-black/5"
      />
      <h3 className="text-2xl font-extrabold tracking-tight">
        {destination.name[locale]}
      </h3>
      <p className="mt-1 text-white/85">{destination.tagline[locale]}</p>
      <p className="mt-3 text-sm font-semibold">
        {t("tours", { count: destination.tourCount })}
        {destination.minPrice !== undefined &&
          ` · ${t("from", { price: format.number(destination.minPrice, "price") })}`}
      </p>
    </Link>
  );
}
