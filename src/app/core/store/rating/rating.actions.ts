import { createAction, props } from '@ngrx/store';

import { ICreateRating } from '../../interfaces/ratings';

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
