import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/container";
import { CtaBanner } from "@/components/home/cta-banner";
import { Features } from "@/components/home/features";
import { PageHeader } from "@/components/page-header";
import { unsplash } from "@/lib/images";

const STEPS = ["request", "options", "booking", "support"] as const;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("About");
  return { title: t("title"), description: t("metaDescription") };
}

export default async function AboutPage() {
  const t = await getTranslations("About");

  return (
    <>
      <PageHeader
        title={t("title")}
        description={t("description")}
        breadcrumbs={[{ label: t("title") }]}
      />

      <Container className="grid gap-10 py-14 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            {t("storyTitle")}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-foreground/85">
            {t("story1")}
          </p>
          <p className="mt-4 text-lg leading-relaxed text-foreground/85">
            {t("story2")}
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-muted">
          <Image
            src={unsplash("photo-1783303391423-0085f18dc50e", 1400)}
            alt=""
            fill
            sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </Container>

      <section
        aria-labelledby="steps-title"
        className="bg-muted py-16 sm:py-20"
      >
        <Container>
          <h2
            id="steps-title"
            className="text-3xl font-extrabold tracking-tight sm:text-4xl"
          >
            {t("stepsTitle")}
          </h2>
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => (
              <li key={step} className="rounded-3xl bg-background p-6 sm:p-7">
                <span
                  aria-hidden="true"
                  className="text-4xl font-extrabold tracking-tight text-primary"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-bold">
                  {t(`steps.${step}.title`)}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                  {t(`steps.${step}.text`)}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <Features />
      <CtaBanner />
    </>
  );
}
