import { z } from "zod";

// Одна схема на всё: проверяет данные туров сейчас, а на этапе 4 —
// формы админки и JSON-поля в базе. Типы выводятся из схемы, а не пишутся руками

const slug = z.string().regex(/^[a-z0-9-]+$/, "только латиница, цифры и дефис");

// Текст на двух языках: { ru: "Турция", en: "Turkey" }
export const localizedSchema = z.object({
  ru: z.string().min(1),
  en: z.string().min(1),
});
export type Localized = z.infer<typeof localizedSchema>;

export const TOUR_TYPES = ["beach", "sightseeing", "mountains", "ski"] as const;
export const tourTypeSchema = z.enum(TOUR_TYPES);
export type TourType = z.infer<typeof tourTypeSchema>;

export const destinationSchema = z.object({
  slug,
  name: localizedSchema,
  tagline: localizedSchema,
  image: z.url(),
});
export type Destination = z.infer<typeof destinationSchema>;

const itineraryItemSchema = z
  .object({
    day: z.number().int().positive(),
    // Если пункт программы занимает несколько дней: «Дни 2–7»
    dayTo: z.number().int().positive().optional(),
    title: localizedSchema,
    text: localizedSchema,
  })
  .refine((item) => !item.dayTo || item.dayTo > item.day, {
    message: "dayTo должен быть больше day",
  });

export const tourSchema = z
  .object({
    slug,
    destination: slug,
    type: tourTypeSchema,
    title: localizedSchema,
    summary: localizedSchema,
    description: localizedSchema,
    // Цена в долларах за человека, «от»
    price: z.number().int().positive(),
    // Старая цена — для горящих туров со скидкой
    oldPrice: z.number().int().positive().optional(),
    nights: z.number().int().positive(),
    hot: z.boolean().default(false),
    // Для сортировки «сначала популярные»
    popularity: z.number().int().min(0).max(100),
    images: z.array(z.url()).min(1),
    itinerary: z.array(itineraryItemSchema).min(1),
    included: z.array(localizedSchema),
    excluded: z.array(localizedSchema),
    // Даты вылета в формате 2026-10-12
    departures: z.array(z.iso.date()),
  })
  .refine((tour) => !tour.oldPrice || tour.oldPrice > tour.price, {
    message: "oldPrice должна быть больше price",
  });
export type Tour = z.infer<typeof tourSchema>;
