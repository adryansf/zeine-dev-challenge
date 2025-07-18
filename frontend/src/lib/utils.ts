import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMoney(value: number) {
  return Intl.NumberFormat("pt-BR", {
    style: "decimal",
    minimumFractionDigits: 2,
  }).format(value);
}
