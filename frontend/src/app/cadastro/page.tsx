import Image from "next/image";
import Link from "next/link";

// Components
import { RegisterForm } from "@/components/register-form";
import { CustomButton } from "@/components/custom-button";

export default function Register() {
  return (
    <main className="grid min-h-svh max-h-svh grid-cols-1 lg:grid-cols-12 gap-2">
      <aside className="flex lg:flex-col justify-center items-center lg:items-start lg:col-span-7 p-10">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/logo.svg"
            width={267.36}
            height={68.65}
            alt="Marketplace"
          />
        </Link>
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
            <h1 className="title-md text-gray-500">Crie sua conta</h1>
            <h2 className="font-poppins text-gray-300 text-sm mt-2">
              Informe os seus dados pessoais e de acesso
            </h2>

            <RegisterForm />
          </section>

          <section className="flex flex-col gap-5 mt-10">
            <p className="body-md text-gray-300">Já tem uma conta ?</p>
            <Link href="/">
              <CustomButton
                variant="outline"
                size="medium"
                text="Acessar"
                rightIcon="arrow-right"
              />
            </Link>
          </section>
        </div>
      </main>
    </main>
  );
}
