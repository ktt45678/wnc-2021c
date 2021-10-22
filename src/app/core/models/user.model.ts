import { UserRequest } from './user-request.model';

export class User {
  _id!: number;

  email!: string;

  fullName!: string;

  birthdate?: Date;

  address!: string;

  password?: string;

  role!: string;

  activated?: boolean;

  point?: number;

  accountType?: string;

  createdAt!: Date;

  updatedAt!: Date;

  iat!: number;

  exp!: number;
}
