import { cn } from "@/lib/utils";

// Горы и солнце — знак бренда (тот же рисунок лежит в app/icon.svg)
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn("size-9 shrink-0", className)}
    >
      <rect width="32" height="32" rx="9" className="fill-primary" />
      <circle cx="21.5" cy="10.5" r="3" fill="#fff" />
      <path d="M5 24l7.5-10 4.5 6 3-4 7 8z" fill="#fff" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="text-xl font-extrabold tracking-tight">Joldosh</span>
        <span className="mt-0.5 text-[10px] font-bold tracking-[0.25em] uppercase opacity-60">
          travel
        </span>
      </span>
    </span>
  );
}
