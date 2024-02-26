export interface ErrorResponse {
  error: {
    message?: string;
    name?: string;
  };
}

export interface LoginPayload {
  emailOrUsername: string;
  password: string;
}

export interface CreateUserPayload {
  companyName: string;
  firstNames: string;
  lastNames: string;
  username: string;
  password: string;
  email: string;
}

export interface CreateProductPayload {
  description: string;
  unitPrice: number;
  code: string;
  name: string;
}

export interface LoginResponse {
  firstNames: string;
  lastNames: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  username: string;
  photoUrl: string;
  company: Company;
  email: string;
  token: string;
  id: string;
}

export interface Company {
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  name: string;
  id: string;
}
