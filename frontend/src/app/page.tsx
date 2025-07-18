import Image from "next/image";

export default function Home() {
  return (
    <div className="grid min-h-svh lg:grid-cols-12 gap-2">
      <div className="hidden lg:flex lg:flex-col justify-center col-span-7 p-10">
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
          className="object-cover mt-auto mb-auto"
        />
      </div>
      <div className="flex flex-col col-span-5">
        <div className="w-full max-w-xs">{/* <LoginForm /> */}</div>
      </div>
    </div>
  );
}
