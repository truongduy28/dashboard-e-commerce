export interface CategoryPayload {
    parentId: string;
    title: string;
    description: string;
    slug: string;
}
interface ICategory {
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
