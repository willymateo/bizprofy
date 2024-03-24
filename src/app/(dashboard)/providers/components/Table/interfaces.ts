export interface HeaderColumns {
  id: HeaderColumnTypes;
  className?: string;
  label: string;
}

export enum HeaderColumnTypes {
  phoneNumber = "phoneNumber",
  firstNames = "firstNames",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  lastNames = "lastNames",
  isActive = "isActive",
  address = "address",
  idCard = "idCard",
  email = "email",
  id = "id",
}

export enum Order {
  desc = "desc",
  asc = "asc",
}
