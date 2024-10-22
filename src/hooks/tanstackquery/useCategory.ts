import { useMutation, useQuery } from "@tanstack/react-query";
import handleAPI from "../../apis/handleApi";
import { ADD_CATEGORY, DELETE_CATEGORY, GET_CATEGORIES } from "../../constants/endpoint";
import { CategoryPayload, CategoryResponse } from "../../interfaces/category";

const useAddCategory = () => useMutation<any, any, any, any>({
    mutationFn: async (data: CategoryPayload) => await handleAPI(ADD_CATEGORY, data, "post"),
})

const useGetCategories = ({ page, size }: { page: number, size: number }) => useQuery<CategoryResponse, any>({
    queryKey: ["get-categories", page, size],
    queryFn: async () => await handleAPI(`${GET_CATEGORIES}?page=${page}&pageSize=${size}`) as unknown as CategoryResponse,
})

const useDeleteCategory = () => useMutation<any, any, any, any>({
    mutationFn: async ({ id, isDeleted }: { id: string, isDeleted: boolean }) => await handleAPI(`${DELETE_CATEGORY}?id=${id}&isDeleted=${isDeleted}`, {}, "delete"),
})

export { useAddCategory, useDeleteCategory, useGetCategories };
