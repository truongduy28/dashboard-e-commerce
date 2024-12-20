export interface IPromotion {
  _id: string;
  title: string;
  description?: string;
  code: string;
  value: number;
  numOfAvailable?: number;
  type?: string;
  startAt: Date;
  productIds?: string[];
  endAt?: Date;
  imageURL?: string;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AddPromotionResponse {
  message: string;
  data: IPromotion;
}

export interface UpdatePromotionResponse extends AddPromotionResponse {}

export interface PromotionPayload {
  title: string;
  description: string;
  code: string;
  value: string;
  numOfAvailable: string;
  type: string;
  startAt: Date; // ISO 8601 date string
  endAt: Date; // ISO 8601 date string
}

export interface GetPromotionsResponse {
  message: string;
  data: IPromotion[];
}

export interface GetPromotionResponse {
  message: string;
  data: IPromotion;
}
