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
export function slide(isActive: boolean) {
  return cn(
    `transition-all duration-500 ease-out ${isActive ? '' : '-translate-x-full'}`,
  );
}


export function styleByStatus(value : "PAID" | "PENDING" | "DRAFT") {
  if(!value) return cn('')
  
   switch(value) {
    case 'PAID':
      return cn('bg-chart-5/10 text-chart-5')
    case 'PENDING':
      return cn('bg-chart-4/10 text-chart-4')
    case 'DRAFT':
      return cn('bg-secondary-foreground/10 text-secondary-foreground/80')
    default:
      return cn('')
   }

}

export function fixPrice(value: number) {
  return value.toLocaleString('en-US',
   { minimumFractionDigits: 1,
  maximumFractionDigits: 1,}
  )
}

export function fixDate(value: Date) {
  return value.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

