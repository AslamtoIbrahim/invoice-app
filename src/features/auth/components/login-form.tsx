import { Spinner } from '@/shared/components/ui/spinner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { authClient } from '../lib/auth-client';
import { loginSchema } from '../lib/schemas/auth.schema';
import type { Login } from '../lib/types/auth.type';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from './ui/field';
import { Input } from './ui/input';

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [errorForm, setErrorForm] = useState<string | undefined>(undefined);
  const [GoogleLoading, setGoogleLoading] = useState(false);

  const form = useForm<Login>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: Login) {
    setLoading(true);
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
        callbackURL: '/',
      },
      {
        onSuccess: () => {
          setLoading(false);
        },
        onError: (ctx) => {
          setLoading(false);
          if (ctx.error.status === 403) {
            setErrorForm('Please verify your email address');
          } else {
            setErrorForm(ctx.error.message || 'Something went wrong');
          }
        },
      },
    );
  }
  async function onGoogleLogin() {
    setGoogleLoading(true);
    await authClient.signIn.social(
      {
        provider: 'google',
        callbackURL: '/',
      },
      {
        onSuccess: () => {
          setGoogleLoading(false);
        },
        onError: (ctx) => {
          setGoogleLoading(false);
          if (ctx.error.status === 403) {
            setErrorForm('Please verify your email address');
          } else {
            setErrorForm(ctx.error.message || 'Something went wrong');
          }
        },
      },
    );
  }
  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="signup-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="signup-form-email">
                    Email Address
                  </FieldLabel>
                  <Input
                    {...field}
                    id="signup-form-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="example@g.com"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="signup-form-password">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="signup-form-password"
                    aria-invalid={fieldState.invalid}
                    autoComplete="on"
                    type="password"
                    placeholder="*********"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  {errorForm && (
                    <FieldError errors={[{ message: errorForm }]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field>
          <Button
            disabled={loading || GoogleLoading}
            form="signup-form"
            type="submit"
          >
            {loading && <Spinner />}
            Login
          </Button>
          <Button
            onClick={onGoogleLogin}
            disabled={loading || GoogleLoading}
            variant="outline"
            type="button"
          >
            {GoogleLoading && <Spinner />}
            Login with Google
          </Button>
          <FieldDescription className="px-6 text-center">
            Don&apos;t have an account? <Link to="/signup">Sign up</Link>
          </FieldDescription>
        </Field>
      </CardFooter>
    </Card>
  );
}

export default LoginForm;
