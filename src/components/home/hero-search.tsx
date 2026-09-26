"use client";

import { ChevronDown, Search } from "lucide-react";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { useId, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { getPathname, useRouter } from "@/i18n/navigation";
import { BUDGETS, DURATIONS, toursHref } from "@/lib/tours/filters";

type Props = { destinations: { slug: string; name: string }[] };

// Поиск на первом экране: ведёт в каталог с выбранными фильтрами.
// Без JavaScript работает как обычная GET-форма
export function HeroSearch({ destinations }: Props) {
  const t = useTranslations("Home.search");
  const tFilters = useTranslations("Filters");
  const format = useFormatter();
  const locale = useLocale();
  const router = useRouter();
  const id = useId();

  return (
    <form
      role="search"
      aria-label={t("label")}
      action={getPathname({ href: "/tours", locale })}
      method="get"
      onSubmit={(event) => {
        event.preventDefault();
        router.push(toursHref(new FormData(event.currentTarget)));
      }}
      className="mt-9 grid max-w-4xl gap-1 rounded-3xl bg-background p-2 text-foreground shadow-2xl shadow-black/25 sm:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_auto] lg:rounded-full"
    >
      <SearchField id={`${id}-destination`} label={tFilters("destination")}>
        <select
          id={`${id}-destination`}
          name="destination"
          className={selectClass}
        >
          <option value="">{tFilters("anyDestination")}</option>
          {destinations.map((destination) => (
            <option key={destination.slug} value={destination.slug}>
              {destination.name}
            </option>
          ))}
        </select>
      </SearchField>
      <SearchField id={`${id}-budget`} label={tFilters("budget")}>
        <select id={`${id}-budget`} name="budget" className={selectClass}>
          <option value="">{tFilters("anyBudget")}</option>
          {BUDGETS.map((budget) => (
            <option key={budget} value={budget}>
              {tFilters("budgetUpTo", {
                price: format.number(budget, "price"),
              })}
            </option>
          ))}
        </select>
      </SearchField>
      <SearchField id={`${id}-duration`} label={tFilters("duration")}>
        <select id={`${id}-duration`} name="duration" className={selectClass}>
          <option value="">{tFilters("anyDuration")}</option>
          {DURATIONS.map((duration) => (
            <option key={duration} value={duration}>
              {tFilters(`durations.${duration}`)}
            </option>
          ))}
        </select>
      </SearchField>
      <Button
        type="submit"
        size="xl"
        className="h-14 sm:col-span-3 lg:col-span-1 lg:px-8"
      >
        <Search />
        {t("submit")}
      </Button>
    </form>
  );
}

const selectClass =
  "mt-0.5 w-full cursor-pointer appearance-none truncate bg-transparent pr-6 text-[15px] font-semibold outline-none";

function SearchField({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="relative flex flex-col rounded-2xl px-4 py-2.5 transition-colors hover:bg-muted has-focus-visible:bg-muted has-focus-visible:ring-3 has-focus-visible:ring-ring/50 lg:rounded-full lg:px-6">
      <label
        htmlFor={id}
        className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
      >
        {label}
      </label>
      {children}
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-4 bottom-3.5 size-4 text-muted-foreground lg:right-6"
      />
    </div>
  );
}
