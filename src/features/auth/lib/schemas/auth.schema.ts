import z from 'zod';

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(4, 'Username must be at least 4 characters long')
      .max(20, 'Username must be at most 20 characters long'),
    email: z.email(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(20, 'Password must be at most 20 characters long'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});
