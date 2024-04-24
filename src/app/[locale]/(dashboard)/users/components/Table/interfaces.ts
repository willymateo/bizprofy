export interface HeaderColumns {
  id: HeaderColumnTypes;
  className?: string;
  label: string;
}

export enum HeaderColumnTypes {
  firstNames,
  createdAt,
  updatedAt,
  lastNames,
  isActive,
  username,
  email,
}

export enum Order {
  desc = "desc",
  asc = "asc",
}
