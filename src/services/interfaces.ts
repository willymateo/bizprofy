export interface ErrorResponse {
  error: {
    message?: string;
    name?: string;
  };
}

export enum Order {
  desc = "DESC",
  asc = "ASC",
}

export interface AuditFields {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface SessionPayload extends AuditFields {
  entityPermissions: EntityPermissions;
  firstNames: string;
  lastNames: string;
  username: string;
  photoUrl: string;
  company: Company;
  email: string;
  token: string;
  id: string;
}

export type EntityPermissions = {
  [key: string]: EntityPermission;
};

export type EntityPermission = {
  permissions: Permissions;
  hasAccess: boolean;
};

export type Permissions = {
  [key: string]: boolean;
};

export interface Company extends AuditFields {
  name: string;
  id: string;
}
