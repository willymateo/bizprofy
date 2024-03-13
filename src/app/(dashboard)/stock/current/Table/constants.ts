import { HeaderColumnTypes, HeaderColumns } from "./interfaces";

const HEADER_COLUMNS: HeaderColumns[] = [
  {
    id: HeaderColumnTypes.productId,
    label: "Product ID",
    className: "text-center whitespace-nowrap",
  },
  {
    id: HeaderColumnTypes.productCode,
    label: "Product Code",
    className: "text-center whitespace-nowrap",
  },
  {
    id: HeaderColumnTypes.productName,
    label: "Product Name",
    className: "text-center whitespace-nowrap",
  },
  {
    id: HeaderColumnTypes.purchasesNumber,
    label: "Number of Purchases",
    className: "text-center whitespace-nowrap",
  },
  {
    id: HeaderColumnTypes.unitCost,
    label: "Unit Cost",
    className: "text-center whitespace-nowrap font-bold",
  },
  {
    id: HeaderColumnTypes.totalCost,
    label: "Total Cost",
    className: "text-center whitespace-nowrap font-bold",
  },
  {
    id: HeaderColumnTypes.salesNumber,
    label: "Number of Sales",
    className: "text-center whitespace-nowrap",
  },
  {
    id: HeaderColumnTypes.unitPrice,
    label: "Unit Price",
    className: "text-center whitespace-nowrap font-bold",
  },
  {
    id: HeaderColumnTypes.totalPrice,
    label: "Total Price",
    className: "text-center whitespace-nowrap font-bold",
  },
];

const PAGE_SIZE_OPTIONS: number[] = [5, 10, 25, 50, 100];

export { HEADER_COLUMNS, PAGE_SIZE_OPTIONS };
