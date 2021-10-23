import { createReducer, on } from '@ngrx/store';

import { StoreStatus } from '../../enums/store-status.enum';
import { Category, Paginated } from '../../models';
import { destroyCategories, findAllCategories, findAllCategoriesFailure, findAllCategoriesSuccess } from './category.actions';

export interface CategoryState {
  findAllCategoriesStatus: StoreStatus;
  categoryList: Paginated<Category>
}

export const initialState: CategoryState = {
  findAllCategoriesStatus: StoreStatus.INIT,
  categoryList: new Paginated<Category>()
}

export const categoryReducer = createReducer(
  initialState,
  on(findAllCategories, (state) => ({
    ...state,
    findAllCategoriesStatus: StoreStatus.LOADING
  })),
  on(findAllCategoriesSuccess, (state, action) => ({
    ...state,
    categoryList: action.payload,
    findAllCategoriesStatus: StoreStatus.SUCCESS
  })),
  on(findAllCategoriesFailure, (state) => ({
    ...state,
    findAllCategoriesStatus: StoreStatus.FAILURE
  })),
  on(destroyCategories, () => ({
    ...initialState
  }))
);

