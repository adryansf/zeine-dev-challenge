import { redirect } from "next/navigation";
import { getBetterAuthSession } from "@/lib/get-better-auth-session";
import { Header } from "@/components/header";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getBetterAuthSession();

  if (session.error || !session.data) {
    return redirect("/");
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
}
