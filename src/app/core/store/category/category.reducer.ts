import { createReducer, on } from '@ngrx/store';
import { findCategoryGroups, findCategoryGroupsFailure, findCategoryGroupsSuccess, findOneCategory, findOneCategoryFailure } from '.';

import { StoreStatus } from '../../enums/store-status.enum';
import { Category, CategoryGroup, Paginated } from '../../models';
import { createCategory, createCategoryFailure, createCategorySuccess, destroyCategories, findAllCategories, findAllCategoriesFailure, findAllCategoriesSuccess, findOneCategorySuccess, removeCategory, removeCategoryFailure, removeCategorySuccess, updateCategory, updateCategoryFailure, updateCategorySuccess } from '.';

export interface CategoryState {
  findAllCategoriesStatus: StoreStatus;
  findCategoryGroupsStatus: StoreStatus;
  findOneCategoryStatus: StoreStatus;
  createCategoryStatus: StoreStatus;
  updateCategoryStatus: StoreStatus;
  removeCategoryStatus: StoreStatus;
  category: Category | null;
  categoryList: Paginated<Category>;
  categoryGroups: CategoryGroup[];
}

export const initialState: CategoryState = {
  findAllCategoriesStatus: StoreStatus.INIT,
  findCategoryGroupsStatus: StoreStatus.INIT,
  findOneCategoryStatus: StoreStatus.INIT,
  createCategoryStatus: StoreStatus.INIT,
  updateCategoryStatus: StoreStatus.INIT,
  removeCategoryStatus: StoreStatus.INIT,
  category: null,
  categoryList: new Paginated<Category>(),
  categoryGroups: []
}

export const categoryReducer = createReducer(
  initialState,
  on(createCategory, (state) => ({
    ...state,
    createCategoryStatus: StoreStatus.LOADING
  })),
  on(createCategorySuccess, (state, action) => ({
    ...state,
    category: action.payload,
    createCategoryStatus: StoreStatus.SUCCESS
  })),
  on(createCategoryFailure, (state) => ({
    ...state,
    createCategoryStatus: StoreStatus.FAILURE
  })),
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
  on(findCategoryGroups, (state) => ({
    ...state,
    findCategoryGroupsStatus: StoreStatus.LOADING
  })),
  on(findCategoryGroupsSuccess, (state, action) => ({
    ...state,
    categoryGroups: action.payload,
    findCategoryGroupsStatus: StoreStatus.SUCCESS
  })),
  on(findCategoryGroupsFailure, (state) => ({
    ...state,
    findCategoryGroupsStatus: StoreStatus.FAILURE
  })),
  on(findOneCategory, (state) => ({
    ...state,
    findOneCategoryStatus: StoreStatus.LOADING
  })),
  on(findOneCategorySuccess, (state, action) => ({
    ...state,
    category: action.payload,
    findOneCategoryStatus: StoreStatus.SUCCESS
  })),
  on(findOneCategoryFailure, (state) => ({
    ...state,
    findOneCategoryStatus: StoreStatus.FAILURE
  })),
  on(updateCategory, (state) => ({
    ...state,
    updateCategoryStatus: StoreStatus.LOADING
  })),
  on(updateCategorySuccess, (state, action) => ({
    ...state,
    category: action.payload,
    updateCategoryStatus: StoreStatus.SUCCESS
  })),
  on(updateCategoryFailure, (state) => ({
    ...state,
    updateCategoryStatus: StoreStatus.FAILURE
  })),
  on(removeCategory, (state) => ({
    ...state,
    removeCategoryStatus: StoreStatus.LOADING
  })),
  on(removeCategorySuccess, (state) => ({
    ...state,
    removeCategoryStatus: StoreStatus.SUCCESS
  })),
  on(removeCategoryFailure, (state) => ({
    ...state,
    removeCategoryStatus: StoreStatus.FAILURE
  })),
  on(destroyCategories, () => ({
    ...initialState
  }))
);
