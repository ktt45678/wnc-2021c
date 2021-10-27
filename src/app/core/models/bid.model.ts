import { User } from '.';

export class Bid {
  _id!: number;
  bidder!: User;
  price!: number;
  accepted!: boolean;
}
