import { siteConfig } from "@/config/site";

// Ссылка на чат в WhatsApp с заранее заполненным сообщением
export function whatsappHref(text?: string) {
  const base = `https://wa.me/${siteConfig.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function phoneHref(phone: string = siteConfig.phone) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
