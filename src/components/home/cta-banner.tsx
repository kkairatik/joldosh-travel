import { useTranslations } from "next-intl";

import { Container } from "@/components/container";
import { WhatsAppIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { whatsappHref } from "@/lib/contacts";

export function CtaBanner() {
  const t = useTranslations("Home.cta");
  const tWhatsApp = useTranslations("WhatsApp");

  return (
    <section aria-labelledby="cta-title" className="pb-20 sm:pb-24">
      <Container>
        <div className="relative isolate overflow-hidden rounded-3xl bg-primary px-6 py-12 text-primary-foreground sm:px-12 sm:py-14 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div
            aria-hidden="true"
            className="absolute -top-24 -right-16 -z-10 size-72 rounded-full bg-white/10"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-32 left-1/3 -z-10 size-72 rounded-full bg-white/5"
          />
          <div className="max-w-xl">
            <h2
              id="cta-title"
              className="text-3xl font-extrabold tracking-tight sm:text-4xl"
            >
              {t("title")}
            </h2>
            <p className="mt-3 text-lg text-primary-foreground/90">
              {t("text")}
            </p>
          </div>
          <Button
            asChild
            size="xl"
            className="mt-8 bg-white text-ink hover:bg-white/90 lg:mt-0"
          >
            <a
              href={whatsappHref(tWhatsApp("greeting"))}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              {t("button")}
            </a>
          </Button>
        </div>
      </Container>
    </section>
  );
}
