import { createReducer, on } from '@ngrx/store';
import { createRating, createRatingFailure, createRatingSuccess } from '.';

import { StoreStatus } from '../../enums/store-status.enum';

export interface RatingState {
  createRatingStatus: StoreStatus;
}

export const initialState: RatingState = {
  createRatingStatus: StoreStatus.INIT
}

export const ratingReducer = createReducer(
  initialState,
  on(createRating, (state) => ({
    ...state,
    createRatingStatus: StoreStatus.LOADING
  })),
  on(createRatingSuccess, (state) => ({
    ...state,
    createRatingStatus: StoreStatus.SUCCESS
  })),
  on(createRatingFailure, (state) => ({
    ...state,
    createRatingStatus: StoreStatus.FAILURE
  }))
)
