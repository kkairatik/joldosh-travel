"use client";

import { Flame, RotateCcw, SlidersHorizontal } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { useId, useOptimistic, useState, type ReactNode } from "react";

import { useCatalog } from "@/components/tours/catalog-state";
import { Button } from "@/components/ui/button";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { useRouter } from "@/i18n/navigation";
import {
  BUDGETS,
  DURATIONS,
  SORTS,
  filtersHref,
  type TourFilters,
} from "@/lib/tours/filters";
import { TOUR_TYPES } from "@/lib/tours/schema";
import { cn } from "@/lib/utils";

type Props = {
  destinations: { slug: string; name: string }[];
  filters: TourFilters;
  count: number;
};

export function CatalogFilters({ destinations, filters, count }: Props) {
  const t = useTranslations("Filters");
  const tTypes = useTranslations("TourTypes");
  const tCatalog = useTranslations("Catalog");
  const format = useFormatter();
  const router = useRouter();
  const { startTransition } = useCatalog();
  const id = useId();
  const [open, setOpen] = useState(false);
  // Выбранное значение видно сразу, не дожидаясь ответа сервера.
  // Когда новый адрес загрузится, filters из пропсов его подтвердят
  const [values, setValues] = useOptimistic(filters);

  function update(patch: Partial<TourFilters>) {
    const next = { ...values, ...patch };
    startTransition(() => {
      setValues(next);
      router.replace(filtersHref(next), { scroll: false });
    });
  }

  const activeCount = [
    values.destination,
    values.type,
    values.budget,
    values.duration,
    values.hot,
  ].filter(Boolean).length;

  const reset = () =>
    update({
      destination: undefined,
      type: undefined,
      budget: undefined,
      duration: undefined,
      hot: undefined,
    });

  return (
    <>
      {/* Без JavaScript форма отправляется обычным GET-запросом по кнопке «Показать» */}
      <form
        id={`${id}-form`}
        method="get"
        onSubmit={(event) => event.preventDefault()}
        className="rounded-3xl bg-background p-4 shadow-sm ring-1 ring-border sm:p-5"
      >
        <div className="flex items-center justify-between gap-3 lg:hidden">
          <Button
            type="button"
            variant="outline"
            size="pill"
            aria-expanded={open}
            aria-controls={`${id}-panel`}
            onClick={() => setOpen((value) => !value)}
          >
            <SlidersHorizontal />
            {t("toggle")}
            {activeCount > 0 && (
              <span className="grid size-5 place-items-center rounded-full bg-primary text-[11px] text-primary-foreground">
                {activeCount}
              </span>
            )}
          </Button>
          {activeCount > 0 && (
            <ResetButton label={t("reset")} onClick={reset} />
          )}
        </div>

        <div
          id={`${id}-panel`}
          className={cn(
            "gap-3 sm:grid-cols-2 lg:grid lg:grid-cols-[repeat(4,minmax(0,1fr))_auto] lg:items-end",
            open ? "mt-4 grid" : "hidden",
          )}
        >
          <Field id={`${id}-destination`} label={t("destination")}>
            <NativeSelect
              id={`${id}-destination`}
              name="destination"
              size="lg"
              className="w-full"
              value={values.destination ?? ""}
              onChange={(event) =>
                update({ destination: event.target.value || undefined })
              }
            >
              <NativeSelectOption value="">
                {t("anyDestination")}
              </NativeSelectOption>
              {destinations.map((destination) => (
                <NativeSelectOption
                  key={destination.slug}
                  value={destination.slug}
                >
                  {destination.name}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </Field>

          <Field id={`${id}-type`} label={t("type")}>
            <NativeSelect
              id={`${id}-type`}
              name="type"
              size="lg"
              className="w-full"
              value={values.type ?? ""}
              onChange={(event) =>
                update({
                  type: (event.target.value ||
                    undefined) as TourFilters["type"],
                })
              }
            >
              <NativeSelectOption value="">{t("anyType")}</NativeSelectOption>
              {TOUR_TYPES.map((type) => (
                <NativeSelectOption key={type} value={type}>
                  {tTypes(type)}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </Field>

          <Field id={`${id}-budget`} label={t("budget")}>
            <NativeSelect
              id={`${id}-budget`}
              name="budget"
              size="lg"
              className="w-full"
              value={values.budget ?? ""}
              onChange={(event) =>
                update({
                  budget: event.target.value
                    ? Number(event.target.value)
                    : undefined,
                })
              }
            >
              <NativeSelectOption value="">{t("anyBudget")}</NativeSelectOption>
              {BUDGETS.map((budget) => (
                <NativeSelectOption key={budget} value={budget}>
                  {t("budgetUpTo", { price: format.number(budget, "price") })}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </Field>

          <Field id={`${id}-duration`} label={t("duration")}>
            <NativeSelect
              id={`${id}-duration`}
              name="duration"
              size="lg"
              className="w-full"
              value={values.duration ?? ""}
              onChange={(event) =>
                update({
                  duration: (event.target.value ||
                    undefined) as TourFilters["duration"],
                })
              }
            >
              <NativeSelectOption value="">
                {t("anyDuration")}
              </NativeSelectOption>
              {DURATIONS.map((duration) => (
                <NativeSelectOption key={duration} value={duration}>
                  {t(`durations.${duration}`)}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </Field>

          <label className="flex h-11 cursor-pointer items-center gap-2.5 rounded-xl border border-input px-3.5 text-[15px] font-medium whitespace-nowrap transition-colors has-checked:border-primary has-checked:bg-accent has-checked:text-accent-foreground has-focus-visible:ring-3 has-focus-visible:ring-ring/50">
            <input
              type="checkbox"
              name="hot"
              value="1"
              checked={values.hot === "1"}
              onChange={(event) =>
                update({ hot: event.target.checked ? "1" : undefined })
              }
              className="size-4 accent-primary"
            />
            <Flame className="size-4" aria-hidden="true" />
            {t("hot")}
          </label>
        </div>

        <noscript>
          <Button type="submit" size="pill" className="mt-4">
            {t("apply")}
          </Button>
        </noscript>
      </form>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="text-[15px] text-muted-foreground">
          {tCatalog("found", { count })}
        </p>
        <div className="flex items-center gap-3">
          {activeCount > 0 && (
            <ResetButton
              label={t("reset")}
              onClick={reset}
              className="hidden lg:inline-flex"
            />
          )}
          <label htmlFor={`${id}-sort`} className="sr-only">
            {t("sort")}
          </label>
          <NativeSelect
            id={`${id}-sort`}
            name="sort"
            form={`${id}-form`}
            value={values.sort ?? "popular"}
            onChange={(event) =>
              update({ sort: event.target.value as TourFilters["sort"] })
            }
            size="lg"
          >
            {SORTS.map((sort) => (
              <NativeSelectOption key={sort} value={sort}>
                {t(`sorts.${sort}`)}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>
      </div>
    </>
  );
}

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-bold tracking-wide text-muted-foreground uppercase"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function ResetButton({
  label,
  onClick,
  className,
}: {
  label: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="pill"
      onClick={onClick}
      className={className}
    >
      <RotateCcw />
      {label}
    </Button>
  );
}
