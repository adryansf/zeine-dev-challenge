import React from "react";

// Utils
import { cn } from "@/lib/utils";

// Types
interface Props extends React.HTMLProps<HTMLSpanElement> {
  text: string;
}

// Component
export function Tag({ text, ...rest }: Props) {
  return (
    <span
      {...rest}
      className={cn(
        `bg-gray-400 label-sm text-white rounded-full px-2 py-1`,
        rest.className
      )}
    >
      {text}
    </span>
  );
}
