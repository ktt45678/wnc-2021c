export interface IUpdateUser {
  fullName?: string;
  email?: string;
  birthdate?: Date;
  address?: string;
  currentPassword?: string;
  password?: string;
  role?: string;
  canSellUntil?: Date;
}
