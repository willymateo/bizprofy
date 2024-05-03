import { HeaderColumnTypes, HeaderColumns } from "./interfaces";

const HEADER_COLUMNS: HeaderColumns[] = [
  {
    id: HeaderColumnTypes.productCode,
    label: "Product code",
    className: "text-center whitespace-nowrap",
  },
  {
    id: HeaderColumnTypes.productName,
    label: "Product name",
    className: "text-center whitespace-nowrap",
  },
  {
    id: HeaderColumnTypes.currentStock,
    label: "Current stock",
    className: "text-center whitespace-nowrap",
  },
  {
    id: HeaderColumnTypes.unitCost,
    label: "Unit cost",
    className: "text-center whitespace-nowrap font-bold",
  },
  {
    id: HeaderColumnTypes.purchasesNumber,
    label: "Number of purchases",
    className: "text-center whitespace-nowrap",
  },
  {
    id: HeaderColumnTypes.totalCost,
    label: "Total cost",
    className: "text-center whitespace-nowrap font-bold",
  },
  {
    id: HeaderColumnTypes.unitPrice,
    label: "Unit price",
    className: "text-center whitespace-nowrap font-bold",
  },
  {
    id: HeaderColumnTypes.salesNumber,
    label: "Number of sales",
    className: "text-center whitespace-nowrap",
  },
  {
    id: HeaderColumnTypes.totalPrice,
    label: "Total price",
    className: "text-center whitespace-nowrap font-bold",
  },
];

const PAGE_SIZE_OPTIONS: number[] = [5, 10, 25, 50, 100];

export { HEADER_COLUMNS, PAGE_SIZE_OPTIONS };
