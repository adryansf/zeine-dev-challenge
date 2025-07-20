"use client";

import { useState } from "react";

// Utils
import { cn } from "@/lib/utils";

// Components
import { CustomLabel } from "./custom-label";
import { CustomIcon } from "@/components/custom-icon";
import { CustomFormMessage } from "@/components/custom-form-message";
import { useFormField } from "@/components/ui/form";

// Types
import { iconVariants } from "@/components/custom-icon";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: iconVariants;
  label?: string;
  name: string;
}

// Component
export function CustomFormInput({
  label = "",
  icon,
  type = "text",
  placeholder = "",
  ...rest
}: Props) {
  const [show, setShow] = useState(false);

  const handleButton = () => setShow((value) => !value);

  const { error } = useFormField();

  return (
    <div className="grid w-full group">
      {/* Label */}
      {label && <CustomLabel text={label} htmlFor={rest.name} />}
      {/* Input */}
      <div className="flex gap-2 items-center py-3.5 px-0.5 border-b-1 border-gray-100 group-focus-within:border-gray-400 group-has-[input:not(:placeholder-shown)]:border-gray-400 flex-row-reverse w-full">
        {/* View Pass */}
        <button
          data-type={type}
          className="cursor-pointer data-[type='password']:block hidden"
          onClick={handleButton}
          title="Visualizar Senha"
          type="button"
        >
          <CustomIcon
            className="text-gray-300"
            icon={show ? "view-off" : "view"}
            size={24}
          />
        </button>

        {/* Input */}
        <input
          {...rest}
          placeholder={placeholder}
          className={cn(
            `peer placeholder:text-gray-200 body-md flex-1 outline-0 caret-orange-base`,
            rest.className
          )}
          type={show ? "text" : type}
        />

        {/* Custom Left Icon */}
        {icon && (
          <CustomIcon
            data-error={!!error}
            className="text-orange-base peer-placeholder-shown:text-gray-200 group-focus-within:peer-placeholder-shown:text-orange-base data-[error=true]:text-danger"
            icon={icon}
            size={24}
          />
        )}
      </div>

      <CustomFormMessage />
    </div>
  );
}
