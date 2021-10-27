import { Bid, Category, User } from '.';

export class Product {
  _id?: number;
  name!: string;
  description!: string;
  category!: Category;
  images!: string[];
  startingPrice!: number;
  priceStep!: number;
  buyPrice?: number;
  currentPrice!: number;
  displayPrice!: number;
  autoRenew!: boolean;
  seller!: User;
  winner?: User;
  bidCount!: number;
  bids!: Bid[];
  blacklist!: User[];
  expiry!: Date;
}
