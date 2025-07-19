"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

// Libs
import { authClient } from "@/lib/auth-client";
import { betterAuthErrorMessage } from "@/lib/better-auth-error-message";

// Validator
import { LoginFormSchema, loginFormSchema } from "./validator";

// Components
import { Form } from "@/components/ui/form";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { CustomFormInput } from "@/components/custom-form-input";
import { CustomButton } from "@/components/custom-button";

// Component
export function LoginForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async ({ email, password }: LoginFormSchema) => {
    await authClient.signIn.email({
      email,
      password,
      callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
      rememberMe: true,
      fetchOptions: {
        onError: (ctx) => {
          toast.error(betterAuthErrorMessage(ctx.error));
          setLoading(false);
        },
        onSuccess: () => {
          setLoading(false);
        },
        onRequest: () => {
          setLoading(true);
        },
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12">
        <div className="flex flex-col gap-5">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CustomFormInput
                    label="E-mail"
                    icon="mail"
                    placeholder="Seu e-mail cadastrado"
                    type="email"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Senha */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CustomFormInput
                    label="Senha"
                    icon="access"
                    placeholder="Sua senha de acesso"
                    type="password"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <CustomButton
          size="medium"
          text="Acessar"
          variant="solid"
          rightIcon="arrow-right"
          className="mt-12"
          type="submit"
          disabled={loading}
        />
      </form>
    </Form>
  );
}
