import { DefaultModelInstance } from "@/services/interfaces";

export interface Product extends DefaultModelInstance {
  description: string;
  companyId: string;
  unitPrice: number;
  photoUrl: string;
  code: string;
  name: string;
  id: string;
}
