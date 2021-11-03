import { Product, User } from '.';

export class Rating {
  _id!: number;
  product!: Product;
  user!: User;
  type!: number;
  comment?: string;
  createdAt!: string;
}
