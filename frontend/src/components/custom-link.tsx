// Components
import { CustomIcon, iconVariants } from "./custom-icon";

// Types
interface Props {
  leftIcon?: iconVariants;
  rightIcon?: iconVariants;
  text: string;
}

// Component
export function CustomLink({ text, leftIcon, rightIcon }: Props) {
  return (
    <a className="text-orange-base hover:text-orange-dark p-0.5 gap-2 flex items-center cursor-pointer transition-all">
      {leftIcon && <CustomIcon icon={leftIcon} size={20} />}
      <p className="action-md">{text}</p>
      {rightIcon && <CustomIcon icon={rightIcon} size={20} />}
    </a>
  );
}
