"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormMask } from "use-mask-input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Store
import { useAuthStore } from "@/store/auth-store";

// Orval
import { patchApiUsersPhotoUpload } from "@/orval/users/users";

// Libs
import { authClient } from "@/lib/auth-client";
import { betterAuthErrorMessage } from "@/lib/better-auth-error-message";

// Validator
import { registerFormSchema, RegisterFormSchema } from "./validator";

// Components
import { Form } from "@/components/ui/form";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { CustomFormInput } from "@/components/custom-form-input";
import { CustomButton } from "@/components/custom-button";
import { UploadProfilePhoto } from "@/components/upload-profile-photo";
import { CustomFormMessage } from "@/components/custom-form-message";

// Component
export function RegisterForm() {
  const router = useRouter();

  const { setToken } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });
  const registerWithMask = useHookFormMask(form.register);

  const onSubmit = async ({
    email,
    password,
    name,
    phone,
    profile,
  }: RegisterFormSchema) => {
    const file = profile as File;

    await authClient.signUp.email({
      name,
      phone,
      email,
      password,
      fetchOptions: {
        onError: (ctx) => {
          toast.error(betterAuthErrorMessage(ctx.error));
          setLoading(false);
        },
        onSuccess: async (ctx) => {
          const authToken = ctx.response.headers.get("set-auth-token") || "";
          setToken(authToken);
          // Upload photo
          await patchApiUsersPhotoUpload(
            {
              file,
            },
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );

          setLoading(false);
          router.push("/dashboard");
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
        <div className="gap-12 flex flex-col">
          {/* Perfil */}
          <div className="flex flex-col gap-5">
            <h2 className="title-sm text-gray-500">Perfil</h2>
            <FormField
              control={form.control}
              name="profile"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <UploadProfilePhoto
                        onUpload={field.onChange}
                        {...field}
                      />
                      <CustomFormMessage />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Nome */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomFormInput
                      label="Nome"
                      icon="user"
                      placeholder="Seu nome completo"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Telefone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomFormInput
                      label="Telefone"
                      icon="call"
                      placeholder="(00) 00000-0000"
                      {...field}
                      {...registerWithMask("phone", ["(99) 99999-9999"], {
                        required: true,
                      })}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Acesso */}
          <div className="flex flex-col gap-5">
            <h2 className="title-sm text-gray-500">Acesso</h2>
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

            {/* Confirmar Senha */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomFormInput
                      label="Confirmar senha"
                      icon="access"
                      placeholder="Confirme a senha"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <CustomButton
          size="medium"
          text={loading ? "Cadastrando..." : "Cadastrar"}
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
