import Image from "next/image";

// Types
import type { ReactNode } from "react";

interface Props {
  src: string;
  alt?: string;
  children?: ReactNode;
}

// Component
export function ProductImage({
  src,
  children,
  alt = "Imagem do Produto",
}: Props) {
  return (
    <header className="w-full h-full flex max-h-36 relative">
      <Image
        src={src}
        alt={alt}
        height={144}
        width={322}
        className="rounded-[16px]"
      />
      {children}
    </header>
  );
}
