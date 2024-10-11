export interface ISupplier {
  _id: string;
  name: string;
  product: string;
  categories: string[];
  isTaking: number;
  photoUrl: string;
  email: string;
  active: number;
  contact: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  __v: number;
}

export interface SupplierResponse {
  message: string;
  data: ISupplier;
}

export interface SuppliersResponse {
  message: string;
  data: {
    total: number;
    items: ISupplier[];
  };
}
