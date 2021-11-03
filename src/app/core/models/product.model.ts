import { Bid, Category, Rating, User } from '.';

export class Product {
  _id!: number;
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
  whitelist!: User[];
  requestedUsers!: User[];
  ended!: boolean;
  sellerRating?: Rating
  winnerRating?: Rating
  expiry!: string;
  createdAt!: string;
  updatedAt!: string;
  blacklisted?: boolean;
  whitelisted?: boolean;
  requestedUser?: boolean;
  favorited?: boolean;
}
