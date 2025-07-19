"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormMask } from "use-mask-input";

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
  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });
  const registerWithMask = useHookFormMask(form.register);

  const onSubmit = async (data: RegisterFormSchema) => {
    console.log(data);
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
          text="Cadastrar"
          variant="solid"
          rightIcon="arrow-right"
          className="mt-12"
          type="submit"
        />
      </form>
    </Form>
  );
}
