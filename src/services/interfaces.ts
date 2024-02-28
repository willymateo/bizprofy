export interface ErrorResponse {
  error: {
    message?: string;
    name?: string;
  };
}

export interface DefaultModelInstance {
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
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

export interface LoginResponse extends DefaultModelInstance {
  firstNames: string;
  lastNames: string;
  username: string;
  photoUrl: string;
  company: Company;
  email: string;
  token: string;
  id: string;
}

export interface Company extends DefaultModelInstance {
  name: string;
  id: string;
}
