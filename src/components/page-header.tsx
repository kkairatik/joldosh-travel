import type { ReactNode } from "react";

import { Breadcrumbs, type Crumb } from "@/components/breadcrumbs";
import { Container } from "@/components/container";

type Props = {
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs: Crumb[];
  children?: ReactNode;
};

// Шапка внутренних страниц: хлебные крошки, заголовок, подзаголовок
export function PageHeader({
  title,
  description,
  breadcrumbs,
  children,
}: Props) {
  return (
    <section className="border-b bg-muted">
      <Container className="py-10 sm:py-14">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="mt-5 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {description}
          </p>
        )}
        {children}
      </Container>
    </section>
  );
}
