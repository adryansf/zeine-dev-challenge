// Utils
import { cn } from "@/lib/utils";

// Types
type Status = "listing" | "sold" | "disabled";

interface Props {
  status: Status;
}

// Component
export function TagStatus({ status }: Props) {
  const statusStyle = {
    listing: "bg-blue-dark",
    sold: "bg-success",
    disabled: "bg-gray-300",
  };

  const statusText = {
    listing: "ANUNCIADO",
    sold: "VENDIDO",
    disabled: "DESATIVADO",
  };

  return (
    <span
      className={cn(
        `label-sm text-white rounded-full px-2 py-1`,
        statusStyle[status]
      )}
    >
      {statusText[status]}
    </span>
  );
}
