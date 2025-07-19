import Link from "next/link";

// Utils
import { cn } from "@/lib/utils";

// Components
import { CustomIcon } from "@/components/custom-icon";

// Types
import type { iconVariants } from "@/components/custom-icon";

export interface INavItemAttributes {
  icon?: iconVariants;
  label: string;
  href: string;
  active?: boolean;
}

interface Props
  extends Omit<React.ComponentProps<typeof Link>, "href">,
    INavItemAttributes {}

// Component
export function NavbarItem({
  icon,
  label,
  href,
  active = false,
  ...rest
}: Props) {
  return (
    <Link
      href={href}
      data-active={!!active}
      className={cn(
        "flex items-center gap-2 px-4 h-10 rounded-[10px] transition-all data-[active=true]:bg-shape data-[active=true]:text-orange-base text-gray-300 hover:text-orange-base",
        rest.className
      )}
      {...rest}
    >
      {icon && <CustomIcon size={20} icon={icon} />}
      <span className="body-sm">{label}</span>
    </Link>
  );
}
