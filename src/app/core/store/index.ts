import { Type } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';

import { authReducer, AuthState, AuthEffects } from './auth';
import { userReducer, UserState, UserEffects } from './user';
import { categoryReducer, CategoryState, CategoryEffects } from './category';
import { productReducer, ProductState, ProductEffects } from './product';

export interface AppState {
  auth: AuthState;
  user: UserState;
  category: CategoryState;
  product: ProductState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  user: userReducer,
  category: categoryReducer,
  product: productReducer
};

export const effects: Type<any>[] = [
  AuthEffects,
  UserEffects,
  CategoryEffects,
  ProductEffects
];
