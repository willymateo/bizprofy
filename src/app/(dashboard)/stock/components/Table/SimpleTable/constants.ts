import { HeaderColumns } from "./interfaces";

const HEADER_COLUMNS: HeaderColumns[] = [
  {
    id: "productId",
    label: "Product ID",
    className: "text-center whitespace-nowrap",
  },
  {
    id: "productCode",
    label: "Product Code",
    className: "text-center whitespace-nowrap",
  },
  {
    id: "productName",
    label: "Product Name",
    className: "text-center whitespace-nowrap",
  },
  {
    id: "unitCost",
    label: "Unit Cost",
    className: "text-center whitespace-nowrap font-bold",
  },
  {
    id: "unitPrice",
    label: "Unit Price",
    className: "text-center whitespace-nowrap font-bold",
  },
  {
    id: "quantity",
    label: "Quantity",
    className: "text-center whitespace-nowrap",
  },
  {
    id: "totalCost",
    label: "Total Cost",
    className: "text-center whitespace-nowrap font-bold",
  },
  {
    id: "totalPrice",
    label: "Total Price",
    className: "text-center whitespace-nowrap font-bold",
  },
];

const PAGE_SIZE_OPTIONS: number[] = [5, 10, 25, 50, 100];

export { HEADER_COLUMNS, PAGE_SIZE_OPTIONS };
