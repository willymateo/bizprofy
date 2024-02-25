import { MenuOption } from "./interfaces";

const MENU_OPTIONS: MenuOption[] = [
  { label: "Dashboard", path: "/", icon: "solar:chart-2-bold-duotone" },
  { label: "Openning Stock", path: "/stock/openning", icon: "fluent:box-24-filled" },
  { label: "Stock In", path: "/stock/in", icon: "fluent:cube-arrow-curve-down-20-filled" },
  { label: "Stock Out", path: "/stock/out", icon: "fluent:box-arrow-up-24-filled" },
  { label: "Current stock", path: "/stock/current", icon: "fluent:box-checkmark-24-filled" },
];

export { MENU_OPTIONS };
