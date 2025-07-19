"use client";

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
export function UploadProductPhoto({ onUpload }: Props) {
  const [{ files }, { openFileDialog, getInputProps }] = useFileUpload({
    accept: "image/*",
    maxFiles: 1,
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
        className="relative overflow-hidden bg-shape w-[300px] h-[246px]  sm:w-[415px] sm:h-[340px] rounded-[12px] cursor-pointer p-0 shadow-none"
        onClick={openFileDialog}
        aria-label={previewUrl ? "Mudar imagem" : "Carregar imagem"}
      >
        <div
          aria-hidden="true"
          className="hidden flex-col group-data-[preview=false]:flex group-hover:group-data-[preview=true]:absolute group-hover:group-data-[preview=true]:flex justify-center items-center h-full w-full  group-data-[preview=true]:bg-black/60 transition-all gap-4"
        >
          <CustomIcon
            size={32}
            icon="image-upload"
            className="text-orange-base group-data-[preview=true]:text-white"
          />
          <p className="body-sm w-[159px] text-center text-gray-300 group-data-[preview=true]:text-white">
            Selecione a imagem do produto
          </p>
        </div>
        {previewUrl && (
          <img
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
