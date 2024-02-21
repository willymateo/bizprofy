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
  firstNames: string;
  lastNames: string;
  password: string;
  username: string;
  email: string;
}

export interface LoginResponse {
  firstNames: string;
  lastNames: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  username: string;
  photoUrl: string;
  email: string;
  id: string;
}
