import { MenuOption } from "./interfaces";
import { ENTITIES } from "@/constants";

const MENU_OPTIONS: MenuOption[] = [
  { label: "Dashboard", path: "/", icon: "solar:chart-square-bold-duotone" },
  {
    label: "Users",
    path: "/users",
    icon: "solar:users-group-two-rounded-bold-duotone",
    entity: ENTITIES.USERS,
  },
  {
    label: "Customers",
    path: "/customers",
    icon: "solar:user-hand-up-bold-duotone",
    entity: ENTITIES.CUSTOMERS,
  },
  {
    label: "Providers",
    path: "/providers",
    icon: "solar:case-round-minimalistic-bold-duotone",
    entity: ENTITIES.PROVIDERS,
  },
  {
    label: "Warehouses",
    path: "/warehouses",
    icon: "solar:buildings-bold-duotone",
    entity: ENTITIES.WAREHOUSES,
  },
  {
    label: "Products",
    path: "/products",
    icon: "solar:bag-heart-bold-duotone",
    entity: ENTITIES.PRODUCTS,
  },
  {
    label: "Product categories",
    path: "/products/categories",
    icon: "solar:bag-smile-bold-duotone",
    entity: ENTITIES.PRODUCTS,
  },
  {
    label: "Stock in",
    path: `/stock/in`,
    icon: "fluent:cube-arrow-curve-down-20-filled",
    entity: ENTITIES.STOCK,
  },
  {
    label: "Stock out",
    path: `/stock/out`,
    icon: "fluent:box-arrow-up-24-filled",
    entity: ENTITIES.STOCK,
  },
  {
    label: "Current stock",
    path: `/stock/current`,
    icon: "fluent:box-checkmark-24-filled",
    entity: ENTITIES.STOCK,
  },
];

export { MENU_OPTIONS };
