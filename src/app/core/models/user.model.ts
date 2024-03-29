export class User {
  _id!: number;
  email!: string;
  fullName!: string;
  birthdate?: Date;
  address!: string;
  password?: string;
  role!: string;
  activated?: boolean;
  point!: number;
  ratingCount!: number;
  requestUpgrade?: boolean;
  canSellUntil?: string;
  banned!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
  iat?: number;
  exp?: number;
}
