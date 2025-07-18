"use client";
import { useId, useState } from "react";

// Components
import { Select, SelectContent } from "@/components/ui/select";
import { CustomSelectTrigger } from "./custom-select-trigger";
import { CustomSelectItem } from "./custom-select-item";

// Types
import type { iconVariants } from "../custom-icon";

interface IOption {
  label: string;
  value: string;
}

interface Props extends React.ComponentProps<typeof Select> {
  label: string;
  placeholder?: string;
  className?: string;
  icon?: iconVariants;
  options: IOption[];
}

// Component
export function CustomSelect({
  label,
  icon,
  options,
  placeholder = "",
  className = "",
  onValueChange,
  defaultValue = "",
  ...rest
}: Props) {
  const id = useId();
  const [value, setValue] = useState(defaultValue);

  const handleValueChange = (newValue: string) => {
    if (onValueChange) onValueChange(newValue);
    setValue(newValue);
  };

  const clearValue = () => {
    setValue("");
  };

  return (
    <Select onValueChange={handleValueChange} value={value} {...rest}>
      {/* Trigger and Label */}
      <CustomSelectTrigger
        id={id}
        clearValue={clearValue}
        label={label}
        placeholder={placeholder}
        icon={icon}
      />

      {/* Content */}
      <SelectContent
        position="item-aligned"
        side="bottom"
        data-icon={!!icon}
        className="py-2 bg-white border-1 border-shape rounded-[8px] mt-16 data-[icon=true]:-ml-3.5 ml-4.5"
      >
        {options.map((option) => (
          <CustomSelectItem value={option.value} key={option.value}>
            <span className={`truncate`}>{option.label}</span>
          </CustomSelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
