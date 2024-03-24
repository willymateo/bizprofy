import { HeaderColumnTypes, HeaderColumns } from "./interfaces";

const HEADER_COLUMNS: HeaderColumns[] = [
  {
    id: HeaderColumnTypes.id,
    label: "ID",
    className: "text-center whitespace-nowrap",
  },
  {
    id: HeaderColumnTypes.idCard,
    label: "ID Card",
    className: "text-center whitespace-nowrap",
  },
  {
    id: HeaderColumnTypes.firstNames,
    label: "First Names",
    className: "text-center whitespace-nowrap",
  },
  {
    id: HeaderColumnTypes.lastNames,
    label: "Last Names",
    className: "text-center whitespace-nowrap",
  },
  {
    id: HeaderColumnTypes.email,
    label: "Email",
    className: "text-center whitespace-nowrap font-bold",
  },
  {
    id: HeaderColumnTypes.phoneNumber,
    label: "Phone Number",
    className: "text-center whitespace-nowrap font-bold",
  },
  {
    id: HeaderColumnTypes.address,
    label: "Address",
    className: "text-center whitespace-nowrap font-bold",
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
