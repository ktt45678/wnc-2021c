export interface ICreateProduct {
  name: string;
  description: string;
  category: number;
  startingPrice: number;
  priceStep: number;
  buyPrice?: number;
  autoRenew: boolean;
  expiry: Date;
}
