import { HeaderColumnTypes, HeaderColumns } from "./interfaces";

const HEADER_COLUMNS: HeaderColumns[] = [
  {
    id: HeaderColumnTypes.transactionDate,
    label: "Date",
    className: "text-center whitespace-nowrap",
  },
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
    id: HeaderColumnTypes.unitCost,
    label: "Unit Cost",
    className: "text-center whitespace-nowrap font-bold",
  },
  {
    id: HeaderColumnTypes.unitPrice,
    label: "Unit Price",
    className: "text-center whitespace-nowrap font-bold",
  },
  {
    id: HeaderColumnTypes.quantity,
    label: "Quantity",
    className: "text-center whitespace-nowrap",
  },
  {
    id: HeaderColumnTypes.totalCost,
    label: "Total Cost",
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
