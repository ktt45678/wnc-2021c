import { IPaginate } from '.';

export interface IPaginateUsers extends IPaginate {
  filter?: number;
}
