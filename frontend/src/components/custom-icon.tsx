import {
  AccessIcon,
  AlertCircleIcon,
  ArrowDown01Icon,
  ArrowLeft02Icon,
  ArrowRight02Icon,
  ArrowUp01Icon,
  Calendar04Icon,
  CallIcon,
  Cancel01Icon,
  ChartHistogramIcon,
  ImageUploadIcon,
  Logout01Icon,
  Mail02Icon,
  PackageIcon,
  PlusSignIcon,
  SaleTag02Icon,
  Search01Icon,
  Store04Icon,
  Tick02Icon,
  UnavailableIcon,
  Upload04Icon,
  UserMultipleIcon,
  UserIcon,
  ViewOffIcon,
  ViewIcon,
} from "hugeicons-react";

// Utils
import { cn } from "@/lib/utils";

// Types
export type iconVariants =
  | "access"
  | "alert-cicle"
  | "arrow-down"
  | "arrow-left"
  | "arrow-right"
  | "arrow-up"
  | "calendar"
  | "call"
  | "cancel"
  | "chart-histogram"
  | "image-upload"
  | "logout"
  | "mail"
  | "package"
  | "plus-sign"
  | "sale-tag"
  | "search"
  | "store"
  | "tick"
  | "unavailable"
  | "upload"
  | "user-multiple"
  | "user"
  | "view-off"
  | "view";

interface Props extends React.SVGAttributes<HTMLOrSVGElement> {
  size: number;
  icon: iconVariants;
  className?: string;
}

// Component
export function CustomIcon({ size, icon, className, ...rest }: Props) {
  const IconMap = {
    access: AccessIcon,
    "alert-cicle": AlertCircleIcon,
    "arrow-down": ArrowDown01Icon,
    "arrow-left": ArrowLeft02Icon,
    "arrow-right": ArrowRight02Icon,
    "arrow-up": ArrowUp01Icon,
    calendar: Calendar04Icon,
    call: CallIcon,
    cancel: Cancel01Icon,
    "chart-histogram": ChartHistogramIcon,
    "image-upload": ImageUploadIcon,
    logout: Logout01Icon,
    mail: Mail02Icon,
    package: PackageIcon,
    "plus-sign": PlusSignIcon,
    "sale-tag": SaleTag02Icon,
    search: Search01Icon,
    store: Store04Icon,
    tick: Tick02Icon,
    unavailable: UnavailableIcon,
    upload: Upload04Icon,
    "user-multiple": UserMultipleIcon,
    user: UserIcon,
    "view-off": ViewOffIcon,
    view: ViewIcon,
  };
  const SelectedIcon = IconMap[icon];

  return (
    <SelectedIcon {...rest} className={cn(`shrink-0`, className)} size={size} />
  );
}
