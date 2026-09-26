import { SearchX } from "lucide-react";
import { useTranslations } from "next-intl";

import { WhatsAppIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { whatsappHref } from "@/lib/contacts";

export function CatalogEmpty() {
  const t = useTranslations("Catalog");
  const tWhatsApp = useTranslations("WhatsApp");

  return (
    <div className="flex flex-col items-center rounded-3xl border border-dashed px-6 py-16 text-center">
      <SearchX className="size-10 text-muted-foreground" aria-hidden="true" />
      <h2 className="mt-4 text-xl font-bold">{t("emptyTitle")}</h2>
      <p className="mt-2 max-w-md text-muted-foreground">{t("emptyText")}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button asChild size="pill">
          <Link href="/tours">{t("emptyReset")}</Link>
        </Button>
        <Button asChild size="pill" variant="outline">
          <a
            href={whatsappHref(tWhatsApp("greeting"))}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon />
            WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );
}
