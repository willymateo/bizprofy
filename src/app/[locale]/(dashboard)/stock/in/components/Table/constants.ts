import { HeaderColumnTypes, HeaderColumns } from "./interfaces";

const HEADER_COLUMNS: HeaderColumns[] = [
  {
    id: HeaderColumnTypes.transactionDate,
    label: "Date",
    className: "text-center whitespace-nowrap",
  },
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
    id: HeaderColumnTypes.providerName,
    label: "Provider name",
    className: "text-center whitespace-nowrap",
  },
  {
    id: HeaderColumnTypes.providerEmail,
    label: "Provider email",
    className: "text-center whitespace-nowrap",
  },
  {
    id: HeaderColumnTypes.unitCost,
    label: "Unit cost",
    className: "text-center whitespace-nowrap font-bold",
  },
  {
    id: HeaderColumnTypes.quantity,
    label: "Quantity",
    className: "text-center whitespace-nowrap",
  },
  {
    id: HeaderColumnTypes.totalCost,
    label: "Total cost",
    className: "text-center whitespace-nowrap font-bold",
  },
];

const PAGE_SIZE_OPTIONS: number[] = [5, 10, 25, 50, 100];

export { HEADER_COLUMNS, PAGE_SIZE_OPTIONS };
