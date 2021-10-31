import { User } from '.';

export class Bid {
  _id!: number;
  bidder!: User;
  price!: number;
  status!: string;
}
