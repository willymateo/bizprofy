import { MenuOption } from "./interfaces";

const MENU_OPTIONS: MenuOption[] = [
  { label: "Dashboard", href: "/", icon: "solar:chart-2-bold-duotone" },
  { label: "Openning Stock", href: "/stock/openning", icon: "fluent:box-24-filled" },
  { label: "Stock In", href: "/stock/in", icon: "fluent:cube-arrow-curve-down-20-filled" },
  { label: "Stock Out", href: "/stock/out", icon: "fluent:box-arrow-up-24-filled" },
  { label: "Current stock", href: "/stock/current", icon: "fluent:box-checkmark-24-filled" },
];

export { MENU_OPTIONS };
