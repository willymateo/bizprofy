import { AuditFields } from "@/services/interfaces";

export interface Product extends AuditFields {
  description: string;
  companyId: string;
  unitPrice: number;
  unitCost: number;
  photoUrl: string;
  code: string;
  name: string;
  id: string;
}
