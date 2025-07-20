"use client";
import * as React from "react";

// Utils
import { cn } from "@/lib/utils";

// Components
import { CustomIcon } from "@/components/custom-icon";
import { CustomLabel } from "../custom-label";
import { SelectValue } from "../ui/select";
import * as SelectPrimitive from "@radix-ui/react-select";

// Types
import type { iconVariants } from "@/components/custom-icon";

interface Props extends React.ComponentProps<typeof SelectPrimitive.Trigger> {
  clearValue: () => void;
  label?: string;
  icon?: iconVariants;
  placeholder: string;
}

// Component
export function CustomSelectTrigger({
  className,
  clearValue,
  label = "",
  placeholder,
  icon,
}: Props) {
  const defaultClass = `border-gray-400 data-[placeholder]:border-gray-100 px-0.5 py-3.5 border-b-1 cursor-pointer 
  group-focus:border-gray-400 data-[placeholder]:text-gray-200 flex items-center justify-between bg-transparent 
  whitespace-nowrap outline-none *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex 
  *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 body-md`;

  return (
    <div className="flex w-full flex-col items-start">
      {label && (
        <SelectPrimitive.Trigger data-slot="select-trigger" className="group">
          <CustomLabel
            text={label}
            className="group-data-[state=open]:text-orange-base"
          />
        </SelectPrimitive.Trigger>
      )}

      <div className="flex w-full px-0.5 cursor-pointer relative">
        <SelectPrimitive.Trigger
          data-slot="select-trigger"
          className={cn(
            defaultClass,
            "w-full justify-between gap-2 group",
            className
          )}
        >
          {/* Custom Left Icon */}
          {icon && (
            <CustomIcon
              className="text-orange-base group-data-[state=open]:text-orange-base group-data-[placeholder]:text-gray-200"
              icon={icon}
              size={24}
            />
          )}
          <SelectValue placeholder={placeholder} />
          <SelectPrimitive.Icon asChild>
            <CustomIcon
              icon="arrow-down"
              size={24}
              className="transition-transform duration-200 group-data-[state=open]:rotate-180 text-gray-300 ml-auto"
            />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <div className="px-0.5 py-3.5">
          <button
            className="p-1 rounded-full bg-shape cursor-pointer absolute right-10"
            onClick={clearValue}
          >
            <CustomIcon icon="cancel" size={16} className="text-gray-300" />
          </button>
        </div>
      </div>
    </div>
  );
}
