import { createAction, props } from '@ngrx/store';

import { User, Paginated } from '../../models';
import { IPaginateUsers, IUpdateUser } from '../../interfaces/users';

export const findAllUsers = createAction(
  '[Users] Find All Users',
  props<IPaginateUsers>()
);

export const findAllUsersSuccess = createAction(
  '[Users] Find All Users Success',
  props<{ payload: Paginated<User> }>()
);

export const findAllUsersFailure = createAction(
  '[Users] Find All Users Failure'
);

export const findOneUser = createAction(
  '[Users] Find One User',
  props<{ id: number }>()
);

export const findOneUserSuccess = createAction(
  '[Users] Find One User Success',
  props<{ payload: User }>()
);

export const findOneUserFailure = createAction(
  '[Users] Find One User Failure'
);

export const updateUser = createAction(
  '[Users] Update User',
  props<{ id: number } & IUpdateUser>()
);

export const updateUserSuccess = createAction(
  '[Users] Update User Success',
  props<{ payload: User }>()
);

export const updateUserFailure = createAction(
  '[Users] Update User Failure'
);

export const destroyUsers = createAction(
  '[Users] Destroy Users'
);

export const findCurrentUser = createAction(
  '[Users] Find Current User'
);

export const findCurrentUserSuccess = createAction(
  '[Users] Find Current User Success',
  props<{ payload: User }>()
);

export const findCurrentUserFailure = createAction(
  '[Users] Find Current User Failure'
);

export const resetUpdateUser = createAction(
  '[Users] Reset Update User'
);
