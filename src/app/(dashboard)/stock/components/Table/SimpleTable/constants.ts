import { HeaderColumns } from "./interfaces";

const HEADER_COLUMNS: HeaderColumns[] = [
  {
    id: "productId",
    label: "Product ID",
  },
  {
    id: "productCode",
    label: "Product Code",
  },
  {
    id: "productName",
    label: "Product Name",
  },
  {
    id: "unitPrice",
    label: "Unit Price",
    className: "font-bold",
  },
  {
    id: "quantity",
    label: "Quantity",
  },
  {
    id: "totalPrice",
    label: "Total Price",
    className: "font-bold",
  },
];

const PAGE_SIZE_OPTIONS: number[] = [5, 10, 25, 50, 100];

export { HEADER_COLUMNS, PAGE_SIZE_OPTIONS };
