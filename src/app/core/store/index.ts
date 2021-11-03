import { Type } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';

import { authReducer, AuthState, AuthEffects } from './auth';
import { userReducer, UserState, UserEffects } from './user';
import { categoryReducer, CategoryState, CategoryEffects } from './category';
import { productReducer, ProductState, ProductEffects } from './product';
import { bidReducer, BidState, BidEffects } from './bid';
import { ratingReducer, RatingState, RatingEffects } from './rating';
import { favoriteReducer, FavoriteState, FavoriteEffects } from './favorite';

export interface AppState {
  auth: AuthState;
  user: UserState;
  category: CategoryState;
  product: ProductState;
  bid: BidState;
  rating: RatingState;
  favorite: FavoriteState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  user: userReducer,
  category: categoryReducer,
  product: productReducer,
  bid: bidReducer,
  rating: ratingReducer,
  favorite: favoriteReducer
};

export const effects: Type<any>[] = [
  AuthEffects,
  UserEffects,
  CategoryEffects,
  ProductEffects,
  BidEffects,
  RatingEffects,
  FavoriteEffects
];
