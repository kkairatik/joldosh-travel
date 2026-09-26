"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import {
  useActionState,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { WhatsAppIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { submitBooking } from "@/lib/booking/actions";
import { CONTACT_METHODS, type BookingState } from "@/lib/booking/schema";
import { whatsappHref } from "@/lib/contacts";
import { cn } from "@/lib/utils";

type Option = { value: string; label: string };

export type BookingFormProps = (
  | { kind: "tour"; tour: { slug: string; dates: Option[] } }
  | { kind: "general"; destinations: Option[] }
) & {
  // В окне бронирования после отправки показываем «Закрыть»
  onClose?: () => void;
};

// Обёртка пересоздаёт форму по кнопке «Отправить ещё одну заявку»:
// так сбрасывается и состояние useActionState
export function BookingForm(props: BookingFormProps) {
  const [attempt, setAttempt] = useState(0);
  return (
    <BookingFormInner
      key={attempt}
      {...props}
      onAgain={() => setAttempt((value) => value + 1)}
    />
  );
}

const initialState: BookingState = { status: "idle" };
const inputClass = "h-11 rounded-xl px-3.5 text-[15px] md:text-[15px]";

function BookingFormInner(props: BookingFormProps & { onAgain: () => void }) {
  const t = useTranslations("Booking");
  const tWhatsApp = useTranslations("WhatsApp");
  const locale = useLocale();
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const startedAtRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const [state, formAction, pending] = useActionState(
    submitBooking,
    initialState,
  );

  const errors = state.status === "error" ? state.fieldErrors : {};
  // После ошибки React очищает форму — возвращаем то, что человек уже ввёл
  const values = state.status === "error" ? state.values : {};

  // Время открытия формы нужно для защиты от ботов. Ставим его в браузере
  // после загрузки: на сервере и в браузере Date.now() не совпал бы
  useEffect(() => {
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now());
  }, []);

  // Фокус — на первое поле с ошибкой или на заголовок «Заявка отправлена»
  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
    if (state.status === "error") {
      formRef.current
        ?.querySelector<HTMLElement>("[aria-invalid=true]")
        ?.focus();
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center py-6 text-center">
        <CheckCircle2 className="size-14 text-primary" aria-hidden="true" />
        <h3
          ref={successRef}
          tabIndex={-1}
          className="mt-4 text-2xl font-extrabold outline-none"
        >
          {t("successTitle")}
        </h3>
        <p className="mt-2 max-w-sm text-muted-foreground">
          {t("successText")}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild variant="outline" size="pill">
            <a
              href={whatsappHref(tWhatsApp("greeting"))}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              {t("successWhatsApp")}
            </a>
          </Button>
          {props.onClose ? (
            <Button size="pill" onClick={props.onClose}>
              {t("close")}
            </Button>
          ) : (
            <Button size="pill" onClick={props.onAgain}>
              {t("again")}
            </Button>
          )}
        </div>
      </div>
    );
  }

  const field = (name: string) => ({
    id: `${id}-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id}-${name}-error` : undefined,
  });

  return (
    <form ref={formRef} action={formAction} className="grid gap-4" noValidate>
      <input type="hidden" name="locale" defaultValue={locale} />
      <input type="hidden" name="kind" defaultValue={props.kind} />
      {props.kind === "tour" && (
        <input type="hidden" name="tour" defaultValue={props.tour.slug} />
      )}
      <input
        type="hidden"
        name="startedAt"
        ref={startedAtRef}
        defaultValue=""
      />
      {/* Ловушка для ботов: человек это поле не видит и не заполняет */}
      <div aria-hidden="true" className="hidden">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {props.kind === "tour" ? (
        <Field id={`${id}-date`} label={t("date")} error={errors.date}>
          <NativeSelect
            {...field("date")}
            size="lg"
            className="w-full"
            defaultValue={values.date ?? props.tour.dates[0]?.value ?? ""}
          >
            {props.tour.dates.map((date) => (
              <NativeSelectOption key={date.value} value={date.value}>
                {date.label}
              </NativeSelectOption>
            ))}
            <NativeSelectOption value="">{t("dateOther")}</NativeSelectOption>
          </NativeSelect>
        </Field>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            id={`${id}-destination`}
            label={t("destination")}
            error={errors.destination}
          >
            <NativeSelect
              {...field("destination")}
              size="lg"
              className="w-full"
              defaultValue={values.destination ?? ""}
            >
              <NativeSelectOption value="">
                {t("destinationAny")}
              </NativeSelectOption>
              {props.destinations.map((destination) => (
                <NativeSelectOption
                  key={destination.value}
                  value={destination.value}
                >
                  {destination.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </Field>
          <Field id={`${id}-when`} label={t("when")} error={errors.when}>
            <Input
              {...field("when")}
              className={inputClass}
              placeholder={t("whenPlaceholder")}
              maxLength={100}
              defaultValue={values.when}
            />
          </Field>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Field id={`${id}-adults`} label={t("adults")} error={errors.adults}>
          <NativeSelect
            {...field("adults")}
            size="lg"
            className="w-full"
            defaultValue={values.adults ?? "2"}
          >
            {Array.from({ length: 10 }, (_, index) => index + 1).map(
              (count) => (
                <NativeSelectOption key={count} value={count}>
                  {count}
                </NativeSelectOption>
              ),
            )}
          </NativeSelect>
        </Field>
        <Field
          id={`${id}-children`}
          label={t("children")}
          error={errors.children}
        >
          <NativeSelect
            {...field("children")}
            size="lg"
            className="w-full"
            defaultValue={values.children ?? "0"}
          >
            {Array.from({ length: 7 }, (_, index) => index).map((count) => (
              <NativeSelectOption key={count} value={count}>
                {count}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${id}-name`} label={t("name")} error={errors.name}>
          <Input
            {...field("name")}
            className={inputClass}
            placeholder={t("namePlaceholder")}
            autoComplete="name"
            required
            minLength={2}
            maxLength={80}
            defaultValue={values.name}
          />
        </Field>
        <Field id={`${id}-phone`} label={t("phone")} error={errors.phone}>
          <Input
            {...field("phone")}
            className={inputClass}
            type="tel"
            inputMode="tel"
            placeholder={t("phonePlaceholder")}
            autoComplete="tel"
            required
            defaultValue={values.phone}
          />
        </Field>
      </div>

      <Field
        id={`${id}-email`}
        label={t("email")}
        hint={t("optional")}
        error={errors.email}
      >
        <Input
          {...field("email")}
          className={inputClass}
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
          defaultValue={values.email}
        />
      </Field>

      <fieldset className="grid gap-2">
        <legend className="mb-2 text-sm font-medium">{t("contact")}</legend>
        <div className="flex flex-wrap gap-2">
          {CONTACT_METHODS.map((method) => (
            <label
              key={method}
              className="cursor-pointer rounded-full border border-input px-4 py-2 text-sm font-medium transition-colors has-checked:border-primary has-checked:bg-accent has-checked:text-accent-foreground has-focus-visible:ring-3 has-focus-visible:ring-ring/50"
            >
              <input
                type="radio"
                name="contact"
                value={method}
                defaultChecked={method === (values.contact ?? "whatsapp")}
                className="sr-only"
              />
              {t(`contactMethods.${method}`)}
            </label>
          ))}
        </div>
      </fieldset>

      <Field
        id={`${id}-comment`}
        label={t("comment")}
        hint={t("optional")}
        error={errors.comment}
      >
        <Textarea
          {...field("comment")}
          className="min-h-24 rounded-xl px-3.5 text-[15px] md:text-[15px]"
          placeholder={t("commentPlaceholder")}
          maxLength={1000}
          defaultValue={values.comment}
        />
      </Field>

      {state.status === "error" && (
        <p
          role="alert"
          className="rounded-xl bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive"
        >
          {state.message}
        </p>
      )}

      <Button type="submit" size="xl" disabled={pending} className="w-full">
        {pending && <Loader2 className="animate-spin" aria-hidden="true" />}
        {pending ? t("submitting") : t("submit")}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        {t("privacy")}
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-1.5", className)}>
      <Label htmlFor={id}>
        {label}
        {hint && (
          <span className="font-normal text-muted-foreground">· {hint}</span>
        )}
      </Label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
