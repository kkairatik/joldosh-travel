import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

export type Crumb = { label: string; href?: string };

// «Главная» добавляется сама; последний пункт — текущая страница, без ссылки
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const t = useTranslations("Breadcrumbs");
  const crumbs: Crumb[] = [{ label: t("home"), href: "/" }, ...items];

  return (
    <nav aria-label={t("label")}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.label} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight
                  className="size-3.5 opacity-60"
                  aria-hidden="true"
                />
              )}
              {crumb.href && !isLast ? (
                <Link
                  href={crumb.href}
                  className="transition-colors hover:text-foreground"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className="font-medium text-foreground"
                >
                  {crumb.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
