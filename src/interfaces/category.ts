export interface CategoryPayload {
    parentId: string;
    title: string;
    description: string;
    slug: string;
}
export interface ICategory {
    _id: string;
    title: string;
    parentId: string;
    slug: string;
    description: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

export interface CategoryResponse {
    message: string;
    data: ICategory[];
};

interface MiniCategory {
    _id: string;
    title: string;
    parentId: string;
}

export interface GetCategoryFilters {
    message: string;
    data: MiniCategory[];
}