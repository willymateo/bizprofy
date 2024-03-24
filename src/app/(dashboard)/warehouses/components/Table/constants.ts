import { HeaderColumnTypes, HeaderColumns } from "./interfaces";

const HEADER_COLUMNS: HeaderColumns[] = [
  {
    id: HeaderColumnTypes.id,
    label: "ID",
    className: "text-center whitespace-nowrap",
  },
  {
    id: HeaderColumnTypes.code,
    label: "Code",
    className: "text-center whitespace-nowrap",
  },
  {
    id: HeaderColumnTypes.name,
    label: "Name",
    className: "text-center whitespace-nowrap",
  },
  {
    id: HeaderColumnTypes.isActive,
    label: "Active",
    className: "text-center whitespace-nowrap font-bold",
  },
  {
    id: HeaderColumnTypes.createdAt,
    label: "Creation date",
    className: "text-center whitespace-nowrap font-bold",
  },
  {
    id: HeaderColumnTypes.updatedAt,
    label: "Last modified date",
    className: "text-center whitespace-nowrap font-bold",
  },
];

const PAGE_SIZE_OPTIONS: number[] = [5, 10, 25, 50, 100];

export { HEADER_COLUMNS, PAGE_SIZE_OPTIONS };
