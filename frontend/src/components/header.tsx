"use client";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Libs
import { authClient } from "@/lib/auth-client";

// Components
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UserMenu } from "@/components/user-menu";
import { CustomButton } from "@/components/custom-button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Types
import type { INavItemAttributes } from "./navbar/navbar-item";

const navigationLinks: INavItemAttributes[] = [
  { href: "/dashboard", label: "Dashboard", icon: "chart-histogram" },
  { href: "/produtos", label: "Produtos", icon: "package" },
];

// Component
export function Header() {
  const { data } = authClient.useSession();
  const router = useRouter();

  const pathname = usePathname();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <header className="border-b px-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex flex-1 items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <Navbar.Root>
                {navigationLinks.map((link, index) => (
                  <Navbar.Item
                    key={`middle-nav-${index}`}
                    {...link}
                    active={pathname === link.href}
                  />
                ))}
              </Navbar.Root>
            </PopoverContent>
          </Popover>
          {/* Logo */}
          <div className="flex items-center">
            <Image src="/logo2.svg" width={53} height={40} alt="Marketplace" />
          </div>
        </div>
        {/* Middle area */}
        <Navbar.Root className="max-md:hidden">
          {navigationLinks.map((link, index) => (
            <Navbar.Item
              key={`middle-nav-${index}`}
              {...link}
              active={pathname === link.href}
            />
          ))}
        </Navbar.Root>
        {/* Right side */}
        <div className="flex flex-1 items-center justify-end gap-2">
          <Tooltip delayDuration={7000}>
            <TooltipTrigger>
              <Link className="max-w-[157px]" href="/produtos/novo">
                <CustomButton
                  text="Novo Produto"
                  size="small"
                  variant="solid"
                  leftIcon="plus-sign"
                  className="flex-row"
                />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Tá esperando o quê? Boraa moeer!! 🚀</p>
            </TooltipContent>
          </Tooltip>

          <div className="relative">
            <UserMenu
              image={data?.user.image || ""}
              name={data?.user.name || ""}
              handleLogout={handleLogout}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
