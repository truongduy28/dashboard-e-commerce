import { useMutation, useQuery } from "@tanstack/react-query";
import handleAPI from "../../apis/handleApi";
import {
  ADD_SUPPLIER,
  EXPORT_SUPPLIER,
  GET_SUPPLIERS,
  UPDATE_SUPPLIER,
} from "../../constants/endpoint";
import { SuppliersResponse } from "../../interfaces/supplier";

export const useGetSuppliers = ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) =>
  useQuery<SuppliersResponse, any>({
    queryKey: ["get-suppliers", page, pageSize],
    queryFn: async () =>
      (await handleAPI(
        `${GET_SUPPLIERS}?page=${page}&pageSize=${pageSize}`
      )) as unknown as SuppliersResponse,
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
  });

export const useDeleteSupplier = () =>
  useMutation<any, any, any, any>({
    mutationFn: async (id: string) =>
      await handleAPI(
        `${UPDATE_SUPPLIER}?id=${id}`,
        { isDeleted: true },
        "put"
      ),
  });

export const useExportSupplier = () => useMutation<any, any, any, any>({
  mutationFn: async (data: { startDate?: string; endDate?: string; columns: string[] }) =>
    await handleAPI(EXPORT_SUPPLIER, data, "post"),
});