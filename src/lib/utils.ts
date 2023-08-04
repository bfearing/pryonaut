import { editions, sets } from "@/data/data";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSet(s: string) {
  const set = sets.find((set) => set.value === s);

  if (!set) {
    return null;
  }

  return set.label;
}

export function getEdition(ed: string) {
  const edition = editions.find((edition) => edition.value === ed);

  if (!edition) {
    return null;
  }

  return edition.label;
}
