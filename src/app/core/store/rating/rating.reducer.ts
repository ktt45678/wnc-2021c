import { createReducer, on } from '@ngrx/store';

import { createRating, createRatingFailure, createRatingSuccess, findAllRatings, findAllRatingsFailure, findAllRatingsSuccess } from '.';
import { StoreStatus } from '../../enums/store-status.enum';
import { Paginated, Rating } from '../../models';

export interface RatingState {
  createRatingStatus: StoreStatus;
  findAllRatingsStatus: StoreStatus;
  ratingList: Paginated<Rating>;
}

export const initialState: RatingState = {
  createRatingStatus: StoreStatus.INIT,
  findAllRatingsStatus: StoreStatus.INIT,
  ratingList: new Paginated<Rating>()
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
  })),
  on(findAllRatings, (state) => ({
    ...state,
    findAllRatingsStatus: StoreStatus.LOADING
  })),
  on(findAllRatingsSuccess, (state, action) => ({
    ...state,
    ratingList: action.payload,
    findAllRatingsStatus: StoreStatus.SUCCESS
  })),
  on(findAllRatingsFailure, (state) => ({
    ...state,
    findAllRatingsStatus: StoreStatus.FAILURE
  }))
);
