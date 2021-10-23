import { createAction, props } from '@ngrx/store';

import { Category, Paginated } from '../../models';
import { ICreateCategory, IPaginateCategories } from '../../interfaces/categories';

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

export const findOneCategory = createAction(
  '[Categories] Find One Category',
  props<{ id: number }>()
);

export const findOneCategorySuccess = createAction(
  '[Categories] Find One Category Success',
  props<{ payload: Category }>()
);

export const findOneCategoryFailure = createAction(
  '[Categories] Find One Category Failure'
);

export const createCategory = createAction(
  '[Categories] Create Category',
  props<ICreateCategory>()
);

export const createCategorySuccess = createAction(
  '[Categories] Create Category Success',
  props<{ payload: Category }>()
);

export const createCategoryFailure = createAction(
  '[Categories] Create Category Failure'
);

export const updateCategory = createAction(
  '[Categories] Update Category',
  props<{ id: number } & ICreateCategory>()
);

export const updateCategorySuccess = createAction(
  '[Categories] Update Category Success',
  props<{ payload: Category }>()
);

export const updateCategoryFailure = createAction(
  '[Categories] Update Category Failure'
);

export const removeCategory = createAction(
  '[Categories] Remove Category',
  props<{ id: number }>()
);

export const removeCategorySuccess = createAction(
  '[Categories] Remove Category Success'
);

export const removeCategoryFailure = createAction(
  '[Categories] Remove Category Failure'
);

export const destroyCategories = createAction(
  '[Categories] Destroy Categories'
);
