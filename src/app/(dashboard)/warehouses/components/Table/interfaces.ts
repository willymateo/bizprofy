export interface HeaderColumns {
  id: HeaderColumnTypes;
  className?: string;
  label: string;
}

export enum HeaderColumnTypes {
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  isActive = "isActive",
  code = "code",
  name = "name",
  id = "id",
}

export enum Order {
  desc = "desc",
  asc = "asc",
}
