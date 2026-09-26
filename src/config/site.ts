// Базовые настройки и контакты. NEXT_PUBLIC_* подставляются на этапе сборки (см. .env.example)
export const siteConfig = {
  name: "Joldosh",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+996 312 000 000",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "996312000000",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@joldosh.example",
};

// label — ключ из messages/*.json → Nav
export const mainNav = [
  { href: "/tours", label: "tours" },
  { href: "/destinations", label: "destinations" },
  { href: "/about", label: "about" },
  { href: "/contacts", label: "contacts" },
] as const;

export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}
