import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Check if an AI response contains the inline projects trigger */
export function containsProjectTrigger(text: string): boolean {
  return /\[PROJECTS_INLINE\]/i.test(text);
}

/** Check if an AI response contains the inline about card trigger */
export function containsAboutTrigger(text: string): boolean {
  return /\[ABOUT_INLINE\]/i.test(text);
}

/** Check if an AI response contains the inline contact card trigger */
export function containsContactTrigger(text: string): boolean {
  return /\[CONTACT_INLINE\]/i.test(text);
}

/** Clean all internal trigger tokens from any message before displaying */
export function cleanMessage(content: string): string {
  return content
    .replace(/\[PROJECTS_INLINE\]/gi, "")
    .replace(/\[ABOUT_INLINE\]/gi, "")
    .replace(/\[CONTACT_INLINE\]/gi, "")
    .replace(/SHOW_PROJECTS/gi, "")
    .replace(/SHOW_ABOUT/gi, "")
    .replace(/SHOW_CONTACT/gi, "")
    .trim();
}
