import { createReducer, on } from '@ngrx/store';

import { StoreStatus } from '../../enums/store-status.enum';
import { User, Paginated } from '../../models';
import { destroyUsers, findAllUsers, findAllUsersFailure, findAllUsersSuccess, findCurrentUser, findCurrentUserFailure, findCurrentUserSuccess, findOneUser, findOneUserFailure, findOneUserSuccess, updateUser, updateUserFailure, updateUserSuccess, resetFindOneUser, resetUpdateUser } from '.';

export interface UserState {
  findAllUsersStatus: StoreStatus;
  findOneUserStatus: StoreStatus;
  updateUserStatus: StoreStatus;
  findCurrentUserStatus: StoreStatus;
  currentUser: User | null;
  selectedUser: User | null;
  userList: Paginated<User>
}

export const initialState: UserState = {
  findAllUsersStatus: StoreStatus.INIT,
  findOneUserStatus: StoreStatus.INIT,
  updateUserStatus: StoreStatus.INIT,
  findCurrentUserStatus: StoreStatus.INIT,
  currentUser: null,
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
  on(updateUserSuccess, (state, action) => {
    const updated: UserState = {
      ...state,
      updateUserStatus: StoreStatus.SUCCESS
    }
    state.currentUser?._id === action.payload._id && (updated.currentUser = action.payload);
    state.selectedUser?._id === action.payload._id && (updated.selectedUser = action.payload);
    return updated;
  }),
  on(updateUserFailure, (state) => ({
    ...state,
    updateUserStatus: StoreStatus.FAILURE
  })),
  on(findCurrentUser, (state) => ({
    ...state,
    findCurrentUserStatus: StoreStatus.LOADING
  })),
  on(findCurrentUserSuccess, (state, action) => ({
    ...state,
    currentUser: action.payload,
    findCurrentUserStatus: StoreStatus.SUCCESS
  })),
  on(findCurrentUserFailure, (state) => ({
    ...state,
    findCurrentUserStatus: StoreStatus.FAILURE
  })),
  on(destroyUsers, () => ({
    ...initialState
  })),
  on(resetFindOneUser, (state) => ({
    ...state,
    selectedUser: null,
    findOneUserStatus: StoreStatus.INIT
  })),
  on(resetUpdateUser, (state) => ({
    ...state,
    updateUserStatus: StoreStatus.INIT
  }))
);
