import { IPaginate } from '../users/paginate.interface';

export interface IPaginateProducts extends IPaginate {
  category?: number;
  ended?: boolean;
  saleFilter?: number;
}
