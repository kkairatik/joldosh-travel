"use client";

import {
  createContext,
  use,
  useTransition,
  type ReactNode,
  type TransitionStartFunction,
} from "react";

import { cn } from "@/lib/utils";

type CatalogState = {
  isPending: boolean;
  startTransition: TransitionStartFunction;
};

const CatalogContext = createContext<CatalogState | null>(null);

// Фильтры меняют адрес, а сервер присылает новый список туров. Переход идёт
// внутри transition: старый список остаётся на экране, пока грузится новый,
// а isPending позволяет его приглушить. Сам список рендерится на сервере
// и приходит сюда как children
export function CatalogProvider({ children }: { children: ReactNode }) {
  const [isPending, startTransition] = useTransition();

  return (
    <CatalogContext value={{ isPending, startTransition }}>
      {children}
    </CatalogContext>
  );
}

export function useCatalog() {
  const context = use(CatalogContext);
  if (!context) throw new Error("useCatalog вызван вне CatalogProvider");
  return context;
}

export function CatalogResults({ children }: { children: ReactNode }) {
  const { isPending } = useCatalog();

  return (
    <div
      aria-busy={isPending}
      className={cn(
        "mt-6 transition-opacity duration-200",
        isPending && "pointer-events-none opacity-50",
      )}
    >
      {children}
    </div>
  );
}
