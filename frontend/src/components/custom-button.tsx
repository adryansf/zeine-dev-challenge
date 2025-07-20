// Utils
import { cn } from "@/lib/utils";

// Components
import { CustomIcon } from "@/components/custom-icon";

// Types
import type { iconVariants } from "@/components/custom-icon";

type buttonSize = "medium" | "small";
type buttonVariant = "outline" | "solid";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size: buttonSize;
  variant: buttonVariant;
  text: string;
  leftIcon?: iconVariants;
  rightIcon?: iconVariants;
}

// Component
export function CustomButton({
  size,
  variant,
  text,
  leftIcon,
  rightIcon,
  ...rest
}: Props) {
  const sizeStyle = {
    medium: "action-md h-14 gap-3 px-5 py-0",
    small: "action-sm h-10 gap-2 px-4 py-0",
  };

  const variantsStyle = {
    solid: "bg-orange-base hover:bg-orange-dark text-white",
    outline:
      "border border-orange-base text-orange-base hover:text-orange-dark hover:border-orange-dark bg-transparent hover:bg-transparent",
  };

  const sizeIcons = {
    medium: 24,
    small: 20,
  };

  return (
    <button
      {...rest}
      className={cn(
        sizeStyle[size],
        variantsStyle[variant],
        `flex flex-wrap items-center rounded-[10px] cursor-pointer transition-all w-full justify-between [&:not(:has(svg))]:justify-center`,
        rest.className
      )}
    >
      {leftIcon && <CustomIcon icon={leftIcon} size={sizeIcons[size]} />}
      {text}
      {rightIcon && <CustomIcon icon={rightIcon} size={sizeIcons[size]} />}
    </button>
  );
}
