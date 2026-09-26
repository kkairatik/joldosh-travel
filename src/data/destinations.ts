import { unsplash } from "@/lib/images";
import { destinationSchema } from "@/lib/tours/schema";

// Порядок здесь — порядок в фильтрах и на странице «Направления»
export const destinations = destinationSchema.array().parse([
  {
    slug: "turkey",
    name: { ru: "Турция", en: "Turkey" },
    tagline: {
      ru: "Море, «всё включено» и Стамбул",
      en: "The sea, all-inclusive and Istanbul",
    },
    image: unsplash("photo-1641128324972-af3212f0f6bd", 1200),
  },
  {
    slug: "uae",
    name: { ru: "ОАЭ", en: "UAE" },
    tagline: {
      ru: "Небоскрёбы, пляжи и пустыня",
      en: "Skyscrapers, beaches and the desert",
    },
    image: unsplash("photo-1708361089093-beef4c4584e7", 1200),
  },
  {
    slug: "egypt",
    name: { ru: "Египет", en: "Egypt" },
    tagline: {
      ru: "Красное море и коралловые рифы",
      en: "The Red Sea and coral reefs",
    },
    image: unsplash("photo-1681158077449-77f23f629f0d", 1200),
  },
  {
    slug: "thailand",
    name: { ru: "Таиланд", en: "Thailand" },
    tagline: {
      ru: "Острова, массаж и тайская кухня",
      en: "Islands, massage and Thai food",
    },
    image: unsplash("photo-1542370512244-4a99a9ab9e28", 1200),
  },
  {
    slug: "vietnam",
    name: { ru: "Вьетнам", en: "Vietnam" },
    tagline: {
      ru: "Тихое море и прямые рейсы",
      en: "A calm sea and direct flights",
    },
    image: unsplash("photo-1621094305060-081171d1c171", 1200),
  },
  {
    slug: "georgia",
    name: { ru: "Грузия", en: "Georgia" },
    tagline: {
      ru: "Горы, вино и гостеприимство",
      en: "Mountains, wine and hospitality",
    },
    image: unsplash("photo-1577701122197-c9607038bd90", 1200),
  },
  {
    slug: "maldives",
    name: { ru: "Мальдивы", en: "Maldives" },
    tagline: {
      ru: "Виллы над водой и белый песок",
      en: "Overwater villas and white sand",
    },
    image: unsplash("photo-1505228395891-9a51e7e86bf6", 1200),
  },
  {
    slug: "kyrgyzstan",
    name: { ru: "Кыргызстан", en: "Kyrgyzstan" },
    tagline: {
      ru: "Иссык-Куль, юрты и горы",
      en: "Issyk-Kul, yurts and mountains",
    },
    image: unsplash("photo-1675157935545-c71d8e8b943d", 1200),
  },
]);
