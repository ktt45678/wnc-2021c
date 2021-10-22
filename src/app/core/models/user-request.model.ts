import { User } from './user.model';

export class UserRequest {
  _id!: number;

  user!: User;

  message!: string;

  status!: string;

  expiry?: Date;
}
