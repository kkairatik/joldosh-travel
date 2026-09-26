import { FileCheck, Hotel, MountainSnow, Wallet } from "lucide-react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/container";

const FEATURES = [
  { key: "prices", icon: Wallet },
  { key: "visa", icon: FileCheck },
  { key: "hotels", icon: Hotel },
  { key: "local", icon: MountainSnow },
] as const;

export function Features() {
  const t = useTranslations("Home.features");

  return (
    <section aria-labelledby="features-title" className="py-20 sm:py-24">
      <Container>
        <div className="max-w-2xl">
          <h2
            id="features-title"
            className="text-3xl font-extrabold tracking-tight sm:text-4xl"
          >
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ key, icon: Icon }) => (
            <li key={key} className="rounded-3xl bg-muted p-6 sm:p-7">
              <span className="grid size-12 place-items-center rounded-2xl bg-accent text-accent-foreground">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-bold">{t(`${key}.title`)}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                {t(`${key}.text`)}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
