// Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CustomIcon } from "./custom-icon";

// Types
interface Props {
  name: string;
  image: string;
}

// Component
export function UserMenu({ name, image }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto p-0 hover:bg-transparent cursor-pointer"
        >
          <Avatar className="size-12 border border-shape rounded-[12px]">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback>
              {name.substring(0, 3).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="max-w-64 rounded-[12px] bg-white px-4 py-4 gap-5 flex flex-col"
        align="end"
      >
        <DropdownMenuLabel className="flex min-w-0 gap-3 items-center">
          <Avatar className="size-8 border border-shape rounded-[8px]">
            <AvatarImage src={image} alt={name} />
          </Avatar>
          <span className="body-sm text-gray-300 w-[34px]">{name}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-shape" />
        <DropdownMenuItem className="text-orange-base flex justify-between action-sm gap-2 p-0.5 hover:bg-transparent focus:bg-transparent focus:text-orange-base cursor-pointer">
          <span>Sair</span>
          <CustomIcon size={20} icon="logout" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
