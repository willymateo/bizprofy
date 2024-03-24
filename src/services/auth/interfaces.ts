import { Company } from "../interfaces";
import { User } from "../users/interfaces";

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
  company: Company;
  user: User;
}
