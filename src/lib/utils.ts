import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export * from "./utils/format-date";
export * from "./utils/format-time";
export * from "./utils/slugify";
export * from "./utils/clipboard";
export * from "./utils/share";
export * from "./utils/url";
