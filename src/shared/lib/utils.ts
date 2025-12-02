import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export const FRONTEND_URL = 'http://localhost:5173';
// export const BACKEND_URL = 'http://localhost:3000';
export const BACKEND_URL = 'https://invoice-server-steel.vercel.app';

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
    `transition-all duration-500 ease-out ${isActive ? 'visible' : '-translate-x-full invisible'}`,
  );
}



export const dashboardVariants = {
      initial: { x: '-100vw' }, 
      in: { x: 0 },           
      out: { x: '100vw' } ,  
  };

export const detailVariants = {
      initial: { x: '100vw' },  
      in: { x: 0 },          
      out: { x: '-100vw' } ,  
};

export const containerAnime = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.10 // ⌚ time it takse to show
    },
  },
}

export const itemAnime = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
};