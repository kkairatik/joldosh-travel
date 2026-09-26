import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { Container } from "@/components/container";
import { WhatsAppIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { whatsappHref } from "@/lib/contacts";

// Фото: Unsplash (бесплатная лицензия)
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1620065487644-1080510335f5";

export function Hero() {
  const t = useTranslations("Home.hero");
  const tWhatsApp = useTranslations("WhatsApp");

  return (
    // -mt-* затягивает блок под прозрачную шапку (её высота h-16 / lg:h-20)
    <section className="relative isolate -mt-16 overflow-hidden bg-ink text-white lg:-mt-20">
      <Image
        src={HERO_IMAGE}
        alt=""
        fill
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        className="-z-10 object-cover"
      />
      {/* Затемнение под текстом: на телефоне текст во всю ширину, поэтому равномерное */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-black/50 via-black/45 to-black/60 sm:bg-linear-to-r sm:from-black/75 sm:via-black/40 sm:to-black/5"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-40 bg-linear-to-b from-black/45 to-transparent"
      />

      <Container className="flex min-h-[620px] flex-col justify-center pt-28 pb-36 sm:min-h-[680px] lg:min-h-[760px] lg:pt-32">
        <p className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm font-semibold backdrop-blur-sm">
          <span aria-hidden="true" className="size-2 rounded-full bg-primary" />
          {t("eyebrow")}
        </p>
        <h1 className="mt-5 max-w-3xl text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          {t.rich("title", {
            nowrap: (chunks) => (
              <span className="whitespace-nowrap">{chunks}</span>
            ),
          })}
        </h1>
        <p className="mt-5 max-w-xl text-lg text-white/85 sm:text-xl">
          {t("subtitle")}
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="xl">
            <Link href="/tours">
              {t("primaryCta")}
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="xl" variant="glass">
            <a
              href={whatsappHref(tWhatsApp("greeting"))}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              {t("secondaryCta")}
            </a>
          </Button>
        </div>
      </Container>
    </section>
  );
}
