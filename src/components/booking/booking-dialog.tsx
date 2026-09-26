"use client";

import { useTranslations } from "next-intl";
import { useState, type ComponentProps } from "react";

import { BookingForm } from "@/components/booking/booking-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  tour: {
    slug: string;
    title: string;
    dates: { value: string; label: string }[];
  };
  triggerClassName?: string;
  triggerSize?: ComponentProps<typeof Button>["size"];
};

// Кнопка «Забронировать» и окно с формой. Окно убирает форму из DOM при
// закрытии, поэтому при следующем открытии она снова пустая
export function BookingDialog({
  tour,
  triggerClassName,
  triggerSize = "xl",
}: Props) {
  const t = useTranslations("Booking");
  const tTour = useTranslations("Tour");
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={triggerSize} className={triggerClassName}>
          {tTour("book")}
        </Button>
      </DialogTrigger>
      <DialogContent
        closeLabel={t("close")}
        className="max-h-[calc(100dvh-2rem)] gap-6 overflow-y-auto rounded-3xl p-6 sm:max-w-xl sm:p-8"
      >
        <DialogHeader className="pr-8">
          <DialogTitle className="text-2xl leading-tight font-extrabold">
            {t("tourTitle")}
          </DialogTitle>
          <DialogDescription className="text-base">
            {tour.title}
          </DialogDescription>
        </DialogHeader>
        <BookingForm
          kind="tour"
          tour={{ slug: tour.slug, dates: tour.dates }}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
