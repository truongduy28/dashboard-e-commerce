import { useMutation, useQuery } from "@tanstack/react-query";
import handleAPI from "../../apis/handleApi";
import {
  ADD_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORIES,
  GET_CATEGORY_FILTERS,
  UPDATE_CATEGORY,
} from "../../constants/endpoint";
import { CategoryPayload, CategoryResponse, GetCategoryFilters } from "../../interfaces/category";

const useAddCategory = () =>
  useMutation<any, any, any, any>({
    mutationFn: async (data: CategoryPayload) =>
      await handleAPI(ADD_CATEGORY, data, "post"),
  });

const useGetCategories = ({ page, size }: { page: number; size: number }) =>
  useQuery<CategoryResponse, any>({
    queryKey: ["get-categories", page, size],
    queryFn: async () =>
      (await handleAPI(
        `${GET_CATEGORIES}?page=${page}&pageSize=${size}`
      )) as unknown as CategoryResponse,
  });

const useDeleteCategory = () =>
  useMutation<any, any, any, any>({
    mutationFn: async ({ id, isDeleted }: { id: string; isDeleted: boolean }) =>
      await handleAPI(
        `${DELETE_CATEGORY}?id=${id}&isDeleted=${isDeleted}`,
        {},
        "delete"
      ),
  });

const useUpdateCategory = (id: string | undefined) =>
  useMutation<any, any, any, any>({
    mutationFn: id
      ? async (data: CategoryPayload) =>
        await handleAPI(`${UPDATE_CATEGORY}?id=${id}`, data, "put")
      : undefined,
  });

const useGetCategoryFilters = () =>
  useQuery<GetCategoryFilters, any>({
    queryKey: ["get-category-filters"],
    queryFn: async () =>
      (await handleAPI(
        GET_CATEGORY_FILTERS
      )) as unknown as GetCategoryFilters,
  });

export {
  useAddCategory,
  useDeleteCategory,
  useGetCategories, useGetCategoryFilters, useUpdateCategory
};

