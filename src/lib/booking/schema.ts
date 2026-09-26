import { z } from "zod";

import { routing } from "@/i18n/routing";

// Сообщения об ошибках — ключи из messages/*.json → Booking.errors.
// Сервер переводит их на язык страницы, с которой отправили форму
export const BOOKING_ERRORS = [
  "nameShort",
  "nameLong",
  "phone",
  "email",
  "commentLong",
  "whenLong",
  "date",
  "invalid",
] as const;
export type BookingErrorKey = (typeof BOOKING_ERRORS)[number];

export const CONTACT_METHODS = ["whatsapp", "call", "telegram"] as const;

const slug = z.string().regex(/^[a-z0-9-]+$/);

// Пустое поле формы приходит строкой "" — превращаем её в undefined
const optional = <T extends z.ZodType>(schema: T) =>
  z.preprocess(
    (value) => (value === "" ? undefined : value),
    schema.optional(),
  );

// Оставляем только цифры: «+996 (700) 12-34-56» → «996700123456»
export function phoneDigits(phone: string) {
  return phone.replace(/\D/g, "");
}

// Номер в международном формате для ссылок tel: и wa.me.
// Местные форматы Кыргызстана (0700 123 456 и 700 123 456) дополняем кодом 996
export function internationalPhone(phone: string) {
  const digits = phoneDigits(phone);
  if (digits.length === 10 && digits.startsWith("0"))
    return `996${digits.slice(1)}`;
  if (digits.length === 9) return `996${digits}`;
  return digits;
}

export const bookingSchema = z
  .object({
    locale: z.enum(routing.locales),
    kind: z.enum(["tour", "general"]),
    tour: optional(slug),
    destination: optional(slug),
    date: optional(z.iso.date()),
    when: optional(z.string().trim().max(100, "whenLong")),
    adults: z.coerce.number().int().min(1).max(10),
    children: z.coerce.number().int().min(0).max(6),
    name: z.string().trim().min(2, "nameShort").max(80, "nameLong"),
    phone: z
      .string()
      .trim()
      .refine((value) => {
        const length = phoneDigits(value).length;
        return length >= 9 && length <= 15;
      }, "phone"),
    email: optional(z.email("email")),
    contact: z.enum(CONTACT_METHODS),
    comment: optional(z.string().trim().max(1000, "commentLong")),
  })
  .refine((data) => data.kind === "general" || data.tour, {
    path: ["tour"],
    message: "invalid",
  });

export type Booking = z.infer<typeof bookingSchema>;

// Что форма получает от сервера после отправки
export type BookingState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      message: string;
      fieldErrors: Partial<Record<string, string>>;
      // Введённые значения возвращаются, чтобы форма не очищалась при ошибке
      values: Record<string, string>;
    };
