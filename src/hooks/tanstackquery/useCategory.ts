import { useMutation, useQuery } from "@tanstack/react-query";
import handleAPI from "../../apis/handleApi";
import { ADD_CATEGORY, DELETE_CATEGORY, GET_CATEGORIES, UPDATE_CATEGORY } from "../../constants/endpoint";
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

const useUpdateCategory = (id: string | undefined) => useMutation<any, any, any, any>({
    mutationFn: id ? async (data: CategoryPayload) => await handleAPI(`${UPDATE_CATEGORY}?id=${id}`, data, "put") : undefined,
})

export { useAddCategory, useDeleteCategory, useGetCategories, useUpdateCategory };
