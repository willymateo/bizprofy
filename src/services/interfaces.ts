export interface ErrorResponse {
  error: {
    message?: string;
    name?: string;
  };
}

export enum Order {
  desc = "desc",
  asc = "asc",
}

export interface AuditFields {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface SessionPayload extends AuditFields {
  firstNames: string;
  lastNames: string;
  username: string;
  photoUrl: string;
  company: Company;
  email: string;
  token: string;
  id: string;
}

export interface Company extends AuditFields {
  name: string;
  id: string;
}
