import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ensureHtmlFormat(text: string): string {
  if (!text) return "";
  if (text.trim().startsWith("<") && text.trim().endsWith(">")) {
    return text;
  }
  return `<p>${text}</p>`;
}
