import { ArrowRight } from "lucide-react";
import type { ComponentProps } from "react";

import { Link } from "@/i18n/navigation";

type Props = {
  id: string;
  title: string;
  subtitle?: string;
  link?: { href: ComponentProps<typeof Link>["href"]; label: string };
};

// Заголовок секции на главной: слева текст, справа ссылка «Все …»
export function SectionHeader({ id, title, subtitle, link }: Props) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <h2
          id={id}
          className="text-3xl font-extrabold tracking-tight sm:text-4xl"
        >
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-lg text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {link && (
        <Link
          href={link.href}
          className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-primary hover:underline"
        >
          {link.label}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
