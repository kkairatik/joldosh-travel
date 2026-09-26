import { useTranslations } from "next-intl";

import { Container } from "@/components/container";
import { SectionHeader } from "@/components/section-header";
import { TourGrid } from "@/components/tours/tour-grid";
import type { Destination, Tour } from "@/lib/tours/schema";

type Props = {
  tours: Tour[];
  destinations: Record<string, Destination>;
};

export function HotTours({ tours, destinations }: Props) {
  const t = useTranslations("Home.hot");

  return (
    <section aria-labelledby="hot-title" className="pt-20 sm:pt-24">
      <Container>
        <SectionHeader
          id="hot-title"
          title={t("title")}
          subtitle={t("subtitle")}
          link={{
            href: { pathname: "/tours", query: { hot: "1" } },
            label: t("all"),
          }}
        />
        <div className="mt-10">
          <TourGrid tours={tours} destinations={destinations} />
        </div>
      </Container>
    </section>
  );
}
