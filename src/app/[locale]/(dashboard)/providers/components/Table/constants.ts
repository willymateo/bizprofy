import { HeaderColumnTypes, HeaderColumns } from "./interfaces";

const HEADER_COLUMNS: HeaderColumns[] = [
  {
    id: HeaderColumnTypes.firstNames,
    label: "First names",
    className: "text-center whitespace-nowrap",
  },
  {
    id: HeaderColumnTypes.lastNames,
    label: "Last names",
    className: "text-center whitespace-nowrap",
  },
  {
    id: HeaderColumnTypes.companyName,
    label: "Company name",
    className: "text-center whitespace-nowrap",
  },
  {
    id: HeaderColumnTypes.idCard,
    label: "ID card",
    className: "text-center whitespace-nowrap",
  },
  {
    id: HeaderColumnTypes.email,
    label: "Email",
    className: "text-center whitespace-nowrap",
  },
  {
    id: HeaderColumnTypes.phoneNumber,
    label: "Phone number",
    className: "text-center whitespace-nowrap",
  },
  {
    id: HeaderColumnTypes.address,
    label: "Address",
    className: "text-center whitespace-nowrap",
  },
  {
    id: HeaderColumnTypes.isActive,
    label: "Active",
    className: "text-center whitespace-nowrap",
  },
  {
    id: HeaderColumnTypes.createdAt,
    label: "Creation date",
    className: "text-center whitespace-nowrap",
  },
  {
    id: HeaderColumnTypes.updatedAt,
    label: "Last modified date",
    className: "text-center whitespace-nowrap",
  },
];

const PAGE_SIZE_OPTIONS: number[] = [5, 10, 25, 50, 100];

export { HEADER_COLUMNS, PAGE_SIZE_OPTIONS };
