import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export const SERVER_URL = 'http://localhost:5173';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function animate(isActive: boolean) {
  return cn(
    `transition-all duration-300 ease-in-out ${isActive ? 'visible opacity-100 scale-100' : 'invisible opacity-0 scale-70'}`,
  );
}
