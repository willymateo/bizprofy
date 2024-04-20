export interface HeaderColumns {
  id: HeaderColumnTypes;
  className?: string;
  label: string;
}

export enum HeaderColumnTypes {
  phoneNumber,
  firstNames,
  createdAt,
  updatedAt,
  lastNames,
  isActive,
  address,
  idCard,
  email,
}

export enum Order {
  desc = "desc",
  asc = "asc",
}
