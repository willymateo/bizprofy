import { CreatableStockTypes, ExtraStockTypes } from "../../stock/interfaces";
import { STOCK_ROUTES_BY_TYPE } from "../../stock/constants";
import { MenuOption } from "./interfaces";

const MENU_OPTIONS: MenuOption[] = [
  { label: "Dashboard", path: "/", icon: "solar:chart-square-bold-duotone" },
  { label: "Products", path: "/products", icon: "solar:bag-4-bold-duotone" },
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
