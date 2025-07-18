// Types
import type { ReactNode } from "react";
interface Props {
  children: ReactNode;
}

// Component
export function ProductRoot({ children }: Props) {
  return (
    <article className="flex flex-col gap-1 p-1 bg-white w-full max-w-[322px] rounded-[20px] hover:ring-2 ring-blue-base cursor-pointer transition-all">
      {children}
    </article>
  );
}
