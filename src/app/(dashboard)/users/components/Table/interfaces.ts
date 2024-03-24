export interface HeaderColumns {
  id: HeaderColumnTypes;
  className?: string;
  label: string;
}

export enum HeaderColumnTypes {
  firstNames = "firstNames",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  lastNames = "lastNames",
  isActive = "isActive",
  username = "username",
  photoUrl = "photoUrl",
  email = "email",
  id = "id",
}

export enum Order {
  desc = "desc",
  asc = "asc",
}
