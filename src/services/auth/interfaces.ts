import { Warehouse } from "../warehouses/interfaces";
import { User } from "../users/interfaces";
import { Company } from "../interfaces";

export interface LoginPayload {
  emailOrUsername: string;
  password: string;
}

export interface SignUpPayload {
  companyName: string;
  firstNames: string;
  lastNames: string;
  username: string;
  password: string;
  email: string;
}

export interface SignUpResponse {
  warehouse: Warehouse;
  company: Company;
  user: User;
}
