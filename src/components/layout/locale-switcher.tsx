"use client";

import { useLocale, useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type Props = {
  // Светлый вариант для прозрачной шапки поверх фото
  overlay?: boolean;
  className?: string;
};

export function LocaleSwitcher({ overlay = false, className }: Props) {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav
      aria-label={t("label")}
      className={cn(
        "items-center gap-0.5 rounded-full p-1 text-xs font-bold",
        overlay ? "bg-white/15" : "bg-muted",
        className,
      )}
    >
      {routing.locales.map((item) => {
        const active = item === locale;
        return (
          <Link
            key={item}
            href={pathname}
            locale={item}
            aria-label={t(item)}
            aria-current={active ? "true" : undefined}
            className={cn(
              "rounded-full px-2.5 py-1.5 uppercase transition-colors",
              active
                ? "bg-background text-foreground shadow-sm"
                : "opacity-75 hover:opacity-100",
            )}
          >
            {item}
          </Link>
        );
      })}
    </nav>
  );
}
