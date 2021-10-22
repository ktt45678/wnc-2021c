import { Type } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';

import { authReducer, AuthState, AuthEffects } from './auth';

export interface AppState {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer
};

export const effects: Type<any>[] = [
  AuthEffects
];
