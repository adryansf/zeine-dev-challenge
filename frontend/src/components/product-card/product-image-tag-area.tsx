// Types
import type { ReactNode } from "react";
interface Props {
  children: ReactNode;
}

// Component
export function ProductImageTagArea({ children }: Props) {
  return <div className="absolute top-2 right-2 flex gap-1">{children}</div>;
}
