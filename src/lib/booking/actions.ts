"use server";

import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";

import { getSiteUrl } from "@/config/site";
import { routing } from "@/i18n/routing";
import type { Destination, Tour } from "@/lib/tours/schema";
import { getDestinationMap, getTourBySlug } from "@/lib/tours/queries";

import type { BookingEmailProps } from "./email";
import { sendBookingEmail } from "./mailer";
import {
  BOOKING_ERRORS,
  bookingSchema,
  internationalPhone,
  type Booking,
  type BookingErrorKey,
  type BookingState,
} from "./schema";

// Человек не успеет заполнить форму быстрее, а бот — легко
const MIN_FILL_TIME_MS = 3000;

// Server Action — по сути публичный POST-эндпоинт: проверяем всё, что пришло,
// и ничему из формы не доверяем. Защиту от CSRF Next.js добавляет сам —
// сравнивает заголовки Origin и Host
export async function submitBooking(
  _previous: BookingState,
  formData: FormData,
): Promise<BookingState> {
  const values = Object.fromEntries(
    [...formData].filter(
      (entry): entry is [string, string] => typeof entry[1] === "string",
    ),
  );
  const locale = hasLocale(routing.locales, values.locale)
    ? values.locale
    : routing.defaultLocale;
  // next/root-params в Server Actions недоступен, поэтому язык передаётся явно
  const t = await getTranslations({ locale, namespace: "Booking" });
  const failure = (fieldErrors: Record<string, string> = {}) =>
    ({
      status: "error",
      message: t(
        Object.keys(fieldErrors).length ? "errors.check" : "errors.send",
      ),
      fieldErrors,
      values,
    }) satisfies BookingState;

  // Скрытое поле website видят только боты. Им отвечаем «успех», чтобы они
  // не подбирали обход, но письмо не отправляем
  const startedAt = Number(values.startedAt);
  if (
    values.website ||
    (startedAt && Date.now() - startedAt < MIN_FILL_TIME_MS)
  ) {
    return { status: "success" };
  }

  const parsed = bookingSchema.safeParse(values);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key: BookingErrorKey = BOOKING_ERRORS.includes(
        issue.message as BookingErrorKey,
      )
        ? (issue.message as BookingErrorKey)
        : "invalid";
      fieldErrors[String(issue.path[0])] ??= t(`errors.${key}`);
    }
    return failure(fieldErrors);
  }
  const booking = parsed.data;

  // Тур и дату берём из наших данных, а не из формы — их нельзя подменить
  const tour = booking.tour ? await getTourBySlug(booking.tour) : undefined;
  if (booking.kind === "tour" && !tour) return failure();
  if (tour && booking.date && !tour.departures.includes(booking.date)) {
    return failure({ date: t("errors.date") });
  }
  const destination = booking.destination
    ? (await getDestinationMap())[booking.destination]
    : undefined;

  try {
    await sendBookingEmail({
      ...buildEmail(booking, tour, destination),
      replyTo: booking.email,
    });
  } catch (error) {
    console.error("[booking] не удалось отправить письмо", error);
    return failure();
  }

  return { status: "success" };
}

const CONTACT_LABELS: Record<Booking["contact"], string> = {
  whatsapp: "WhatsApp",
  call: "звонок",
  telegram: "Telegram",
};

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Bishkek",
  }).format(new Date(iso));

function buildEmail(
  booking: Booking,
  tour: Tour | undefined,
  destination: Destination | undefined,
): BookingEmailProps {
  const phone = internationalPhone(booking.phone);
  const date = booking.date ? formatDate(booking.date) : undefined;
  const travelers =
    `взрослых: ${booking.adults}` +
    (booking.children ? `, детей: ${booking.children}` : "");

  // Без кавычек вокруг названия: в названиях туров уже бывают «ёлочки»
  const subject = tour
    ? `Заявка на тур — ${tour.title.ru}${date ? `, ${date}` : ""}`
    : `Заявка на подбор тура${destination ? ` — ${destination.name.ru}` : ""}`;

  const rows: BookingEmailProps["rows"] = tour
    ? [
        {
          label: "Тур",
          value: tour.title.ru,
          href: `${getSiteUrl()}/ru/tours/${tour.slug}`,
        },
        { label: "Дата вылета", value: date ?? "другая дата — уточнить" },
        { label: "Цена", value: `от ${tour.price} $ за человека` },
      ]
    : [
        {
          label: "Направление",
          value: destination?.name.ru ?? "не выбрано — нужен совет",
        },
        ...(booking.when ? [{ label: "Когда", value: booking.when }] : []),
      ];

  rows.push(
    { label: "Туристы", value: travelers },
    { label: "Имя", value: booking.name },
    { label: "Телефон", value: `+${phone}`, href: `tel:+${phone}` },
    {
      label: "WhatsApp",
      value: `wa.me/${phone}`,
      href: `https://wa.me/${phone}`,
    },
    ...(booking.email
      ? [
          {
            label: "Email",
            value: booking.email,
            href: `mailto:${booking.email}`,
          },
        ]
      : []),
    { label: "Как связаться", value: CONTACT_LABELS[booking.contact] },
    {
      label: "Язык сайта",
      value: booking.locale === "ru" ? "русский" : "английский",
    },
    {
      label: "Отправлено",
      value: new Intl.DateTimeFormat("ru-RU", {
        dateStyle: "long",
        timeStyle: "short",
        timeZone: "Asia/Bishkek",
      }).format(new Date()),
    },
  );

  return { subject, rows, comment: booking.comment };
}
