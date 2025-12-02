import { cn } from "@/shared/lib/utils";
import type { Items } from "../types/item.type";
import type { Status } from "../types/status.type";

export function calcTotal(items: Items[]) {
    return items.reduce((sum, item) => sum + (Number(item.qty) * Number(item.price)), 0)

}


export function styleByStatus(value : Status) {
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
  const date = new Date(value)
  if (isNaN(date.getTime())) {
    return ""
  }
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

export function generateInvoiceCode() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '0123456789';

  const L = () => letters[Math.floor(Math.random() * letters.length)];
  const N = () => digits[Math.floor(Math.random() * digits.length)];

  return `${L()}${L()}${N()}${N()}${N()}${N()}`;
}
