export interface ProductPayload {
  title: string;
  description: string;
  content: string;
  slug: string;
  categories: string[];
  supplier: string;
  images: string[];
  isDeleted: boolean;
}

export interface CreateProductResponse {
  message: string;
  data: IProduct;
}

export interface GetProductsResponse {
  message: string;
  data: {
    total: number;
    items: IProduct[];
    rangePrice: {
      min: number;
      max: number;
    }
  };
}

export interface IProduct {
  title: string;
  slug: string;
  description: string;
  categories: { _id: string; title: string }[];
  supplier: string;
  content: string;
  images: string[];
  isDeleted: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  subProducts: ISubProduct[];
}

export interface SubProductPayload {
  size?: string;
  color?: string;
  price: number;
  qty: number;
  discount?: number;
  productId: string;
  images?: string[];
  isDeleted?: boolean;
}

export interface CreateSubProductResponse {
  message: string;
  data: ISubProduct;
}

export interface ISubProduct {
  size: string;
  color: string;
  price: number;
  qty: number;
  discount: number | null;
  productId: string;
  images: string[];
  isDeleted: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GetDetailProductResponse {
  message: string;
  data: {
    product: IProduct;
    subProducts: ISubProduct[];
  };
}

interface ISubProductFilters {

  sizes: string[];
  colors: string[];
  prices: {
    start: number;
    end: number;
  };

}
export interface ProductFiltersResponse {
  message: string;
  data: ISubProductFilters
}


export interface FilterProductPayload {
  title: string;
  categories: string[];
  colors: string[];
  sizes: string[];
  price: { start: number | null; end: number | null };
}

export interface SubProductDetailResponse {
  message: string;
  item: ISubProduct;
}
