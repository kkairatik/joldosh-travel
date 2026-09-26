import { notFound } from "next/navigation";

// Любой неизвестный адрес внутри /ru или /en → локализованная страница 404
// с шапкой и футером (app/[locale]/not-found.tsx)
export default function CatchAllPage() {
  notFound();
}
