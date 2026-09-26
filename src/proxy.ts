import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

// Определяет язык посетителя и добавляет его в адрес: / → /ru или /en
export default createMiddleware(routing);

export const config = {
  // Всё, кроме API, служебных путей Next.js/Vercel и файлов с расширением (картинки, favicon и т. п.)
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
