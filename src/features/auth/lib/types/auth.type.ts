import z from 'zod';
import type { loginSchema, signUpSchema } from '../schemas/auth.schema';

export type Singup = z.infer<typeof signUpSchema>;

export type Login = z.infer<typeof loginSchema>;

export type User = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null | undefined;
};
