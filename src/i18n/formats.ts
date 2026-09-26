import type { Formats } from "next-intl";

// Именованные форматы: format.number(690, "price") → «690 $» в ru и «$690» в en
export const formats = {
  number: {
    price: {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    },
  },
  dateTime: {
    departure: { day: "numeric", month: "long" },
    departureFull: { day: "numeric", month: "long", year: "numeric" },
  },
} satisfies Formats;
