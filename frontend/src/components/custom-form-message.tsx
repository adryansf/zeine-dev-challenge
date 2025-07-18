"use client";
// Utils
import { cn } from "@/lib/utils";

// Components
import { useFormField } from "@/components/ui/form";
import { CustomIcon } from "@/components/custom-icon";

// Component
export function CustomFormMessage({
  className,
  ...props
}: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : props.children;

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-danger body-xs flex gap-1 py-1.5", className)}
      {...props}
    >
      <CustomIcon size={16} icon="alert-cicle" />
      {body}
    </p>
  );
}
