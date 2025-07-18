// Utils
import { formatMoney } from "@/lib/utils";

// Types
interface Props {
  title: string;
  price: number;
  description?: string;
}

export function ProductInfo({ title, price, description }: Props) {
  return (
    <div className="flex flex-col gap-4 p-3 pb-4">
      <main className="flex gap-4">
        <h2 className="text-gray-400 subtitle w-full">{title}</h2>
        <p className="text-gray-500 font-sans font-bold flex items-baseline gap-1">
          <small className="label-md">R$</small> {formatMoney(price)}
        </p>
      </main>

      <p
        data-description={!!description}
        className="data-[description=false]:hidden line-clamp-2 text-gray-300 body-sm w-full"
      >
        {description}
      </p>
    </div>
  );
}
