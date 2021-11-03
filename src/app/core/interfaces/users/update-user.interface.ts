export interface IUpdateUser {
  fullName?: string;
  email?: string;
  birthdate?: Date;
  address?: string;
  currentPassword?: string;
  password?: string;
  requestUpgrade?: boolean;
  upgrade?: boolean;
  downgrade?: boolean;
  banned?: boolean;
}
