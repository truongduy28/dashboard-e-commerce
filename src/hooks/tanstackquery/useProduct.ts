import { useMutation, useQuery } from "@tanstack/react-query";
import handleAPI from "../../apis/handleApi";
import {
  ADD_PRODUCT,
  ADD_SUB_PRODUCT,
  DELETE_PRODUCT,
  DELETE_SUB_PRODUCT,
  GET_PRODUCT,
  GET_PRODUCT_DETAIL,
  GET_SUB_PRODUCT_DETAIL,
  GET_SUB_PRODUCT_FILTERS,
  UPDATE_PRODUCT,
  UPDATE_SUB_PRODUCT,
} from "../../constants/endpoint";
import {
  CreateProductResponse,
  CreateSubProductResponse,
  FilterProductPayload,
  GetDetailProductResponse,
  GetProductsResponse,
  ProductFiltersResponse,
  ProductPayload,
  SubProductDetailResponse,
  SubProductPayload,
} from "../../interfaces/product";

export const useCreateProduct = () =>
  useMutation<CreateProductResponse, any, ProductPayload, any>({
    mutationFn: async (data: ProductPayload) =>
      (await handleAPI(
        ADD_PRODUCT,
        data,
        "post"
      )) as unknown as Promise<CreateProductResponse>,
  });

export const useUpdateProduct = (id: string | null) =>
  useMutation<{ message: string }, any, ProductPayload, any>({
    mutationFn: async (data: ProductPayload) =>
      (await handleAPI(
        `${UPDATE_PRODUCT}?id=${id}`,
        data,
        "put"
      )) as unknown as Promise<{ message: string }>,
  });

export const useGetProducts = ({
  page,
  size,
  filters
}: {
  page: number;
  size: number;
  filters?: FilterProductPayload
}) =>
  useQuery<any, any, GetProductsResponse>({
    queryKey: ["get-products", page, size, filters],
    queryFn: async () =>
      await handleAPI(
        `${GET_PRODUCT}?page=${page || 1}&pageSize=${size || 999999}`, undefined, 'get', { ...filters, price: filters?.price.end ? JSON.stringify(filters?.price) : undefined }
      ),
    refetchOnWindowFocus: false,
  });

export const useGetProductDetail = (id: string | null) =>
  useQuery<any, any, GetDetailProductResponse, any>({
    queryKey: ["get-product-detail", id],
    queryFn: !!id
      ? async () => await handleAPI(`${GET_PRODUCT_DETAIL}?id=${id}`)
      : () => { },
    refetchOnWindowFocus: false,
  });

export const useCreateSubProduct = () =>
  useMutation<CreateSubProductResponse, any, SubProductPayload, any>({
    mutationFn: async (data: SubProductPayload) =>
      (await handleAPI(
        ADD_SUB_PRODUCT,
        data,
        "post"
      )) as unknown as Promise<CreateSubProductResponse>,
  });

export const useUpdateSubProduct = (id: string | undefined) =>
  useMutation<{ message: string }, any, SubProductPayload, any>({
    mutationFn: async (data: SubProductPayload) =>
      (await handleAPI(
        `${UPDATE_SUB_PRODUCT}?id=${id}`,
        data,
        "put"
      )) as unknown as Promise<{ message: string }>,
  })

export const useDeleteProduct = (id: string | null) =>
  useMutation<{ message: string }, any, undefined, any>({
    mutationFn: async () =>
      (await handleAPI(
        `${DELETE_PRODUCT}?id=${id}`,
        {},
        "delete"
      )) as unknown as Promise<{ message: string }>,
  });

export const useGetSubProductFilters = () => useQuery<ProductFiltersResponse, any>({
  queryKey: ["get-sub-product-filters"],
  queryFn: async () => await handleAPI(GET_SUB_PRODUCT_FILTERS) as unknown as ProductFiltersResponse,
  refetchOnWindowFocus: false,
});

export const useGetSubProductDetail = (id: string | undefined) =>
  useQuery<any, any, SubProductDetailResponse, any>({
    queryKey: ["get-sub-product-detail", id],
    queryFn: !!id
      ? async () => await handleAPI(`${GET_SUB_PRODUCT_DETAIL}?id=${id}`)
      : () => { },
    refetchOnWindowFocus: false,
  });

export const useDeleteSubProduct = (id: string | undefined) =>
  useMutation<{ message: string }, any, undefined, any>({
    mutationFn: async () =>
      (await handleAPI(
        `${DELETE_SUB_PRODUCT}?id=${id}`,
        {},
        "delete"
      )) as unknown as Promise<{ message: string }>,
  });