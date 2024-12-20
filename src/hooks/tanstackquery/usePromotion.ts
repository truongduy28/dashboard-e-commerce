import { useMutation, useQuery } from "@tanstack/react-query";
import handleAPI from "../../apis/handleApi";
import {
  ADD_PROMOTION,
  GET_PROMOTIONS,
  UPDATE_PROMOTION,
} from "../../constants/endpoint";
import {
  AddPromotionResponse,
  GetPromotionResponse,
  GetPromotionsResponse,
  PromotionPayload,
} from "../../interfaces/promotion";

export const useGetPromotions = () =>
  useQuery<GetPromotionsResponse, any, GetPromotionsResponse, any>({
    queryKey: ["get-promotions"],
    queryFn: () =>
      handleAPI(GET_PROMOTIONS) as unknown as Promise<GetPromotionsResponse>,
    refetchOnWindowFocus: false,
  });

export const useAddPromotion = () =>
  useMutation<AddPromotionResponse, any, PromotionPayload, any>({
    mutationFn: (payload: PromotionPayload) =>
      handleAPI(
        ADD_PROMOTION,
        payload,
        "post"
      ) as unknown as Promise<AddPromotionResponse>,
  });

export const useGetPromotion = (id?: string) =>
  useQuery<GetPromotionResponse, any, GetPromotionResponse, any>({
    queryKey: ["get-promotion", id],
    queryFn: () =>
      id
        ? (handleAPI(
            `${GET_PROMOTIONS}/${id}`
          ) as unknown as Promise<GetPromotionResponse>)
        : (undefined as any),
    refetchOnWindowFocus: false,
  });

export const useUpdatePromotion = (id?: string) =>
  useMutation<AddPromotionResponse, any, PromotionPayload, any>({
    mutationFn: (payload: PromotionPayload) =>
      handleAPI(
        `${UPDATE_PROMOTION}/${id}`,
        payload,
        "put"
      ) as unknown as Promise<AddPromotionResponse>,
  });
