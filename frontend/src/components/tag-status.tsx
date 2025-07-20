// Utils
import { cn } from "@/lib/utils";

// Types
type Status = "listed" | "sold" | "canceled";

interface Props {
  status: Status;
}

// Component
export function TagStatus({ status }: Props) {
  const statusStyle = {
    listed: "bg-blue-dark",
    sold: "bg-success",
    canceled: "bg-gray-300",
  };

  const statusText = {
    listed: "ANUNCIADO",
    sold: "VENDIDO",
    canceled: "DESATIVADO",
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
