import { createAction, props } from '@ngrx/store';

export const addToFavorite = createAction(
  '[Favorite] Add To Favorite',
  props<{ id: number }>()
);

export const addToFavoriteSuccess = createAction(
  '[Favorite] Add To Favorite Success'
);

export const addToFavoriteFailure = createAction(
  '[Favorite] Add To Favorite Failure'
);

export const removeFromFavorite = createAction(
  '[Favorite] Remove From Favorite',
  props<{ id: number }>()
);

export const removeFromFavoriteSuccess = createAction(
  '[Favorite] Remove From Favorite Success'
);

export const removeFromFavoriteFailure = createAction(
  '[Favorite] Remove From Favorite Failure'
);
