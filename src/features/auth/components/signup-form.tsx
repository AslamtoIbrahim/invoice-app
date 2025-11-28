import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { signUpSchema } from '../lib/schemas/auth.schema';
import type { Singup } from '../lib/types/auth.type';

import { Spinner } from '@/shared/components/spinner';
import { SERVER_URL } from '@/shared/lib/utils';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authClient } from '../lib/auth-client';
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

function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [GoogleLoading, setGoogleLoading] = useState(false);
  const [errorForm, setErrorForm] = useState<string | undefined>(undefined);
  const form = useForm<Singup>({
    resolver: zodResolver(signUpSchema),
  });

  async function onSubmit(data: Singup) {
    setLoading(true);
    await authClient.signUp.email(
      {
        name: data.username,
        email: data.email,
        password: data.password,
        callbackURL: `${SERVER_URL}/login`,
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

  async function onGoogleSignup() {
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
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>
          Create a new account by filling out the form below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="signup-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="signup-form-username">
                    Username
                  </FieldLabel>
                  <Input
                    {...field}
                    id="signup-form-username"
                    aria-invalid={fieldState.invalid}
                    placeholder="Jon Adam"
                    autoComplete="on"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
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
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="signup-form-confirmPassword">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="signup-form-confirmPassword"
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
            Create Account
          </Button>
          <Button
            onClick={onGoogleSignup}
            disabled={loading || GoogleLoading}
            variant="outline"
            type="button"
          >
            {GoogleLoading && <Spinner />}
            Sign up with Google
          </Button>
          <FieldDescription className="px-6 text-center">
            Already have an account? <Link to="/login">Sign in</Link>
          </FieldDescription>
        </Field>
      </CardFooter>
    </Card>
  );
}

export default SignupForm;
