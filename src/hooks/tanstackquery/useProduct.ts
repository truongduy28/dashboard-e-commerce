import { useMutation, useQuery } from "@tanstack/react-query";
import handleAPI from "../../apis/handleApi";
import { ADD_PRODUCT, GET_PRODUCT } from "../../constants/endpoint";
import { CreateProductResponse, GetProductsResponse, ProductPayload } from "../../interfaces/product";

export const useCreateProduct = () => useMutation<CreateProductResponse, any, ProductPayload, any>({
    mutationFn: async (data: ProductPayload) => await handleAPI(ADD_PRODUCT, data, "post") as unknown as Promise<CreateProductResponse>,
});

export const useGetProducts = ({ page, size }: { page: number, size: number }) => useQuery<any, any, GetProductsResponse>({
    queryKey: ["get-products", page, size],
    queryFn: async () => await handleAPI(`${GET_PRODUCT}?page=${page || 1}&pageSize=${size || 999999}`),
    refetchOnWindowFocus: false
})