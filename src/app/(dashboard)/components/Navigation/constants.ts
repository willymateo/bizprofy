import { CreatableStockTypes, ExtraStockTypes } from "@/services/stock/interfaces";
import { STOCK_ROUTES_BY_TYPE } from "../../stock/constants";
import { MenuOption } from "./interfaces";

const MENU_OPTIONS: MenuOption[] = [
  { label: "Dashboard", path: "/", icon: "solar:chart-square-bold-duotone" },
  { label: "Users", path: "/users", icon: "solar:users-group-two-rounded-bold-duotone" },
  { label: "Customers", path: "/customers", icon: "solar:book-2-bold-duotone" },
  { label: "Providers", path: "/providers", icon: "solar:case-round-minimalistic-bold-duotone" },
  { label: "Warehouses", path: "/warehouses", icon: "solar:buildings-bold-duotone" },
  { label: "Products", path: "/products", icon: "solar:bag-heart-bold-duotone" },
  {
    label: "Openning Stock",
    path: `/stock/${STOCK_ROUTES_BY_TYPE[ExtraStockTypes.openingStock]}`,
    icon: "solar:box-bold-duotone",
  },
  {
    label: "Stock In",
    path: `/stock/${STOCK_ROUTES_BY_TYPE[CreatableStockTypes.stockIn]}`,
    icon: "fluent:cube-arrow-curve-down-20-filled",
  },
  {
    label: "Stock Out",
    path: `/stock/${STOCK_ROUTES_BY_TYPE[CreatableStockTypes.stockOut]}`,
    icon: "fluent:box-arrow-up-24-filled",
  },
  {
    label: "Current stock",
    path: `/stock/${STOCK_ROUTES_BY_TYPE[ExtraStockTypes.currentStock]}`,
    icon: "fluent:box-checkmark-24-filled",
  },
];

export { MENU_OPTIONS };
