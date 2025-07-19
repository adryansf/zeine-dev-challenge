import Image from "next/image";

// Components
import { LoginForm } from "@/components/login-form";
import { CustomButton } from "@/components/custom-button";

export default function Home() {
  return (
    <main className="grid min-h-svh max-h-svh grid-cols-1 lg:grid-cols-12 gap-2">
      <aside className="flex lg:flex-col justify-center items-center lg:items-start lg:col-span-7 p-10">
        <Image
          src="/logo.svg"
          width={267.36}
          height={68.65}
          alt="Marketplace"
        />
        <Image
          src="/background.png"
          width={755}
          height={496}
          alt="background"
          className="object-cover mt-auto mb-auto hidden lg:block"
        />
      </aside>

      {/* Principal */}
      <main className="flex flex-col lg:col-span-5 p-6 gap-2">
        <div className="w-full max-w-full lg:max-w-[563px] bg-white rounded-[32px] px-6 sm:px-10 lg:px-20 py-10 lg:py-[72px] flex flex-col justify-between h-full ">
          <section>
            <h1 className="title-md text-gray-500">Acesse a sua conta</h1>
            <h2 className="font-poppins text-gray-300 text-sm mt-2">
              Informe seu e-mail e senha para entrar
            </h2>

            <LoginForm />
          </section>

          <section className="flex flex-col gap-5 mt-10">
            <p className="body-md text-gray-300">Ainda não tem uma conta ?</p>
            <CustomButton
              variant="outline"
              size="medium"
              text="Cadastrar"
              rightIcon="arrow-right"
            />
          </section>
        </div>
      </main>
    </main>
  );
}
