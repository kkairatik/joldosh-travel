import { useTranslations } from "next-intl";

import { Container } from "@/components/container";

const STATS = ["years", "travelers", "destinations", "support"] as const;

export function Stats() {
  const t = useTranslations("Home.stats");

  return (
    // Карточка наезжает на нижний край первого экрана
    <section aria-labelledby="stats-title" className="relative z-10 -mt-20">
      <Container>
        <h2 id="stats-title" className="sr-only">
          {t("title")}
        </h2>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 rounded-3xl bg-background p-6 shadow-xl ring-1 shadow-black/5 ring-border sm:p-10 md:grid-cols-4">
          {STATS.map((key) => (
            <div key={key} className="flex flex-col-reverse">
              <dt className="mt-1 text-sm text-muted-foreground sm:text-base">
                {t(`${key}.label`)}
              </dt>
              <dd className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
                {t(`${key}.value`)}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
