import Image from "next/image";
import { useTranslations } from "next-intl";

import { Container } from "@/components/container";
import { HeroSearch } from "@/components/home/hero-search";
import { WhatsAppIcon } from "@/components/icons";
import { whatsappHref } from "@/lib/contacts";

// Фото: Unsplash (бесплатная лицензия)
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1620065487644-1080510335f5?w=2400&q=80&auto=format&fit=crop";

type Props = { destinations: { slug: string; name: string }[] };

export function Hero({ destinations }: Props) {
  const t = useTranslations("Home");
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
          {t("hero.eyebrow")}
        </p>
        <h1 className="mt-5 max-w-3xl text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          {t.rich("hero.title", {
            nowrap: (chunks) => (
              <span className="whitespace-nowrap">{chunks}</span>
            ),
          })}
        </h1>
        <p className="mt-5 max-w-xl text-lg text-white/85 sm:text-xl">
          {t("hero.subtitle")}
        </p>

        <HeroSearch destinations={destinations} />

        <p className="mt-5 text-[15px] text-white/85">
          {t("search.help")}{" "}
          <a
            href={whatsappHref(tWhatsApp("greeting"))}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
          >
            <WhatsAppIcon className="mr-1.5 inline-block align-[-3px]" />
            {t("search.helpLink")}
          </a>
        </p>
      </Container>
    </section>
  );
}
