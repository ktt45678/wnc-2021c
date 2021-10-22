import { createReducer, on } from '@ngrx/store';

import { StoreStatus } from '../../enums/store-status.enum';
import { User, Paginated } from '../../models';
import { destroyUsers, findAllUsers, findAllUsersFailure, findAllUsersSuccess } from './user.actions';

export interface UserState {
  findAllUsersStatus: StoreStatus;
  users: Paginated<User>
}

export const initialState: UserState = {
  findAllUsersStatus: StoreStatus.INIT,
  users: new Paginated<User>()
}

export const userReducer = createReducer(
  initialState,
  on(findAllUsers, (state) => ({
    ...state,
    findAllUsersStatus: StoreStatus.LOADING
  })),
  on(findAllUsersSuccess, (state, action) => ({
    ...state,
    users: action.payload,
    findAllUsersStatus: StoreStatus.SUCCESS
  })),
  on(findAllUsersFailure, (state) => ({
    ...state,
    findAllUsersStatus: StoreStatus.FAILURE
  })),
  on(destroyUsers, () => ({
    ...initialState
  }))
);
