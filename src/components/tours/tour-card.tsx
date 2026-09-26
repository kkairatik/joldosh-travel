import { ArrowRight, Flame, Moon } from "lucide-react";
import Image from "next/image";
import { useFormatter, useLocale, useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { discountPercent } from "@/lib/tours/filters";
import type { Destination, Tour } from "@/lib/tours/schema";

type Props = { tour: Tour; destination?: Destination };

export function TourCard({ tour, destination }: Props) {
  const t = useTranslations("Tour");
  const tTypes = useTranslations("TourTypes");
  const format = useFormatter();
  const locale = useLocale();
  const discount = discountPercent(tour);

  return (
    // Вся карточка кликабельна: ссылка в заголовке растянута на неё через after:inset-0
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-card ring-1 ring-border transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 has-[a:focus-visible]:ring-3 has-[a:focus-visible]:ring-ring/50">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={tour.images[0]}
          alt=""
          fill
          sizes="(min-width: 1280px) 400px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        {tour.hot && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground">
            <Flame className="size-3.5" aria-hidden="true" />
            {t("hot")}
            {discount > 0 && ` ${t("discount", { percent: discount })}`}
          </span>
        )}
        <p className="absolute bottom-3 left-3 rounded-full bg-background/95 px-3 py-1.5 text-sm font-bold shadow-sm">
          {t("priceFrom", { price: format.number(tour.price, "price") })}
          {tour.oldPrice && (
            <s className="ml-1.5 text-xs font-medium text-muted-foreground">
              <span className="sr-only">{t("oldPrice")} </span>
              {format.number(tour.oldPrice, "price")}
            </s>
          )}
        </p>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm font-semibold text-primary">
          {destination?.name[locale]} · {tTypes(tour.type)}
        </p>
        <h3 className="mt-1.5 text-lg leading-snug font-bold">
          <Link
            href={`/tours/${tour.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {tour.title[locale]}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-[15px] text-muted-foreground">
          {tour.summary[locale]}
        </p>
        <div className="mt-auto flex items-center justify-between pt-5 text-sm">
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <Moon className="size-4" aria-hidden="true" />
            {t("nights", { count: tour.nights })}
          </span>
          <span
            aria-hidden="true"
            className="inline-flex items-center gap-1 font-semibold transition-colors group-hover:text-primary"
          >
            {t("more")}
            <ArrowRight className="size-4" />
          </span>
        </div>
      </div>
    </article>
  );
}
