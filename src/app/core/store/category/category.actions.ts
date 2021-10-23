import { createAction, props } from '@ngrx/store';

import { Category, Paginated } from '../../models';
import { IPaginateCategories } from '../../interfaces/categories';

export const findAllCategories = createAction(
  '[Categories] Find All Categories',
  props<IPaginateCategories>()
);

export const findAllCategoriesSuccess = createAction(
  '[Categories] Find All Categories Success',
  props<{ payload: Paginated<Category> }>()
);

export const findAllCategoriesFailure = createAction(
  '[Categories] Find All Categories Failure'
);

export const destroyCategories = createAction(
  '[Categories] Destroy Categories'
);
