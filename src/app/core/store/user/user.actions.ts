import { createAction, props } from '@ngrx/store';

import { User, Paginated } from '../../models';
import { IPaginate } from '../../interfaces/users';

export const findAllUsers = createAction(
  '[Users] Find All Users',
  props<IPaginate>()
);

export const findAllUsersSuccess = createAction(
  '[Users] Find All Users Success',
  props<{ payload: Paginated<User> }>()
);

export const findAllUsersFailure = createAction(
  '[Users] Find All Users Failure'
);

export const destroyUsers = createAction(
  '[Users] Destroy Users'
);
