import { useLocale, useTranslations } from "next-intl";

import type { Tour } from "@/lib/tours/schema";

// Программа по дням — вертикальная лента, всё видно сразу, без кликов
export function Itinerary({ items }: { items: Tour["itinerary"] }) {
  const t = useTranslations("Tour");
  const locale = useLocale();

  return (
    <ol className="relative">
      {items.map((item, index) => (
        <li
          key={item.day}
          className="relative flex gap-4 pb-8 last:pb-0 sm:gap-5"
        >
          {index < items.length - 1 && (
            <span
              aria-hidden="true"
              className="absolute top-11 bottom-1 left-5 w-px -translate-x-1/2 bg-border"
            />
          )}
          <span
            aria-hidden="true"
            className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-sm font-extrabold text-accent-foreground"
          >
            {item.day}
          </span>
          <div className="pt-1">
            <p className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
              {item.dayTo
                ? t("days", { from: item.day, to: item.dayTo })
                : t("day", { day: item.day })}
            </p>
            <h3 className="mt-1 text-lg font-bold">{item.title[locale]}</h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
              {item.text[locale]}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
