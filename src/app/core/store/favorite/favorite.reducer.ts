import { createReducer, on } from '@ngrx/store';

import { addToFavorite, addToFavoriteFailure, addToFavoriteSuccess, removeFromFavorite, removeFromFavoriteFailure, removeFromFavoriteSuccess } from '.';
import { StoreStatus } from '../../enums/store-status.enum';

export interface FavoriteState {
  addToFavoriteStatus: StoreStatus;
  removeFromFavoriteStatus: StoreStatus;
}

export const initialState: FavoriteState = {
  addToFavoriteStatus: StoreStatus.INIT,
  removeFromFavoriteStatus: StoreStatus.INIT
}

export const favoriteReducer = createReducer(
  initialState,
  on(addToFavorite, (state) => ({
    ...state,
    addToFavoriteStatus: StoreStatus.LOADING
  })),
  on(addToFavoriteSuccess, (state) => ({
    ...state,
    addToFavoriteStatus: StoreStatus.SUCCESS
  })),
  on(addToFavoriteFailure, (state) => ({
    ...state,
    addToFavoriteStatus: StoreStatus.FAILURE
  })),
  on(removeFromFavorite, (state) => ({
    ...state,
    removeFromFavoriteStatus: StoreStatus.LOADING
  })),
  on(removeFromFavoriteSuccess, (state) => ({
    ...state,
    removeFromFavoriteStatus: StoreStatus.SUCCESS
  })),
  on(removeFromFavoriteFailure, (state) => ({
    ...state,
    removeFromFavoriteStatus: StoreStatus.FAILURE
  }))
);
