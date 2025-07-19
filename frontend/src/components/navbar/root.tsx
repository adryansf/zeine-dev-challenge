// Utils
import { cn } from "@/lib/utils";

// Component
export function NavbarRoot({
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <nav
      {...rest}
      className={cn("flex flex-col md:flex-row gap-2", rest.className)}
    >
      {children}
    </nav>
  );
}
