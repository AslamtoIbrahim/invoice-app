import { BACKEND_URL } from '@/shared/lib/utils';
import { createAuthClient } from 'better-auth/react';
export const authClient = createAuthClient({
  baseURL: BACKEND_URL, // The base URL of your auth server
});
