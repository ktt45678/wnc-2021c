import { createReducer, on } from '@ngrx/store';

import { StoreStatus } from '../../enums/store-status.enum';
import { User, Paginated } from '../../models';
import { destroyUsers, findAllUsers, findAllUsersFailure, findAllUsersSuccess, findOneUser, findOneUserFailure, findOneUserSuccess, updateUser, updateUserFailure, updateUserSuccess } from '.';

export interface UserState {
  findAllUsersStatus: StoreStatus;
  findOneUserStatus: StoreStatus;
  updateUserStatus: StoreStatus;
  selectedUser: User | null;
  userList: Paginated<User>
}

export const initialState: UserState = {
  findAllUsersStatus: StoreStatus.INIT,
  findOneUserStatus: StoreStatus.INIT,
  updateUserStatus: StoreStatus.INIT,
  selectedUser: null,
  userList: new Paginated<User>()
}

export const userReducer = createReducer(
  initialState,
  on(findAllUsers, (state) => ({
    ...state,
    findAllUsersStatus: StoreStatus.LOADING
  })),
  on(findAllUsersSuccess, (state, action) => ({
    ...state,
    userList: action.payload,
    findAllUsersStatus: StoreStatus.SUCCESS
  })),
  on(findAllUsersFailure, (state) => ({
    ...state,
    findAllUsersStatus: StoreStatus.FAILURE
  })),
  on(findOneUser, (state) => ({
    ...state,
    findOneUserStatus: StoreStatus.LOADING
  })),
  on(findOneUserSuccess, (state, action) => ({
    ...state,
    selectedUser: action.payload,
    findOneUserStatus: StoreStatus.SUCCESS
  })),
  on(findOneUserFailure, (state) => ({
    ...state,
    findOneUserStatus: StoreStatus.FAILURE
  })),
  on(updateUser, (state) => ({
    ...state,
    updateUserStatus: StoreStatus.LOADING
  })),
  on(updateUserSuccess, (state, action) => ({
    ...state,
    selectedUser: action.payload,
    updateUserStatus: StoreStatus.SUCCESS
  })),
  on(updateUserFailure, (state) => ({
    ...state,
    updateUserStatus: StoreStatus.FAILURE
  })),
  on(destroyUsers, () => ({
    ...initialState
  }))
);
