"use client";

import Image from "next/image";

// Hooks
import { useFileUpload } from "@/hooks/use-file-upload";

// Components
import { CustomIcon } from "@/components/custom-icon";

// Types
import type { FileMetadata } from "@/hooks/use-file-upload";

interface Props {
  onUpload: (file: File | FileMetadata) => void;
}

// Component
export function UploadProfilePhoto({ onUpload }: Props) {
  const [{ files }, { openFileDialog, getInputProps }] = useFileUpload({
    accept: "image/*",
    maxFiles: 1,
    maxSize: 5000000, // 5MB
    onFilesChange: (files) => {
      if (files.length > 0) {
        onUpload(files[0].file);
      }
    },
  });

  const previewUrl = files[0]?.preview || null;

  return (
    <div data-preview={!!previewUrl} className="relative inline-flex group">
      <div
        className="relative overflow-hidden bg-shape size-[120px] rounded-[12px] cursor-pointer p-0 shadow-none"
        onClick={openFileDialog}
        aria-label={previewUrl ? "Mudar imagem" : "Carregar imagem"}
      >
        <div
          aria-hidden="true"
          className="hidden group-data-[preview=false]:flex justify-center items-center h-full w-full group-hover:group-data-[preview=true]:absolute group-hover:group-data-[preview=true]:flex group-data-[preview=true]:bg-black/60 transition-all"
        >
          <CustomIcon
            size={32}
            icon="image-upload"
            className="text-orange-base group-data-[preview=true]:text-white"
          />
        </div>
        {previewUrl && (
          <Image
            className="size-full object-cover"
            src={previewUrl}
            alt="Prévia da imagem carregada"
            width={120}
            height={120}
            style={{ objectFit: "cover" }}
          />
        )}
      </div>
      <input
        {...getInputProps()}
        className="sr-only hidden"
        aria-label="Carregar arquivo de imagem"
        tabIndex={-1}
      />
    </div>
  );
}
