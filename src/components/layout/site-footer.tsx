import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/container";
import { WhatsAppIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { mainNav, siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { phoneHref, whatsappHref } from "@/lib/contacts";

export function SiteFooter() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const tWhatsApp = useTranslations("WhatsApp");
  // Строкой, иначе ICU отформатирует год как число: «2 026»
  const year = String(new Date().getFullYear());

  return (
    <footer className="bg-ink text-ink-foreground">
      <Container className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-5 text-sm leading-relaxed text-ink-foreground/70">
            {t("about")}
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold tracking-widest text-ink-foreground/50 uppercase">
            {t("navigation")}
          </h2>
          <ul className="mt-5 space-y-3 text-[15px]">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-white"
                >
                  {tNav(item.label)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-bold tracking-widest text-ink-foreground/50 uppercase">
            {t("contacts")}
          </h2>
          <ul className="mt-5 space-y-3 text-[15px] [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-primary">
            <li>
              <a
                href={phoneHref()}
                className="flex items-center gap-3 hover:text-white"
              >
                <Phone aria-hidden="true" />
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a
                href={whatsappHref(tWhatsApp("greeting"))}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-white"
              >
                <WhatsAppIcon />
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 hover:text-white"
              >
                <Mail aria-hidden="true" />
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin aria-hidden="true" />
              {t("address")}
            </li>
            <li className="flex items-center gap-3">
              <Clock aria-hidden="true" />
              {t("hours")}
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        {/* Справа отступ под плавающую кнопку WhatsApp */}
        <Container className="flex flex-col gap-2 py-6 pr-20 text-xs text-ink-foreground/60 sm:flex-row sm:justify-between sm:pr-24">
          <p>{t("copyright", { year })}</p>
          <p>{t("demo")}</p>
        </Container>
      </div>
    </footer>
  );
}
