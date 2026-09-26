import "server-only";

import { render, toPlainText } from "@react-email/components";
import { Resend } from "resend";
import { z } from "zod";

import { BookingEmail, type BookingEmailProps } from "./email";

// Секреты читаются только на сервере; префикса NEXT_PUBLIC_ нет,
// поэтому в браузер ключ не попадёт
const mailEnvSchema = z.object({
  RESEND_API_KEY: z.string().min(1),
  BOOKING_EMAIL_TO: z.email(),
  // Пока у сайта нет своего домена, отправитель — тестовый адрес Resend
  BOOKING_EMAIL_FROM: z
    .string()
    .min(1)
    .default("Joldosh <onboarding@resend.dev>"),
});

type SendOptions = BookingEmailProps & {
  // Менеджер нажмёт «Ответить» — и письмо уйдёт туристу
  replyTo?: string;
};

export async function sendBookingEmail({ replyTo, ...email }: SendOptions) {
  const env = mailEnvSchema.safeParse(process.env);

  if (!env.success) {
    // Локально без ключа форма всё равно работает: заявка выводится в консоль
    if (process.env.NODE_ENV !== "production") {
      console.info(
        "[booking] Resend не настроен, письмо не отправлено:",
        email,
      );
      return;
    }
    throw new Error(
      "Resend не настроен: нет RESEND_API_KEY или BOOKING_EMAIL_TO",
    );
  }

  const html = await render(BookingEmail(email));
  const resend = new Resend(env.data.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: env.data.BOOKING_EMAIL_FROM,
    to: env.data.BOOKING_EMAIL_TO,
    replyTo,
    subject: email.subject,
    html,
    text: toPlainText(html),
  });

  if (error) throw new Error(`Resend: ${error.message}`);
}
