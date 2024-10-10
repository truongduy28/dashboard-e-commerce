import { useMutation, useQuery } from "@tanstack/react-query";
import { SuppliersResponse } from "../../interfaces/supplier";
import handleAPI from "../../apis/handleApi";
import { ADD_SUPPLIER, GET_SUPPLIERS } from "../../constants/endpoint";

export const useGetSuppliers = () =>
  useQuery<SuppliersResponse, any>({
    queryKey: ["get-suppliers"],
    queryFn: async () =>
      (await handleAPI(GET_SUPPLIERS)) as unknown as SuppliersResponse,
    refetchOnWindowFocus: false,
  });

export const useAddSupplier = () =>
  useMutation<any, any, any, any>({
    mutationFn: async (data: any) =>
      await handleAPI(ADD_SUPPLIER, data, "post"),
  });
