import { useMutation, useQuery } from "@tanstack/react-query";
import { SuppliersResponse } from "../../interfaces/supplier";
import handleAPI from "../../apis/handleApi";
import { ADD_SUPPLIER, GET_SUPPLIERS, UPDATE_SUPPLIER } from "../../constants/endpoint";

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

export const useUpdateSupplier = (id: string) =>
  useMutation<any, any, any, any>({
    mutationFn: async (data: any) =>
      await handleAPI(`${UPDATE_SUPPLIER}?id=${id}`, data, "put"),
  })

export const useDeleteSupplier = () =>
  useMutation<any, any, any, any>({
    mutationFn: async (id: string) =>
      await handleAPI(`${UPDATE_SUPPLIER}?id=${id}`, { isDeleted: true }, "put"),
  })