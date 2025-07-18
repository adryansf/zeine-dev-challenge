// Utils
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

// Types
interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  text: string;
  children?: ReactNode;
}

// Component
export function CustomLabel({ text, ...rest }: Props) {
  return (
    <label
      {...rest}
      className={cn(
        `label-md text-gray-300 group-focus-within:text-orange-base`,
        rest.className
      )}
    >
      {text}
    </label>
  );
}
