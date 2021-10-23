import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { findAllCategories, findAllCategoriesSuccess, findAllCategoriesFailure, findOneCategory, findOneCategoryFailure, findOneCategorySuccess, updateCategory, updateCategoryFailure, updateCategorySuccess, createCategory, createCategoryFailure, createCategorySuccess, removeCategory, removeCategoryFailure, removeCategorySuccess } from '.';
import { CategoriesService } from '../../services/categories.service';

@Injectable()
export class CategoryEffects {
  findAllCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(findAllCategories),
      switchMap(action =>
        this.categoriesService.findAll(action.page, action.limit, action.search, action.sort).pipe(
          map(data => findAllCategoriesSuccess({ payload: data })),
          catchError(() => of(findAllCategoriesFailure()))
        )
      )
    )
  );

  findOneCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(findOneCategory),
      switchMap(action =>
        this.categoriesService.findOne(action.id).pipe(
          map(data => findOneCategorySuccess({ payload: data })),
          catchError(() => of(findOneCategoryFailure()))
        )
      )
    )
  );

  createCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createCategory),
      switchMap(action =>
        this.categoriesService.create(action.name, action.subName).pipe(
          map(data => {
            this.snackBar.open('Tạo danh mục thành công', 'Đóng', { duration: 10000 });
            return createCategorySuccess({ payload: data });
          }),
          catchError(() => of(createCategoryFailure()))
        )
      )
    )
  );

  updateCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCategory),
      switchMap(action =>
        this.categoriesService.update(action.id, action.name, action.subName).pipe(
          map(data => {
            this.snackBar.open('Cập nhật danh mục thành công', 'Đóng', { duration: 10000 });
            return updateCategorySuccess({ payload: data });
          }),
          catchError(() => of(updateCategoryFailure()))
        )
      )
    )
  );

  removeCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeCategory),
      switchMap(action =>
        this.categoriesService.remove(action.id).pipe(
          map(() => {
            this.snackBar.open('Xóa danh mục thành công', 'Đóng', { duration: 10000 });
            return removeCategorySuccess();
          }),
          catchError(() => of(removeCategoryFailure()))
        )
      )
    )
  );

  constructor(private actions$: Actions, private categoriesService: CategoriesService, private snackBar: MatSnackBar) { }
}
