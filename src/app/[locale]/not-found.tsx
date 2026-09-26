import { useTranslations } from "next-intl";

import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <Container className="flex flex-col items-center py-24 text-center sm:py-32">
      <p className="text-7xl font-extrabold tracking-tight text-primary sm:text-8xl">
        404
      </p>
      <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-md text-lg text-muted-foreground">{t("text")}</p>
      <Button asChild size="xl" className="mt-9">
        <Link href="/">{t("back")}</Link>
      </Button>
    </Container>
  );
}
