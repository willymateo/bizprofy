import { Warehouse } from "../warehouses/interfaces";
import { User } from "../users/interfaces";
import { Company } from "../interfaces";

export type LoginPayload = {
  emailOrUsername: string;
  password: string;
};

export type SignUpPayload = {
  companyName: string;
  firstNames: string;
  lastNames: string;
  username: string;
  password: string;
  email: string;
};

export type SignUpResponse = {
  warehouse: Warehouse;
  company: Company;
  user: User;
};

export type VerifyEmailPayload = {
  token: string;
};

export type VerifyEmailResponse = {
  message: string;
};
