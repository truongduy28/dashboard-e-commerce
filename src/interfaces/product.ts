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

interface IProduct {
    title: string;
    slug: string;
    description: string;
    categories: string[];
    supplier: string;
    content: string;
    images: string[];
    isDeleted: boolean;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
