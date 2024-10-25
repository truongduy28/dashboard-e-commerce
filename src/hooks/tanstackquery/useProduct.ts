import { useMutation } from "@tanstack/react-query";
import handleAPI from "../../apis/handleApi";
import { ADD_PRODUCT } from "../../constants/endpoint";
import { CreateProductResponse, ProductPayload } from "../../interfaces/product";

export const useCreateProduct = () => useMutation<CreateProductResponse, any, ProductPayload, any>({
    mutationFn: async (data: ProductPayload) => await handleAPI(ADD_PRODUCT, data, "post") as unknown as Promise<CreateProductResponse>,
});
