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
