import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getUserNameFromEmail(email: string) {
  return email.split("@")[0]
}

export const apiBase = import.meta.env.VITE_API_BASE;
