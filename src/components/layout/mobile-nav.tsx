"use client";

import { Menu, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { WhatsAppIcon } from "@/components/icons";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mainNav, siteConfig } from "@/config/site";
import { Link, usePathname } from "@/i18n/navigation";
import { phoneHref, whatsappHref } from "@/lib/contacts";
import { cn } from "@/lib/utils";

export function MobileNav({ overlay }: { overlay: boolean }) {
  const t = useTranslations("Header");
  const tNav = useTranslations("Nav");
  const tWhatsApp = useTranslations("WhatsApp");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon-lg"
          aria-label={t("openMenu")}
          className={cn(
            "lg:hidden",
            overlay && "text-white hover:bg-white/15 hover:text-white",
          )}
        >
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>

      <SheetContent closeLabel={t("closeMenu")}>
        <SheetHeader>
          <SheetTitle>
            <Logo />
          </SheetTitle>
          <SheetDescription className="sr-only">{t("menu")}</SheetDescription>
        </SheetHeader>

        <nav aria-label={t("navLabel")} className="px-4">
          <ul className="flex flex-col gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={
                    pathname.startsWith(item.href) ? "page" : undefined
                  }
                  className="block rounded-xl px-3 py-3 text-lg font-semibold hover:bg-muted aria-[current=page]:bg-muted"
                >
                  {tNav(item.label)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <SheetFooter className="gap-3">
          <LocaleSwitcher className="flex self-start" />
          <Button asChild size="xl" variant="outline">
            <a href={phoneHref()}>
              <Phone />
              {siteConfig.phone}
            </a>
          </Button>
          <Button asChild size="xl">
            <a
              href={whatsappHref(tWhatsApp("greeting"))}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              {t("cta")}
            </a>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
