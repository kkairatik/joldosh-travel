"use client";

import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { Container } from "@/components/container";
import { WhatsAppIcon } from "@/components/icons";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { mainNav, siteConfig } from "@/config/site";
import { Link, usePathname } from "@/i18n/navigation";
import { phoneHref, whatsappHref } from "@/lib/contacts";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const t = useTranslations("Header");
  const tNav = useTranslations("Nav");
  const tWhatsApp = useTranslations("WhatsApp");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // На главной шапка прозрачная поверх фото, пока страницу не прокрутили.
  // Первый экран заезжает под неё за счёт отрицательного отступа (см. Hero)
  const overlay = pathname === "/" && !scrolled;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 h-16 transition-[background-color,color,box-shadow] duration-300 lg:h-20",
        overlay
          ? "bg-transparent text-white"
          : "bg-background/90 text-foreground shadow-[0_1px_0_var(--color-border)] backdrop-blur-md",
      )}
    >
      <Container className="flex h-full items-center gap-6">
        <Link href="/" aria-label={t("home")} className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label={t("navLabel")} className="hidden flex-1 lg:block">
          <ul className="flex items-center justify-center gap-1">
            {mainNav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-full px-4 py-2 text-[15px] font-medium transition-colors",
                      overlay ? "hover:bg-white/15" : "hover:bg-muted",
                      active && (overlay ? "bg-white/15" : "bg-muted"),
                    )}
                  >
                    {tNav(item.label)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <a
            href={phoneHref()}
            className="hidden items-center gap-2 px-2 text-[15px] font-semibold whitespace-nowrap xl:flex"
          >
            <Phone className="size-4" aria-hidden="true" />
            {siteConfig.phone}
          </a>
          <LocaleSwitcher overlay={overlay} className="hidden sm:flex" />
          <Button asChild size="pill" className="hidden md:inline-flex">
            <a
              href={whatsappHref(tWhatsApp("greeting"))}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              {t("cta")}
            </a>
          </Button>
          <MobileNav overlay={overlay} />
        </div>
      </Container>
    </header>
  );
}
