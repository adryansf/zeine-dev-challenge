import Image from "next/image";

// Types
import type { ReactNode } from "react";

interface Props {
  src?: string | null;
  alt?: string;
  children?: ReactNode;
}

// Component
export function ProductImage({
  src = "",
  children,
  alt = "Imagem do Produto",
}: Props) {
  return (
    <header className="w-full h-full flex max-h-36 relative">
      {src && (
        <Image
          src={src}
          alt={alt}
          height={144}
          width={322}
          className="rounded-[16px]"
        />
      )}
      {!src && (
        <div className="bg-gray-200 w-full h-36 rounded-[16px] flex text-white justify-center items-center">
          Sem imagem
        </div>
      )}

      {children}
    </header>
  );
}
