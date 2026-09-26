"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const GRID_LIMIT = 5;

// Раскладка сетки на планшете и компьютере: первое фото крупное (2×2),
// остальные заполняют правую половину без пустых ячеек
function cellClass(index: number, count: number) {
  if (index === 0) return "sm:col-span-2 sm:row-span-2";
  if (count === 2) return "sm:col-span-2 sm:row-span-2";
  if (count === 3) return "sm:col-span-2";
  if (count === 4 && index === 3) return "sm:col-span-2";
  return "";
}

export function TourGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const t = useTranslations("Tour");
  const [index, setIndex] = useState<number | null>(null);
  // После закрытия просмотра фокус возвращается на миниатюру, с которой его открыли
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const total = images.length;
  const visible = images.slice(0, GRID_LIMIT);
  // Функциональное обновление: быстрые нажатия стрелок не теряются
  const step = (delta: number) =>
    setIndex((current) => ((current ?? 0) + delta + total) % total);

  return (
    <section aria-label={t("gallery")}>
      {/* Телефон: лента с прокруткой. Планшет и компьютер: сетка */}
      <ul className="-mx-4 flex snap-x snap-mandatory [scrollbar-width:none] gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:h-[420px] sm:grid-cols-4 sm:grid-rows-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:h-[520px]">
        {visible.map((src, i) => (
          <li
            key={src}
            className={cn(
              "relative aspect-[4/3] w-[85%] shrink-0 snap-center overflow-hidden rounded-2xl bg-muted sm:aspect-auto sm:w-auto",
              cellClass(i, visible.length),
            )}
          >
            <button
              type="button"
              onClick={(event) => {
                openerRef.current = event.currentTarget;
                setIndex(i);
              }}
              aria-label={t("openPhoto", { index: i + 1, total })}
              className="group absolute inset-0 cursor-zoom-in focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none focus-visible:ring-inset"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes={
                  i === 0
                    ? "(min-width: 1280px) 640px, (min-width: 640px) 50vw, 85vw"
                    : "(min-width: 1280px) 320px, (min-width: 640px) 25vw, 85vw"
                }
                // Первое фото — самый крупный элемент страницы, грузим его сразу
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              {i === GRID_LIMIT - 1 && total > GRID_LIMIT && (
                <span className="absolute inset-0 grid place-items-center bg-black/45 text-lg font-bold text-white">
                  +{total - GRID_LIMIT}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      <Dialog
        open={index !== null}
        onOpenChange={(isOpen) => !isOpen && setIndex(null)}
      >
        <DialogContent
          closeLabel={t("close")}
          className="max-w-[calc(100%-2rem)] gap-0 overflow-hidden bg-ink p-0 text-white ring-0 sm:max-w-5xl [&>[data-slot=dialog-close]]:bg-black/40 [&>[data-slot=dialog-close]]:text-white"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            openerRef.current?.focus();
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") step(1);
            if (event.key === "ArrowLeft") step(-1);
          }}
        >
          {index !== null && (
            <>
              <DialogTitle className="sr-only">{title}</DialogTitle>
              <DialogDescription className="sr-only">
                {t("photo", { index: index + 1, total })}
              </DialogDescription>
              <div className="relative aspect-[3/2] w-full">
                <Image
                  src={images[index]}
                  alt={`${title} — ${t("photo", { index: index + 1, total })}`}
                  fill
                  sizes="(min-width: 1024px) 1024px, 100vw"
                  className="object-cover"
                />
              </div>
              {total > 1 && (
                <>
                  <GalleryButton
                    label={t("prev")}
                    onClick={() => step(-1)}
                    className="left-3"
                  >
                    <ChevronLeft className="size-6" />
                  </GalleryButton>
                  <GalleryButton
                    label={t("next")}
                    onClick={() => step(1)}
                    className="right-3"
                  >
                    <ChevronRight className="size-6" />
                  </GalleryButton>
                </>
              )}
              <p className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-sm font-medium tabular-nums">
                {index + 1} / {total}
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function GalleryButton({
  label,
  onClick,
  className,
  children,
}: {
  label: string;
  onClick: () => void;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "absolute top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-black/70 focus-visible:ring-3 focus-visible:ring-white/60 focus-visible:outline-none",
        className,
      )}
    >
      {children}
    </button>
  );
}
