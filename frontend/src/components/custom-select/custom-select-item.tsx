"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";

// Utils
import { cn } from "@/lib/utils";

// Components
import { CustomIcon } from "@/components/custom-icon";

// Component
export function CustomSelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "hover:text-orange-dark data-[state=checked]:text-orange-base px-4 text-gray-300 body-sm relative flex w-full cursor-pointer items-center outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50  *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2 h-12",
        className
      )}
      {...props}
    >
      <span className="flex items-center justify-between w-full">
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        <SelectPrimitive.ItemIndicator>
          <CustomIcon icon="tick" size={24} className="text-orange-base" />
        </SelectPrimitive.ItemIndicator>
      </span>
    </SelectPrimitive.Item>
  );
}
