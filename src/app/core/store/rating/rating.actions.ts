import { createAction, props } from '@ngrx/store';

import { ICreateRating } from '../../interfaces/ratings';
import { IPaginateRatings } from '../../interfaces/ratings/paginate-ratings.interface';
import { Paginated, Rating } from '../../models';

export const createRating = createAction(
  '[Rating] Create Rating',
  props<{ id: number } & ICreateRating>()
);

export const createRatingSuccess = createAction(
  '[Rating] Create Rating Success'
);

export const createRatingFailure = createAction(
  '[Rating] Create Rating Failure'
);

export const findAllRatings = createAction(
  '[Rating] Find All Ratings',
  props<IPaginateRatings>()
);

export const findAllRatingsSuccess = createAction(
  '[Rating] Find All Ratings Success',
  props<{ payload: Paginated<Rating> }>()
);

export const findAllRatingsFailure = createAction(
  '[Rating] Find All Ratings Failure'
);
